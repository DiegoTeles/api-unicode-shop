import { singleton } from 'tsyringe';
import { BaseRepository, IBaseRepository } from '../core/repos/base.repos';
import { CreditCard } from './creditcard.entity';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ICreditCardRepository extends IBaseRepository<CreditCard> {}

@singleton<CreditCardRepository>()
export class CreditCardRepository
  extends BaseRepository<CreditCard>
  implements ICreditCardRepository
{
  constructor() {
    super(CreditCard);
  }
}
