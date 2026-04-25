import { Module } from '@nestjs/common'
import { IntakeController, ArchetypesController } from './intake.controller'
import { IntakeService } from './intake.service'
import { LoadProfileModule } from '../load-profile/load-profile.module'
import { GeoIrradianceModule } from '../geo-irradiance/geo-irradiance.module'

@Module({
  imports: [LoadProfileModule, GeoIrradianceModule],
  controllers: [IntakeController, ArchetypesController],
  providers: [IntakeService],
  exports: [IntakeService],
})
export class IntakeModule {}
