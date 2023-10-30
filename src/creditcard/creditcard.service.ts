import { Inject } from '@nestjs/common';
import { singleton } from 'tsyringe';
import {
  CreditCardRepository,
  ICreditCardRepository,
} from './creditcard.repository';
import { formatExpDate } from 'src/helpers/formatDate';
import { isValid } from 'creditcard.js';

export interface CreditCardDTO {
  exp_date: string;
  holder: string;
  number: string;
  cvv: string;
}

export interface ICreditCardService {
  createCreditCard(request: CreditCardDTO): Promise<any>;
}

@singleton<ICreditCardService>()
export class CreditCardService implements ICreditCardService {
  constructor(
    @Inject(CreditCardRepository)
    private creditCardRepository: ICreditCardRepository,
  ) {}

  async createCreditCard(createCreditCardDto: CreditCardDTO): Promise<any> {
    try {
      const numberCardIsValid = isValid(createCreditCardDto.number);

      const validate = formatExpDate(createCreditCardDto.exp_date);
      if (!numberCardIsValid) {
        return {
          isValid: false,
          message: 'Numero do cartão inválido',
        };
      }

      if (validate.isValid) {
        await this.creditCardRepository.create({
          ...createCreditCardDto,
          exp_date: validate.date,
        });
      }
      return validate;
    } catch (error) {
      console.error(error.message);
    }
  }

  async findCreditCard(queryDto: any): Promise<any> {
    const offset = queryDto.page === undefined ? 0 : queryDto.page;
    const limit = queryDto.limit === undefined ? 15 : queryDto.limit;

    const result: any = await this.creditCardRepository.findAndCountAll({
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

  async findCreditCardById(id: number) {
    const { dataValues } = await this.creditCardRepository.findOne({
      where: { id },
    });

    return {
      data: dataValues,
    };
  }

  async updateCreditCard(updateCreditCardDto: any, id: number) {
    const [numberOfAffectedRows, [updatedData]] =
      await this.creditCardRepository.update(
        { ...updateCreditCardDto },
        { where: { id }, returning: true },
      );
    return { numberOfAffectedRows, updatedData };
  }

  async deleteCreditCard(id: number) {
    return await this.creditCardRepository.delete({ where: { id } });
  }
}
