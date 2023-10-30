import { singleton } from 'tsyringe';
import { BaseRepository, IBaseRepository } from '../core/repos/base.repos';
import { Products } from './products.entity';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IProductsRepository extends IBaseRepository<Products> {}

@singleton<ProductsRepository>()
export class ProductsRepository
  extends BaseRepository<Products>
  implements IProductsRepository
{
  constructor() {
    super(Products);
  }
}
