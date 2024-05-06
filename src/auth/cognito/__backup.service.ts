// import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import {
//   AuthenticationDetails,
//   CognitoUser,
//   CognitoUserAttribute,
//   CognitoUserPool,
//   CognitoUserSession,
// } from 'amazon-cognito-identity-js';
// import SimpleCrypto from 'simple-crypto-js';
// import axios from 'axios';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository, DataSource } from 'typeorm';
// import { GoogleUser } from './type/google-user.type';
// import { CognitoIdentityServiceProvider } from 'aws-sdk';
// import { generatePassword } from './../utils/password-generator';

// import { AuthenticateUserDto } from './dto/authenticate-user.dto';
// import { ForgotPasswordDto } from './dto/forgot-password.dto';

// import { RequestNewPasswordDto } from './dto/request-new-password.dto';
// import { User } from './type/user.type';

// import { User as UserEntity, UserType } from './../users/entities/user.entity';
// import { VerifyUserDto } from './dto/verify-user.dto';

// import { AuthType } from './../users/entities/user.entity';
// import { CreateUserDto } from 'src/users/dto/create-user.dto';
// import { ConfigService } from '@nestjs/config';

// export class CognitoService {
//   private readonly userPool: CognitoUserPool;
//   private clientID: string;
//   private userPoolId: string;

//   constructor(
//     private configService: ConfigService,
//     private readonly cognitoProvider: CognitoIdentityServiceProvider,
//   ) {
//     this.clientID = this.configService.get<string>('AWS_CLIENT_ID');
//     this.userPoolId = this.configService.get<string>('AWS_USER_POOL_ID');
//     console.log('this.clientID', this.clientID);
//     console.log('this.userPoolId', this.userPoolId);
//     this.userPool = new CognitoUserPool({
//       UserPoolId: this.userPoolId,
//       ClientId: this.clientID,
//     });
//     this.cognitoProvider = new CognitoIdentityServiceProvider({
//       region: this.configService.get<string>('AWS_REGION'),
//     });
//   }

//   async registerUser(dto: CreateUserDto): Promise<CognitoUser> {
//     try {
//       const customer = await this.customerRepo.findOne({
//         where: { email: dto.email },
//       });
//       if (customer) {
//         throw new HttpException(
//           'User with this email already exists',
//           HttpStatus.BAD_REQUEST,
//         );
//       }
//       const user = await this.dataSource.manager.transaction(
//         async (transactionalEntityManager) => {
//           const cognitoUser = await this.createCognitoUser(
//             dto.email,
//             dto.password,
//           );

//           await transactionalEntityManager.save(UserEntity, {
//             ...dto,
//             loginType: AuthType.DEFAULT,
//           });

//           return cognitoUser;
//         },
//       );
//       return user;
//     } catch (error) {
//       throw new HttpException(error.message, error?.status ?? 400);
//     }
//   }

//   async createCognitoUser(
//     email: string,
//     password: string,
//     userType: UserType = UserType.CUSTOMER,
//     authType: AuthType = AuthType.DEFAULT,
//   ): Promise<CognitoUser> {
//     try {
//       return new Promise((resolve, reject) => {
//         return this.userPool.signUp(
//           email,
//           password,
//           [
//             new CognitoUserAttribute({
//               Name: 'custom:role',
//               Value: userType,
//             }),
//             new CognitoUserAttribute({ Name: 'email', Value: email }),
//             new CognitoUserAttribute({
//               Name: 'custom:login',
//               Value: authType,
//             }),
//           ],

//           null,
//           (err, result) => {
//             if (!result) {
//               reject(err);
//             } else {
//               resolve(result.user);
//             }
//           },
//         );
//       });
//     } catch (error) {
//       throw new HttpException(error.message, error?.status ?? 400);
//     }
//   }

//   async verifyUser(dto: VerifyUserDto): Promise<void> {
//     try {
//       const { email, verificationCode } = dto;
//       const user = await this.customerRepo.findOne({
//         where: { email: email },
//       });
//       if (!user) {
//         throw new HttpException('User not found', HttpStatus.NOT_FOUND);
//       }
//       const params: CognitoIdentityServiceProvider.Types.ConfirmSignUpRequest =
//         {
//           ClientId: this.clientID,
//           Username: email,
//           ConfirmationCode: verificationCode,
//         };
//       await this.cognitoProvider.confirmSignUp(params).promise();
//     } catch (error) {
//       throw new HttpException(error.message, error?.status ?? 400);
//     }
//   }

//   async authenticateUser(
//     customer: AuthenticateUserDto,
//   ): Promise<CognitoUserSession> {
//     try {
//       const { email, password } = customer;
//       const user = await this.customerRepo.findOne({
//         where: { email: email },
//       });
//       if (user.authType === AuthType.GOOGLE) {
//         throw new HttpException(
//           'This email previously registered with google, Please login with google',
//           HttpStatus.BAD_REQUEST,
//         );
//       }
//       const authenticationDetails = new AuthenticationDetails({
//         Username: email,
//         Password: password,
//       });
//       const userData = {
//         Username: email,
//         Pool: this.userPool,
//       };
//       const newUser = new CognitoUser(userData);

//       return new Promise<CognitoUserSession>((resolve, reject) => {
//         newUser.authenticateUser(authenticationDetails, {
//           onSuccess: (result) => {
//             resolve(result);
//           },
//           onFailure: (error) => {
//             reject(new HttpException(error.message, HttpStatus.UNAUTHORIZED));
//           },
//           newPasswordRequired: () => {
//             reject(
//               new HttpException(
//                 'Password reset is required',
//                 HttpStatus.UNAUTHORIZED,
//               ),
//             );
//           },
//         });
//       });
//     } catch (error) {
//       throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
//     }
//   }

//   async getCustomer(session: CognitoUserSession): Promise<User> {
//     try {
//       const payload = session.getIdToken().payload;
//       const email = payload.email;
//       const role = payload['custom:role'];
//       if (!email) {
//         throw new HttpException('Email is required', HttpStatus.NOT_FOUND);
//       }
//       if (!role) {
//         throw new HttpException('Role is required', HttpStatus.NOT_FOUND);
//       }
//       const customer: UserEntity = await this.customerRepo.findOne({
//         where: { email: email },
//       });
//       if (!customer) {
//         throw new HttpException('User not found', HttpStatus.NOT_FOUND);
//       }
//       const user: User = {
//         email,
//         role,
//         id: customer.id,
//       };
//       return user;
//     } catch (error) {
//       throw new HttpException(error.message, error?.status ?? 401);
//     }
//   }

//   async refreshToken(token: string): Promise<string> {
//     if (!token) {
//       throw new HttpException('Token is required', HttpStatus.BAD_REQUEST);
//     }
//     try {
//       const params = {
//         AuthFlow: 'REFRESH_TOKEN_AUTH',
//         ClientId: this.clientID,
//         AuthParameters: {
//           REFRESH_TOKEN: token,
//         },
//       };
//       const result = await this.cognitoProvider.initiateAuth(params).promise();
//       const accessToken = result.AuthenticationResult.AccessToken;
//       return accessToken;
//     } catch (error) {
//       throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
//     }
//   }

//   async logout(userName: string) {
//     try {
//       const params: CognitoIdentityServiceProvider.Types.AdminUserGlobalSignOutRequest =
//         {
//           UserPoolId: this.userPoolId,
//           Username: userName,
//         };
//       await this.cognitoProvider.adminUserGlobalSignOut(params).promise();
//     } catch (error) {
//       throw new HttpException(`Failed to logout: ${error.message}`, 400);
//     }
//   }

//   async getUserByEmail(
//     email: string,
//   ): Promise<CognitoIdentityServiceProvider.Types.AdminGetUserResponse> {
//     try {
//       const params: CognitoIdentityServiceProvider.Types.AdminGetUserRequest = {
//         UserPoolId: this.userPoolId,
//         Username: email,
//       };
//       return await this.cognitoProvider.adminGetUser(params).promise();
//     } catch (error) {
//       throw new HttpException(
//         `Failed to get user by email: ${error.message}`,
//         400,
//       );
//     }
//   }

//   async forgotPassword(dto: RequestNewPasswordDto): Promise<void> {
//     try {
//       const user = await this.getUserByEmail(dto.email);
//       const params: CognitoIdentityServiceProvider.Types.ForgotPasswordRequest =
//         {
//           ClientId: this.clientID,
//           Username: user.Username,
//         };
//       await this.cognitoProvider.forgotPassword(params).promise();
//     } catch (error) {
//       throw new HttpException(error.message, error?.status ?? 400);
//     }
//   }

//   async verifyForgotPassword(dto: ForgotPasswordDto) {
//     try {
//       const user = await this.getUserByEmail(dto.email);
//       const params: CognitoIdentityServiceProvider.Types.ConfirmForgotPasswordRequest =
//         {
//           ClientId: this.clientID,
//           Username: user.Username,
//           ConfirmationCode: dto.ConfirmationCode,
//           Password: dto.newPassword,
//         };
//       await this.cognitoProvider.confirmForgotPassword(params).promise();
//     } catch (error) {
//       throw new HttpException(error.message, 400);
//     }
//   }

//   async updateUserEmail(
//     userName: string,
//     newEmail: string,
//     exisingEmail: string,
//   ): Promise<void> {
//     try {
//       const currentUser = await this.customerRepo.findOne({
//         where: { email: exisingEmail },
//       });
//       if (!currentUser) {
//         throw new HttpException('User not found', HttpStatus.NOT_FOUND);
//       }
//       const params: CognitoIdentityServiceProvider.Types.AdminUpdateUserAttributesRequest =
//         {
//           UserPoolId: this.userPoolId,
//           Username: userName,
//           UserAttributes: [
//             {
//               Name: 'email',
//               Value: newEmail,
//             },
//           ],
//         };
//       await this.cognitoProvider.adminUpdateUserAttributes(params).promise();
//     } catch (error) {
//       throw new HttpException(error.message, error?.status ?? 400);
//     }
//   }

//   async verifyEmailVerificationCode(
//     userName: string,
//     oldEmail: string,
//     verificationCode: string,
//     token: string,
//   ): Promise<void> {
//     try {
//       // Find Existing user From Pool
//       const existingUser: CognitoIdentityServiceProvider.Types.AdminGetUserResponse =
//         await this.cognitoProvider
//           .adminGetUser({ Username: userName, UserPoolId: this.userPoolId })
//           .promise();
//       const exisingEmail = existingUser.UserAttributes.filter(
//         (attr) => attr.Name === 'custom:email',
//       ).shift().Value;
//       //Update Param
//       const params: CognitoIdentityServiceProvider.Types.VerifyUserAttributeRequest =
//         {
//           AccessToken: token,
//           AttributeName: 'email',
//           Code: verificationCode,
//         };
//       await this.cognitoProvider.verifyUserAttribute(params).promise();
//       // Update Token Attribute
//       const customParams: CognitoIdentityServiceProvider.Types.AdminUpdateUserAttributesRequest =
//         {
//           UserPoolId: this.userPoolId,
//           Username: userName,
//           UserAttributes: [
//             {
//               Name: 'custom:email',
//               Value: exisingEmail,
//             },
//           ],
//         };
//       await this.cognitoProvider
//         .adminUpdateUserAttributes(customParams)
//         .promise();
//       //Update database
//       await this.customerRepo.update(
//         { email: oldEmail },
//         { email: exisingEmail },
//       );
//     } catch (error) {
//       throw new HttpException(error.message, error?.status ?? 400);
//     }
//   }

//   async googleLogin(user: GoogleUser): Promise<CognitoUserSession> {
//     try {
//       const simpleCrypto = new SimpleCrypto(process.env.SECRET);
//       const { _accessToken, email } = user;

//       let password: string;

//       if (await this.isTokenExpired(_accessToken)) {
//         throw new HttpException('Token is expired', HttpStatus.UNAUTHORIZED);
//       }

//       const customer = await this.customerRepo.findOne({
//         where: { email: email },
//       });

//       if (customer && customer.authType === AuthType.DEFAULT) {
//         throw new HttpException(
//           'This email previously registered with email and password, Please login with your password',
//           HttpStatus.BAD_REQUEST,
//         );
//       }

//       if (!customer) {
//         password = generatePassword();
//         const encryptedPassword = simpleCrypto.encrypt(password);

//         await this.dataSource.manager.transaction(
//           async (transactionalEntityManager) => {
//             const cognitoUser = await this.createCognitoUser(
//               email,
//               password,
//               true,
//             );

//             await transactionalEntityManager.save(UserEntity, {
//               email,
//               firstName: user.name.givenName,
//               lastName: user.name.familyName,
//               loginType: AuthType.GOOGLE,
//               password: encryptedPassword,
//             });
//             return cognitoUser;
//           },
//         );
//       } else {
//         password = simpleCrypto.decrypt(customer.password).toString();
//       }

//       const session = await this.UserSignIn(email, password);
//       return session;
//     } catch (error) {
//       throw new HttpException(error.message, error?.status ?? 400);
//     }
//   }

//   async isTokenExpired(token: string): Promise<boolean> {
//     try {
//       const response = await axios.get(
//         `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`,
//       );

//       const expiresIn = response.data.expires_in;

//       if (!expiresIn || expiresIn <= 0) {
//         return true;
//       }

//       return false;
//     } catch (error) {
//       return true;
//     }
//   }

//   async UserSignIn(
//     username: string,
//     password: string,
//   ): Promise<CognitoUserSession> {
//     try {
//       const authenticationDetails = new AuthenticationDetails({
//         Username: username,
//         Password: password,
//       });

//       const userData = {
//         Username: username,
//         Pool: this.userPool,
//       };

//       const newUser = new CognitoUser(userData);

//       const session = await new Promise<CognitoUserSession>(
//         (resolve, reject) => {
//           newUser.authenticateUser(authenticationDetails, {
//             onSuccess: (result) => {
//               resolve(result);
//             },
//             onFailure: (error) => {
//               reject(new HttpException(error.message, HttpStatus.UNAUTHORIZED));
//             },
//             newPasswordRequired: () => {
//               reject(
//                 new HttpException(
//                   'Password reset is required',
//                   HttpStatus.UNAUTHORIZED,
//                 ),
//               );
//             },
//           });
//         },
//       );
//       return session;
//     } catch (error) {
//       throw new HttpException(error.message, error?.status ?? 400);
//     }
//   }
// }
