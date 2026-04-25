import { Controller, Post, Get, Param, Body, UsePipes } from '@nestjs/common'
import { ZodValidationPipe } from '../common/zod-validation.pipe'
import { IntakeService } from './intake.service'
import { IntakeSchema } from '@pricing-ai/zod-schemas'

@Controller('plans/:planId/intake')
export class IntakeController {
  constructor(private intake: IntakeService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(IntakeSchema))
  submit(
    @Param('planId') planId: string,
    @Body() body: unknown,
  ) {
    return this.intake.submit(planId, body as Parameters<IntakeService['submit']>[1])
  }

  @Get()
  getState(@Param('planId') planId: string) {
    return this.intake.getState(planId)
  }
}

@Controller('archetypes')
export class ArchetypesController {
  constructor(private intake: IntakeService) {}

  @Get()
  list() {
    return this.intake.getArchetypes()
  }

  @Get(':id/appliances')
  getAppliances(@Param('id') id: string) {
    return this.intake.getArchetypeAppliances(id)
  }
}
