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

@Controller('creditcard')
export class CreditCardController {
  constructor(private readonly creditCardService: CreditCardService) {}

  @Post('create')
  async createProduct(
    @Body(ValidationPipe) createProductDto: any,
  ): Promise<ReturnCreditCardDto> {
    const creditCard =
      await this.creditCardService.createCreditCard(createProductDto);
    return {
      creditCard,
      message: creditCard.message,
    };
  }

  @Get()
  async findProducts(@Query() query: any) {
    return await this.creditCardService.findCreditCard(query);
  }

  @Get(':id')
  async findProductsById(@Param('id') id): Promise<any> {
    return await this.creditCardService.findCreditCardById(id);
  }

  @Patch(':id')
  async updateProduct(
    @Body(ValidationPipe) updateCourseDto: any,
    @Param('id') id: number,
  ) {
    return this.creditCardService.updateCreditCard(updateCourseDto, id);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return await this.creditCardService.deleteCreditCard(id);
  }
}
