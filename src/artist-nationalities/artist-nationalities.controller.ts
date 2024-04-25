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
import { ArtistNationalitiesService } from './artist-nationalities.service';
import { CreateArtistNationalityDto } from './dto/create-artist-nationality.dto';
import { UpdateArtistNationalityDto } from './dto/update-artist-nationality.dto';

const path = '/:artistId/nationalities';
@ApiTags('ArtistNationalities')
@Controller('artists')
export class ArtistNationalitiesController {
  constructor(
    private readonly artistNationalitiesService: ArtistNationalitiesService,
  ) {}

  @Post(`${path}`)
  create(@Body() createArtistNationalityDto: CreateArtistNationalityDto) {
    return this.artistNationalitiesService.create(createArtistNationalityDto);
  }

  @Get(`${path}`)
  findAll() {
    return this.artistNationalitiesService.findAll();
  }

  @Get(`${path}/:id`)
  findOne(@Param('id') id: string) {
    return this.artistNationalitiesService.findOne(id);
  }

  @Patch(`${path}/:id`)
  update(
    @Param('id') id: string,
    @Body() updateArtistNationalityDto: UpdateArtistNationalityDto,
  ) {
    return this.artistNationalitiesService.update(
      id,
      updateArtistNationalityDto,
    );
  }

  @Delete(`${path}/:id`)
  remove(@Param('id') id: string) {
    return this.artistNationalitiesService.remove(id);
  }
}
