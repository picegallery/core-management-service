import { ConfigService } from '@nestjs/config';
import { RepositoryEnum } from 'constants/repository';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: RepositoryEnum.DATA_SOURCE,
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: configService.get<boolean>('DATABASE_SYNCRONIZE'),
      });

      return dataSource.initialize();
    },
    inject: [ConfigService],
  },
];
