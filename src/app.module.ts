import { Module } from '@nestjs/common';
import { LoggerInterceptor } from './interceptors/logger.interceptor';
import { ProductsModule } from './products/products.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionsFilter } from './filters/http-exception.filter';
import { HealthController } from './health/health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './configs/winston.config';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './core/database/database.module';
@Module({
  imports: [
    WinstonModule.forRoot(winstonConfig),
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    TerminusModule,
    ProductsModule,
  ],
  controllers: [HealthController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
