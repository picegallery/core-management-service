import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './guards/jwt.strategy';
import { CongnitoAuthGuard } from './guards/cognito.guard';
import { DatabaseModule } from 'src/database/database.module';
import { CognitoModule } from './cognito/cognito.module';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    CognitoModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, CongnitoAuthGuard],
  exports: [AuthService, CongnitoAuthGuard],
})
export class AuthModule {}
