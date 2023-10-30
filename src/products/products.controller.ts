import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ReturnProductDto } from './dto/return-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('create')
  async createProduct(
    @Body(ValidationPipe) createProductDto: any,
  ): Promise<ReturnProductDto> {
    const products = await this.productsService.createProduct(createProductDto);
    return {
      products,
      message: 'Curso cadastrado com sucesso',
    };
  }

  @Get()
  async findProducts(@Query() query: any) {
    return await this.productsService.findProducts(query);
  }

  @Get(':id')
  async findProductsById(@Param('id') id): Promise<any> {
    return await this.productsService.findProductsById(id);
  }

  @Patch(':id')
  async updateProduct(
    @Body(ValidationPipe) updateCourseDto: any,
    @Param('id') id: number,
  ) {
    return this.productsService.updateProduct(updateCourseDto, id);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return await this.productsService.deleteProduct(id);
  }
}
