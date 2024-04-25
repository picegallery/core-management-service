import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Controller,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ArtistArtworksService } from './artist-artworks.service';
import { CreateArtistArtworkDto } from './dto/create-artist-artwork.dto';
import { UpdateArtistArtworkDto } from './dto/update-artist-artwork.dto';

const path = '/:artistId/artworks';
@ApiTags('ArtistArtworks')
@Controller('artists')
export class ArtistArtworksController {
  constructor(private readonly artistArtworksService: ArtistArtworksService) {}

  @Post(`${path}`)
  create(@Body() createArtistArtworkDto: CreateArtistArtworkDto) {
    return this.artistArtworksService.create(createArtistArtworkDto);
  }

  @Get(`${path}`)
  findAll() {
    return this.artistArtworksService.findAll();
  }

  @Get(`${path}/:id`)
  findOne(@Param('id') id: string) {
    return this.artistArtworksService.findOne(id);
  }

  @Patch(`${path}/:id`)
  update(
    @Param('id') id: string,
    @Body() updateArtistArtworkDto: UpdateArtistArtworkDto,
  ) {
    return this.artistArtworksService.update(id, updateArtistArtworkDto);
  }

  @Delete(`${path}/:id`)
  remove(@Param('id') id: string) {
    return this.artistArtworksService.remove(id);
  }
}
