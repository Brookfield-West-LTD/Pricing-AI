import { Controller, Post, Get, Param } from '@nestjs/common'
import { BoqService } from './boq.service'

@Controller('plans/:planId/boq')
export class BoqController {
  constructor(private boq: BoqService) {}

  @Post('generate')
  generate(@Param('planId') planId: string) {
    return this.boq.generate(planId)
  }

  @Get()
  async get(@Param('planId') planId: string) {
    return this.boq.generate(planId)
  }
}
