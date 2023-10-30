import { CreditCard } from './creditcard.entity';

export const creditCardProviders = [
  {
    provide: 'CREDIT_CARD_REPOSITORY',
    useValue: CreditCard,
  },
];
