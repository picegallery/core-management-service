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

import { ExhibitionArtworksService } from './exhibition-artworks.service';
import { CreateExhibitionArtworkDto } from './dto/create-exhibition-artwork.dto';
import { UpdateExhibitionArtworkDto } from './dto/update-exhibition-artwork.dto';

const path = '/:exhibitionId/artworks';
@ApiTags('ExhibitionArtworks')
@Controller('exhibitions')
export class ExhibitionArtworksController {
  constructor(
    private readonly exhibitionArtworksService: ExhibitionArtworksService,
  ) {}

  @Post(`${path}`)
  create(@Body() createExhibitionArtworkDto: CreateExhibitionArtworkDto) {
    return this.exhibitionArtworksService.create(createExhibitionArtworkDto);
  }

  @Get(`${path}`)
  findAll() {
    return this.exhibitionArtworksService.findAll();
  }

  @Get(`${path}/:id`)
  findOne(@Param('id') id: string) {
    return this.exhibitionArtworksService.findOne(id);
  }

  @Patch(`${path}/:id`)
  update(
    @Param('id') id: string,
    @Body() updateExhibitionArtworkDto: UpdateExhibitionArtworkDto,
  ) {
    return this.exhibitionArtworksService.update(
      id,
      updateExhibitionArtworkDto,
    );
  }

  @Delete(`${path}/:id`)
  remove(@Param('id') id: string) {
    return this.exhibitionArtworksService.remove(id);
  }
}
