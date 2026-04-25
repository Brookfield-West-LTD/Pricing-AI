import { PipeTransform, BadRequestException } from '@nestjs/common'

interface SafeParseSchema {
  safeParse(value: unknown): { success: boolean; data?: unknown; error?: { flatten(): unknown } }
}

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: SafeParseSchema) {}

  transform(value: unknown) {
    const result = this.schema.safeParse(value)
    if (!result.success) {
      throw new BadRequestException(result.error?.flatten())
    }
    return result.data
  }
}
