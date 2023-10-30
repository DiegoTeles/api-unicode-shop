import { Sequelize } from 'sequelize-typescript';

import { SEQUELIZE } from '../constants';
import databaseConfig from '../../configs/sequelize.config';
import { Products } from 'src/products/products.entity';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case 'development':
          config = databaseConfig.development;
          break;
        case 'production':
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.local;
      }

      try {
        const sequelize = new Sequelize(config);
        sequelize.authenticate();
        sequelize.addModels([Products]);
        await sequelize.sync();
        console.log('Database connected successfully!');
        return sequelize;
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
    },
  },
];
