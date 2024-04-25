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

import { UserPreferencesService } from './user-preferences.service';
import { CreateUserPreferenceDto } from './dto/create-user-preference.dto';
import { UpdateUserPreferenceDto } from './dto/update-user-preference.dto';

const path = '/:userId/preferences';
@ApiTags('UserPreferences')
@Controller('users')
export class UserPreferencesController {
  constructor(
    private readonly userPreferencesService: UserPreferencesService,
  ) {}

  @Post(`${path}`)
  create(@Body() createUserPreferenceDto: CreateUserPreferenceDto) {
    return this.userPreferencesService.create(createUserPreferenceDto);
  }

  @Get(`${path}`)
  findAll() {
    return this.userPreferencesService.findAll();
  }

  @Get(`${path}/:id`)
  findOne(@Param('id') id: string) {
    return this.userPreferencesService.findOne(+id);
  }

  @Patch(`${path}/:id`)
  update(
    @Param('id') id: string,
    @Body() updateUserPreferenceDto: UpdateUserPreferenceDto,
  ) {
    return this.userPreferencesService.update(+id, updateUserPreferenceDto);
  }

  @Delete(`${path}/:id`)
  remove(@Param('id') id: string) {
    return this.userPreferencesService.remove(+id);
  }
}
