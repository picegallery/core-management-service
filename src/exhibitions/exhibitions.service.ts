import { Inject, Injectable } from '@nestjs/common';
import { CreateExhibitionDto } from './dto/create-exhibition.dto';
import { UpdateExhibitionDto } from './dto/update-exhibition.dto';
import { RepositoryEnum } from 'constants/repository';
import { Repository } from 'typeorm';
import { Exhibition } from './entities/exhibition.entity';
import { InternalErrorException } from 'src/shared/exceptions/internalError.exception';

@Injectable()
export class ExhibitionsService {
  constructor(
    @Inject(RepositoryEnum.EXHIBITION_REPOSITORY)
    private exhibitionRepository: Repository<Exhibition>,
  ) {}

  async create(createExhibitionDto: CreateExhibitionDto) {
    try {
      const exhibition = this.exhibitionRepository.create(createExhibitionDto);
      await this.exhibitionRepository.save(exhibition);
      return exhibition;
    } catch (error) {
      throw new InternalErrorException(error);
    }
  }

  findAll() {
    return this.exhibitionRepository.find({
      order: { createdDate: 'ASC', deletedDate: 'ASC' },
    });
  }

  findOne(id: string) {
    return this.exhibitionRepository.findOneBy({ id });
  }

  async update(id: string, updateExhibitionDto: UpdateExhibitionDto) {
    try {
      await this.exhibitionRepository.update(id, updateExhibitionDto);
      return this.findOne(id);
    } catch (error) {
      throw new InternalErrorException(error);
    }
  }

  remove(id: string) {
    return this.exhibitionRepository.softDelete(id);
  }
}
