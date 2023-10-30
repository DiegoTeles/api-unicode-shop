import { Inject } from '@nestjs/common';
import { singleton } from 'tsyringe';
import { IProductsRepository, ProductsRepository } from './products.repository';

export interface ProductDTO {
  title: string;
  description: string;
  price: number;
}

export interface IProductsService {
  createProduct(request: ProductDTO): Promise<any>;
}

@singleton<IProductsService>()
export class ProductsService implements IProductsService {
  constructor(
    @Inject(ProductsRepository) private productRepository: IProductsRepository,
  ) {}

  async createProduct(createProductDto: ProductDTO): Promise<any> {
    await this.productRepository.create(createProductDto);
  }

  async findProducts(queryDto: any): Promise<any> {
    const offset = queryDto.page === undefined ? 0 : queryDto.page;
    const limit = queryDto.limit === undefined ? 15 : queryDto.limit;

    const result: any = await this.productRepository.findAndCountAll({
      limit,
      offset,
      raw: true,
    });

    return {
      totalCount: result.count,
      totalPages: Math.ceil(result.count / +limit),
      page: +offset,
      limit: +limit,
      data: result.rows,
    };
  }

  async findProductsById(id: number) {
    const { dataValues } = await this.productRepository.findOne({
      where: { id },
    });

    return {
      data: dataValues,
    };
  }

  async updateProduct(updateProductDto: any, id: number) {
    const [numberOfAffectedRows, [updatedData]] =
      await this.productRepository.update(
        { ...updateProductDto },
        { where: { id }, returning: true },
      );
    return { numberOfAffectedRows, updatedData };
  }

  async deleteProduct(id: number) {
    return await this.productRepository.delete({ where: { id } });
  }
}
