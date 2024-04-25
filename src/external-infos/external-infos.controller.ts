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
import { ExternalInfosService } from './external-infos.service';
import { CreateExternalInfoDto } from './dto/create-external-info.dto';
import { UpdateExternalInfoDto } from './dto/update-external-info.dto';

@ApiTags('ExternalInfos')
@Controller('external-infos')
export class ExternalInfosController {
  constructor(private readonly externalInfosService: ExternalInfosService) {}

  @Post()
  create(@Body() createExternalInfoDto: CreateExternalInfoDto) {
    return this.externalInfosService.create(createExternalInfoDto);
  }

  @Get()
  findAll() {
    return this.externalInfosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.externalInfosService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExternalInfoDto: UpdateExternalInfoDto,
  ) {
    return this.externalInfosService.update(+id, updateExternalInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.externalInfosService.remove(+id);
  }
}
