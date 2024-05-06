import { Module } from '@nestjs/common';
import { CognitoService } from './cognito.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CognitoIdentityServiceProvider } from 'aws-sdk';

@Module({
  imports: [ConfigModule],
  providers: [
    CognitoService,
    {
      provide: 'COGNITO_PROVIDER',
      useFactory: (configService: ConfigService) => {
        return new CognitoIdentityServiceProvider({
          region: configService.get<string>('AWS_REGION'),
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [CognitoService],
})
export class CognitoModule {}
