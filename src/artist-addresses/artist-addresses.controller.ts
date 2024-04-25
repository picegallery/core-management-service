import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ArtistAddressesService } from './artist-addresses.service';
import { CreateArtistAddressDto } from './dto/create-artist-address.dto';
import { UpdateArtistAddressDto } from './dto/update-artist-address.dto';

const path = '/:artistId/addresses';
@ApiTags('ArtistAddresses')
@Controller('artists')
export class ArtistAddressesController {
  constructor(
    private readonly artistAddressesService: ArtistAddressesService,
  ) {}

  @Post(`${path}`)
  create(@Body() createArtistAddressDto: CreateArtistAddressDto) {
    return this.artistAddressesService.create(createArtistAddressDto);
  }

  @Get(`${path}`)
  findAll() {
    return this.artistAddressesService.findAll();
  }

  @Get(`${path}/:id`)
  findOne(@Param('id') id: string) {
    return this.artistAddressesService.findOne(id);
  }

  @Patch(`${path}/id`)
  update(
    @Param('id') id: string,
    @Body() updateArtistAddressDto: UpdateArtistAddressDto,
  ) {
    return this.artistAddressesService.update(id, updateArtistAddressDto);
  }

  @Delete(`${path}/id`)
  remove(@Param('id') id: string) {
    return this.artistAddressesService.remove(id);
  }
}
