import { Injectable } from '@nestjs/common';
import { CreateExternalInfoDto } from './dto/create-external-info.dto';
import { UpdateExternalInfoDto } from './dto/update-external-info.dto';

@Injectable()
export class ExternalInfosService {
  create(createExternalInfoDto: CreateExternalInfoDto) {
    return 'This action adds a new externalInfo';
  }

  findAll() {
    return `This action returns all externalInfos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} externalInfo`;
  }

  update(id: number, updateExternalInfoDto: UpdateExternalInfoDto) {
    return `This action updates a #${id} externalInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} externalInfo`;
  }
}
