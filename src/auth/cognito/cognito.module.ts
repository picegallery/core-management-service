import { Module } from '@nestjs/common';
import { CognitoService } from './cognito.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [CognitoService],
})
export class CognitoModule {}
