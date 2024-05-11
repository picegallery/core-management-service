import { HttpException, Injectable, Inject, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { AuthType, UserType } from 'src/users/entities/user.entity';
import { FailedToSignOutException } from '../exceptions/failedToSignOut.exception';

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

  async signInUser(
    email: string,
    password: string,
  ): Promise<CognitoUserSession> {
    try {
      const authenticationDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
      });
      const userData = {
        Username: email,
        Pool: this.userPool,
      };
      const newUser = new CognitoUser(userData);

      return new Promise<CognitoUserSession>((resolve, reject) => {
        newUser.authenticateUser(authenticationDetails, {
          onSuccess: (result) => {
            resolve(result);
          },
          onFailure: (error) => {
            reject(new HttpException(error.message, HttpStatus.UNAUTHORIZED));
          },
          newPasswordRequired: () => {
            reject(
              new HttpException(
                'Password reset is required',
                HttpStatus.UNAUTHORIZED,
              ),
            );
          },
        });
      });
    } catch (error) {
      console.log('error', error);
      throw new HttpException(error.message, error?.status ?? 400);
    }
  }

  async signOutUser(username: string): Promise<void> {
    try {
      const params: CognitoIdentityServiceProvider.Types.AdminUserGlobalSignOutRequest =
        {
          UserPoolId: this.userPoolId,
          Username: username,
        };
      await this.cognitoProvider.adminUserGlobalSignOut(params).promise();
    } catch (error) {
      throw new FailedToSignOutException(error.message);
    }
  }
}
