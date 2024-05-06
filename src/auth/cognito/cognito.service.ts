import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { AuthType, UserType } from 'src/users/entities/user.entity';

@Injectable()
export class CognitoService {
  private readonly userPool: CognitoUserPool;
  private clientID: string;
  private userPoolId: string;
  constructor(
    private configService: ConfigService,
    private readonly cognitoProvider: CognitoIdentityServiceProvider,
  ) {
    this.clientID = this.configService.get<string>('AWS_CLIENT_ID');
    this.userPoolId = this.configService.get<string>('AWS_USER_POOL_ID');
    console.log('this.clientID', this.clientID);
    console.log('this.userPoolId', this.userPoolId);
    this.userPool = new CognitoUserPool({
      UserPoolId: this.userPoolId,
      ClientId: this.clientID,
    });
    this.cognitoProvider = new CognitoIdentityServiceProvider({
      region: this.configService.get<string>('AWS_REGION'),
    });
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
          [
            new CognitoUserAttribute({
              Name: 'custom:role',
              Value: userType,
            }),
            new CognitoUserAttribute({ Name: 'email', Value: email }),
            new CognitoUserAttribute({
              Name: 'custom:login',
              Value: authType,
            }),
          ],

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
      throw new HttpException(error.message, error?.status ?? 400);
    }
  }
}
