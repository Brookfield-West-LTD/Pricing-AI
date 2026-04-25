import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { BullModule } from '@nestjs/bullmq'
import { LoggerModule } from 'nestjs-pino'
import { PrismaModule } from './prisma/prisma.module'
import { PlanModule } from './plan/plan.module'
import { StorageModule } from './storage/storage.module'
import { GeoIrradianceModule } from './geo-irradiance/geo-irradiance.module'
import { LoadProfileModule } from './load-profile/load-profile.module'
import { IntakeModule } from './intake/intake.module'
import { SizingModule } from './sizing/sizing.module'
import { CatalogueModule } from './catalogue/catalogue.module'
import { BoqModule } from './boq/boq.module'
import { FinancialModule } from './financial/financial.module'
import { PriaModule } from './pria/pria.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    LoggerModule.forRoot({
      pinoHttp: {
        ...(process.env['NODE_ENV'] !== 'production'
          ? { transport: { target: 'pino-pretty', options: { colorize: true } } }
          : {}),
        level: process.env['NODE_ENV'] !== 'production' ? 'debug' : 'info',
      },
    }),

    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        connection: { url: config.getOrThrow<string>('REDIS_URL') },
      }),
    }),

    PrismaModule,
    PlanModule,
    StorageModule,
    GeoIrradianceModule,
    LoadProfileModule,
    IntakeModule,
    SizingModule,
    CatalogueModule,
    BoqModule,
    FinancialModule,
    PriaModule,
  ],
})
export class AppModule {}
