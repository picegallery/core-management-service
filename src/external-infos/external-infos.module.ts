import { Module } from '@nestjs/common';
import { ExternalInfosService } from './external-infos.service';
import { ExternalInfosController } from './external-infos.controller';

@Module({
  controllers: [ExternalInfosController],
  providers: [ExternalInfosService],
})
export class ExternalInfosModule {}
