import 'reflect-metadata'
import { NestFactory } from '@nestjs/core'
import { Logger } from 'nestjs-pino'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true })

  app.useLogger(app.get(Logger))
  app.enableCors({ origin: process.env['NEXT_PUBLIC_API_URL'] ?? '*' })
  app.setGlobalPrefix('api')

  const port = process.env['API_PORT'] ?? 3001
  await app.listen(port)
}

bootstrap()
