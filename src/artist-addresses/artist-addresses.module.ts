import { Module } from '@nestjs/common';
import { ArtistAddressesService } from './artist-addresses.service';
import { ArtistAddressesController } from './artist-addresses.controller';

@Module({
  controllers: [ArtistAddressesController],
  providers: [ArtistAddressesService],
})
export class ArtistAddressesModule {}
