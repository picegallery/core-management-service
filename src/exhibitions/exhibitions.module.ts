import { Module } from '@nestjs/common';
import { ExhibitionsService } from './exhibitions.service';
import { ExhibitionsController } from './exhibitions.controller';
import { RepositoryEnum } from 'constants/repository';
import { DataSource } from 'typeorm';
import { Exhibition } from './entities/exhibition.entity';
import { DatabaseModule } from 'src/database/database.module';

export const exhibitionProviders = [
  {
    provide: RepositoryEnum.EXHIBITION_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Exhibition),
    inject: [RepositoryEnum.DATA_SOURCE],
  },
];

@Module({
  controllers: [ExhibitionsController],
  providers: [...exhibitionProviders, ExhibitionsService],
  imports: [DatabaseModule],
})
export class ExhibitionsModule {}
