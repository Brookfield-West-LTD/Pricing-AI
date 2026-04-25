import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { PlanService } from './plan.service'

@Controller('plans')
export class PlanController {
  constructor(private plans: PlanService) {}

  @Post()
  create() {
    return this.plans.create()
  }

  @Get(':shareToken')
  findOne(@Param('shareToken') shareToken: string) {
    return this.plans.findByShareToken(shareToken)
  }

  @Post(':id/submit')
  submitIntake(
    @Param('id') id: string,
    @Body() body: { data: Record<string, unknown>; priority: string },
  ) {
    return this.plans.submitIntake(id, body)
  }

  @Post('bill-upload')
  @UseInterceptors(FileInterceptor('file'))
  billUpload(
    @UploadedFile() _file: Express.Multer.File,
    @Body('planId') _planId: string,
  ) {
    // Phase 2: wire Textract extraction here
    return { extractedKwh: 0 }
  }
}
