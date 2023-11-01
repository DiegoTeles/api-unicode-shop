import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AxiosResponse } from 'axios';

@Controller('stripe')
@ApiTags('Stripe')
export class StripeController {
  constructor(private readonly creditCardService: StripeService) {}

  @Post('create-checkout-session')
  @ApiOperation({
    summary: 'Create a Stripe checkout session for payment',
    description: 'Endpoint to create a checkout session for Stripe payment.',
  })
  @ApiResponse({
    status: 201,
    description: 'Checkout session successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Check request payload.',
  })
  async createPaymentCheckout(
    @Body(ValidationPipe) createProductDto: any,
  ): Promise<AxiosResponse> {
    return await this.creditCardService.createPaymentCheckout(createProductDto);
  }
}
