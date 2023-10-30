import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { productsProviders } from './products.providers';

@Module({
  imports: [],
  exports: [ProductsRepository],
  providers: [ProductsService, ...productsProviders, ProductsRepository],
  controllers: [ProductsController],
})
export class ProductsModule {}
