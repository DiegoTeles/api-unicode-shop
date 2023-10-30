import { Module } from '@nestjs/common';
import { CreditCardController } from './creditcard.controller';
import { CreditCardService } from './creditcard.service';
import { CreditCardRepository } from './creditcard.repository';
import { creditCardProviders } from './creditcard.providers';

@Module({
  imports: [],
  exports: [CreditCardRepository],
  providers: [CreditCardService, ...creditCardProviders, CreditCardRepository],
  controllers: [CreditCardController],
})
export class CreditCardModule {}
