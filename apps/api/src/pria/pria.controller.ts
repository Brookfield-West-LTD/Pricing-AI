import { Controller, Post, Body, Res } from '@nestjs/common'
import type { Response } from 'express'
import { PriaService } from './pria.service'

interface StreamDto {
  message: string
  planId?: string
}

@Controller('pria')
export class PriaController {
  constructor(private pria: PriaService) {}

  @Post('stream')
  async stream(@Body() body: StreamDto, @Res() res: Response) {
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')
    res.flushHeaders()

    for await (const chunk of this.pria.streamResponse(body.message, body.planId)) {
      res.write(`data: ${chunk}\n\n`)
    }

    res.write('data: [DONE]\n\n')
    res.end()
  }
}
