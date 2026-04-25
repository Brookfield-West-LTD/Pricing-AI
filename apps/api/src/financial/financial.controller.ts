import { Controller, Post, Param, Body } from '@nestjs/common'
import { FinancialService } from './financial.service'

@Controller('plans/:planId/financial')
export class FinancialController {
  constructor(private financial: FinancialService) {}

  @Post()
  compute(
    @Param('planId') planId: string,
    @Body() body: { fuelInflationRate?: number; ngnDepreciationRate?: number },
  ) {
    return this.financial.compute(planId, body)
  }
}
