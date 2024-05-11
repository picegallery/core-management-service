import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ExternalInfosModule } from './external-infos/external-infos.module';
import { ExhibitionsModule } from './exhibitions/exhibitions.module';
import { ExhibitionArtworksModule } from './exhibition-artworks/exhibition-artworks.module';
import { ArtistAddressesModule } from './artist-addresses/artist-addresses.module';
import { ArtistArtworksModule } from './artist-artworks/artist-artworks.module';
import { ArtistsModule } from './artists/artists.module';
import { UserModulesModule } from './user-modules/user-modules.module';
import { ModulesModule } from './modules/modules.module';
import { UserPreferencesModule } from './user-preferences/user-preferences.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { CognitoAuthModule } from '@nestjs-cognito/auth';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    CognitoAuthModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        jwtVerifier: {
          userPoolId: configService.get('AWS_USER_POOL_ID') as string,
          clientId: configService.get('AWS_CLIENT_ID'),
          tokenUse: 'id',
        },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    UserPreferencesModule,
    ModulesModule,
    UserModulesModule,
    ArtistsModule,
    ArtistArtworksModule,
    ArtistAddressesModule,
    ExhibitionArtworksModule,
    ExhibitionsModule,
    ExternalInfosModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
