import { Module } from '@nestjs/common'
import { GeoIrradianceService } from './geo-irradiance.service'

@Module({
  providers: [GeoIrradianceService],
  exports: [GeoIrradianceService],
})
export class GeoIrradianceModule {}
