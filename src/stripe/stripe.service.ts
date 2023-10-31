import Stripe from 'stripe';
import { Product } from './dto/product';

export class StripeService {
  private stripe;
  constructor() {
    this.stripe = new Stripe(process.env.API_SECRET_KEY, {
      apiVersion: '2023-10-16',
    });
  }

  async createPaymentCheckout(paymentRequestBody: Product[]): Promise<any> {
    console.log('paymentRequestBody :>> ', paymentRequestBody);
    const priceData = paymentRequestBody.map((item) => {
      return {
        price_data: {
          currency: 'brl',
          product_data: {
            name: item.title,
          },
          unit_amount: item.price * 100,
        },
        quantity: 1,
      };
    });

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: priceData,
      mode: 'payment',
      success_url: 'http://localhost:5173/sucess',
      cancel_url: 'http://localhost:5173/cart',
    });

    return { id: session.id };
  }
}
