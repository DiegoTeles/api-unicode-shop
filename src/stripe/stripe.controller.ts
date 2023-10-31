import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { ApiOperation } from '@nestjs/swagger';
import { AxiosResponse } from 'axios';

@Controller('stripe')
export class StripeController {
  constructor(private readonly creditCardService: StripeService) {}

  @Post('create-checkout-session')
  @ApiOperation({
    description: 'Pass in any positive integer to return a Star Wars biography',
  })
  async createPaymentCheckout(
    @Body(ValidationPipe) createProductDto: any,
  ): Promise<AxiosResponse> {
    return await this.creditCardService.createPaymentCheckout(createProductDto);
  }
}
