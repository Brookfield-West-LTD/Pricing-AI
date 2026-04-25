import { Module } from '@nestjs/common'
import { BoqController } from './boq.controller'
import { BoqService } from './boq.service'
import { CatalogueModule } from '../catalogue/catalogue.module'

@Module({
  imports: [CatalogueModule],
  controllers: [BoqController],
  providers: [BoqService],
  exports: [BoqService],
})
export class BoqModule {}
