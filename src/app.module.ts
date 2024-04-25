import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ExternalInfosModule } from './external-infos/external-infos.module';
import { ExhibitionsModule } from './exhibitions/exhibitions.module';
import { ExhibitionArtworksModule } from './exhibition-artworks/exhibition-artworks.module';
import { ArtistAddressesModule } from './artist-addresses/artist-addresses.module';
import { ArtistNationalitiesModule } from './artist-nationalities/artist-nationalities.module';
import { ArtistArtworksModule } from './artist-artworks/artist-artworks.module';
import { ArtistsModule } from './artists/artists.module';
import { UserModulesModule } from './user-modules/user-modules.module';
import { ModulesModule } from './modules/modules.module';
import { UserPreferencesModule } from './user-preferences/user-preferences.module';

@Module({
  imports: [
    UsersModule,
    UserPreferencesModule,
    ModulesModule,
    UserModulesModule,
    ArtistsModule,
    ArtistArtworksModule,
    ArtistNationalitiesModule,
    ArtistAddressesModule,
    ExhibitionArtworksModule,
    ExhibitionsModule,
    ExternalInfosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
