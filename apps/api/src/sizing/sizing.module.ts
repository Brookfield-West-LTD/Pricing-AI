import { Module } from '@nestjs/common'
import { SizingController } from './sizing.controller'
import { SizingService } from './sizing.service'
import { GeoIrradianceModule } from '../geo-irradiance/geo-irradiance.module'

@Module({
  imports: [GeoIrradianceModule],
  controllers: [SizingController],
  providers: [SizingService],
  exports: [SizingService],
})
export class SizingModule {}
