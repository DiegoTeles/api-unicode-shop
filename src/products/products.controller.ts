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
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto copy';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('create')
  @ApiBody({
    type: CreateProductDto,
    examples: {
      title: { summary: 'Example Title', value: 'Sample Product' },
      description: {
        summary: 'Example Description',
        value: 'This is a sample product description',
      },
      price: { summary: 'Example Price', value: 19.99 },
    },
  })
  @ApiOperation({ summary: 'Create a new product' })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({
    status: 201,
    description: 'The product has been successfully created.',
    type: ReturnProductDto,
    schema: {
      example: {
        title: 'Example Title',
        description: 'Example Description',
        price: 19.99,
      },
    },
  })
  async createProduct(
    @Body(ValidationPipe) createProductDto: any,
  ): Promise<ReturnProductDto> {
    const products = await this.productsService.createProduct(createProductDto);
    return {
      products,
      message: 'Produto cadastrado com sucesso',
    };
  }

  @Get()
  @ApiOperation({ summary: 'Find all products' })
  @ApiResponse({
    status: 200,
    description: 'Return a list of products.',
    type: ReturnProductDto,
    isArray: true,
  })
  async findProducts(@Query() query: any) {
    return await this.productsService.findProducts(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find a product by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Product ID' })
  @ApiResponse({
    status: 200,
    description: 'The found product.',
    type: ReturnProductDto,
  })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async findProductsById(@Param('id') id): Promise<any> {
    return await this.productsService.findProductsById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Product ID' })
  @ApiResponse({
    status: 200,
    description: 'The updated product.',
    type: ReturnProductDto,
  })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async updateProduct(
    @Body(ValidationPipe) updateCourseDto: any,
    @Param('id') id: number,
  ) {
    return this.productsService.updateProduct(updateCourseDto, id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Product ID' })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async deleteUser(@Param('id') id: number) {
    return await this.productsService.deleteProduct(id);
  }
}
