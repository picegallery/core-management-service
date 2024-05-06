import { HttpException, Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { AuthType, UserType } from 'src/users/entities/user.entity';
import * as crypto from 'crypto';

@Injectable()
export class CognitoService {
  private readonly userPool: CognitoUserPool;
  private readonly clientSecret: string;
  private readonly userPoolId: string;
  private readonly clientId: string;
  constructor(
    private configService: ConfigService,
    @Inject('COGNITO_PROVIDER')
    private readonly cognitoProvider: CognitoIdentityServiceProvider,
  ) {
    this.clientId = this.configService.get<string>('AWS_CLIENT_ID');
    this.userPoolId = this.configService.get<string>('AWS_USER_POOL_ID');
    this.clientSecret = this.configService.get<string>('AWS_CLIENT_SECRET');
    if (!this.userPoolId || !this.clientId) {
      throw new Error('Both UserPoolId and ClientId are required.');
    }
    this.userPool = new CognitoUserPool({
      UserPoolId: this.userPoolId,
      ClientId: this.clientId,
    });
  }

  private generateUserAttributes(
    email: string,
    userType: UserType,
    authType: AuthType,
  ): CognitoUserAttribute[] {
    return [
      new CognitoUserAttribute({
        Name: 'custom:userType',
        Value: userType,
      }),
      new CognitoUserAttribute({ Name: 'email', Value: email }),
      new CognitoUserAttribute({
        Name: 'custom:authType',
        Value: authType,
      }),
    ];
  }

  async createCognitoUser(
    email: string,
    password: string,
    userType: UserType = UserType.CUSTOMER,
    authType: AuthType = AuthType.DEFAULT,
  ): Promise<CognitoUser> {
    try {
      return new Promise((resolve, reject) => {
        return this.userPool.signUp(
          email,
          password,
          this.generateUserAttributes(email, userType, authType),
          null,
          (err, result) => {
            if (!result) {
              reject(err);
            } else {
              resolve(result.user);
            }
          },
        );
      });
    } catch (error) {
      console.log('error', error);
      throw new HttpException(error.message, error?.status ?? 400);
    }
  }
}
