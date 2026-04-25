import { Module } from '@nestjs/common'
import { PriaController } from './pria.controller'
import { PriaService } from './pria.service'
import { PrismaModule } from '../prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  controllers: [PriaController],
  providers: [PriaService],
})
export class PriaModule {}
