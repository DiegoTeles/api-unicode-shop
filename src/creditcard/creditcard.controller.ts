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
import { CreditCardService } from './creditcard.service';
import { ReturnCreditCardDto } from './dto/return-credit-card.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreditCardDTO } from './dto/CreateCreditCardDto.dto';

@Controller('creditcard')
@ApiTags('Credit Card')
export class CreditCardController {
  constructor(private readonly creditCardService: CreditCardService) {}

  @Post('create')
  @ApiOperation({
    summary: 'Create a new credit card',
    description: 'Endpoint to create a new credit card.',
  })
  @ApiResponse({
    status: 201,
    description: 'Credit card successfully created.',
    type: ReturnCreditCardDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Check request payload.',
  })
  async createProduct(
    @Body(ValidationPipe) createProductDto: CreditCardDTO,
  ): Promise<ReturnCreditCardDto> {
    const creditCard =
      await this.creditCardService.createCreditCard(createProductDto);
    return {
      creditCard,
      message: creditCard.message,
    };
  }

  @Get()
  @ApiOperation({
    summary: 'Get a list of credit cards',
    description: 'Endpoint to retrieve a list of credit cards.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of credit cards successfully retrieved.',
    type: ReturnCreditCardDto,
    isArray: true,
  })
  async findProducts(@Query() query: any) {
    return await this.creditCardService.findCreditCard(query);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a credit card by ID',
    description: 'Endpoint to retrieve a credit card by its ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Credit card successfully retrieved.',
    type: ReturnCreditCardDto,
  })
  @ApiResponse({ status: 404, description: 'Credit card not found.' })
  async findProductsById(@Param('id') id): Promise<any> {
    return await this.creditCardService.findCreditCardById(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a credit card by ID',
    description: 'Endpoint to update a credit card by its ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Credit card successfully updated.',
    type: ReturnCreditCardDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Check request payload.',
  })
  @ApiResponse({ status: 404, description: 'Credit card not found.' })
  async updateProduct(
    @Body(ValidationPipe) updateCourseDto: any,
    @Param('id') id: number,
  ) {
    return this.creditCardService.updateCreditCard(updateCourseDto, id);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a credit card by ID',
    description: 'Endpoint to delete a credit card by its ID.',
  })
  @ApiResponse({
    status: 204,
    description: 'Credit card successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Credit card not found.' })
  async deleteUser(@Param('id') id: number) {
    return await this.creditCardService.deleteCreditCard(id);
  }
}
