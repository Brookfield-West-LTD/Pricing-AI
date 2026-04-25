import { Injectable, NotFoundException } from '@nestjs/common'
import type { BOQLineItem } from '@pricing-ai/shared'
import { PrismaService } from '../prisma/prisma.service'
import { FxService } from '../catalogue/fx.service'
import {
  COMPONENT_CATALOGUE,
  findComponentsByCategory,
} from '../catalogue/component-catalogue'

const VAT_RATE = 0.075

interface BomLine {
  skuId: string
  quantity: number
}

@Injectable()
export class BoqService {
  constructor(
    private prisma: PrismaService,
    private fx: FxService,
  ) {}

  async generate(planId: string): Promise<{ boq: BOQLineItem[]; totalNgn: number; fxRate: number }> {
    const design = await this.prisma.systemDesign.findUnique({ where: { planId } })
    if (!design) throw new NotFoundException(`No SystemDesign for plan ${planId}`)

    const fxRate = await this.fx.getUsdToNgn()
    const bom = this.buildBom(design.panelKw, design.inverterKw, design.batteryKwh)
    const lineItems = this.priceBom(bom, fxRate)

    const subtotal = lineItems.reduce((s, l) => s + l.totalNgn, 0)
    const vat = Math.round(subtotal * VAT_RATE)
    const total = subtotal + vat

    await this.prisma.bOQ.upsert({
      where: { planId },
      create: { planId, fxRateUsed: fxRate, totalNgn: total, lineItemsJson: lineItems as unknown as object[] },
      update: { fxRateUsed: fxRate, totalNgn: total, lineItemsJson: lineItems as unknown as object[] },
    })

    return { boq: lineItems, totalNgn: total, fxRate }
  }

  private buildBom(panelKw: number, inverterKw: number, batteryKwh: number): BomLine[] {
    const bom: BomLine[] = []

    // Panels — select best-fit SKU
    const panelSku = findComponentsByCategory('panel').sort((a, b) => b.unitPriceUsd - a.unitPriceUsd)[0]
    if (panelSku) {
      const panelWp = parseInt(panelSku.spec.match(/(\d+)Wp/)?.[1] ?? '400', 10)
      bom.push({ skuId: panelSku.id, quantity: Math.ceil((panelKw * 1000) / panelWp) })
    }

    // Inverter — match by kW
    const invSku = COMPONENT_CATALOGUE
      .filter(c => c.category === 'inverter')
      .filter(c => {
        const kva = parseFloat(c.spec.match(/([\d.]+)kVA/)?.[1] ?? '0')
        return kva >= inverterKw
      })
      .sort((a, b) => a.unitPriceUsd - b.unitPriceUsd)[0]
    if (invSku) bom.push({ skuId: invSku.id, quantity: 1 })

    // Batteries — LiFePO4, match by kWh
    const batSku = COMPONENT_CATALOGUE
      .filter(c => c.category === 'battery' && c.id.includes('lfp'))
      .sort((a, b) => b.unitPriceUsd - a.unitPriceUsd)[0]
    if (batSku) {
      const kwhPer = parseFloat(batSku.spec.match(/([\d.]+)kWh/)?.[1] ?? '5')
      bom.push({ skuId: batSku.id, quantity: Math.ceil(batteryKwh / kwhPer) })
    }

    // Fixed BOM items
    bom.push(
      { skuId: 'mount-roof-4panel', quantity: Math.ceil(panelKw / 2) },
      { skuId: 'prot-dc-spd', quantity: 1 },
      { skuId: 'prot-ac-spd', quantity: 1 },
      { skuId: 'prot-dc-breaker', quantity: 2 },
      { skuId: 'wire-dc-6mm', quantity: Math.ceil(panelKw * 20) },
      { skuId: 'install-labour', quantity: panelKw },
    )

    return bom
  }

  private priceBom(bom: BomLine[], fxRate: number): BOQLineItem[] {
    return bom.map((line, idx) => {
      const sku = COMPONENT_CATALOGUE.find(c => c.id === line.skuId)
      if (!sku) throw new Error(`SKU ${line.skuId} not found`)

      const unitNgn = Math.round(sku.unitPriceUsd * fxRate)
      const totalNgn = unitNgn * line.quantity

      return {
        id: String(idx + 1),
        description: `${sku.brand} ${sku.name} — ${sku.spec}`,
        category: sku.category,
        quantity: line.quantity,
        unitPriceNgn: unitNgn,
        totalNgn,
        usdLinked: sku.category !== 'installation',
      }
    })
  }
}
