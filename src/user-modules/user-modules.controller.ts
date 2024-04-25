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
import { UserModulesService } from './user-modules.service';
import { CreateUserModuleDto } from './dto/create-user-module.dto';
import { UpdateUserModuleDto } from './dto/update-user-module.dto';

const path = '/:userId/modules';
@ApiTags('UserModules')
@Controller('users')
export class UserModulesController {
  constructor(private readonly userModulesService: UserModulesService) {}

  @Post(`${path}`)
  create(@Body() createUserModuleDto: CreateUserModuleDto) {
    return this.userModulesService.create(createUserModuleDto);
  }

  @Get(`${path}`)
  findAll() {
    return this.userModulesService.findAll();
  }

  @Get(`${path}/:id`)
  findOne(@Param('id') id: string) {
    return this.userModulesService.findOne(+id);
  }

  @Patch(`${path}/:id`)
  update(
    @Param('id') id: string,
    @Body() updateUserModuleDto: UpdateUserModuleDto,
  ) {
    return this.userModulesService.update(+id, updateUserModuleDto);
  }

  @Delete(`${path}/:id`)
  remove(@Param('id') id: string) {
    return this.userModulesService.remove(+id);
  }
}
