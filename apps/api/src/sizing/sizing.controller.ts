import { Controller, Post, Param, Body } from '@nestjs/common'
import { SizingService } from './sizing.service'

@Controller('plans/:planId/sizing')
export class SizingController {
  constructor(private sizing: SizingService) {}

  @Post()
  run(
    @Param('planId') planId: string,
    @Body() body: { dailyKwh: number; peakKw: number; lat: number; lng: number; autonomyDays?: number },
  ) {
    return this.sizing.size({ planId, ...body })
  }
}
