import { RepositoryEnum } from 'constants/repository';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: RepositoryEnum.DATA_SOURCE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'postgres',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true, // remove on prod
      });

      return dataSource.initialize();
    },
  },
];
