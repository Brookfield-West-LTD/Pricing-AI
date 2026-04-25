import { Module } from '@nestjs/common'
import { LoadProfileService } from './load-profile.service'
import { GeoIrradianceModule } from '../geo-irradiance/geo-irradiance.module'

@Module({
  imports: [GeoIrradianceModule],
  providers: [LoadProfileService],
  exports: [LoadProfileService],
})
export class LoadProfileModule {}
