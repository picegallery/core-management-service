import { PartialType } from '@nestjs/swagger';
import { CreateExternalInfoDto } from './create-external-info.dto';

export class UpdateExternalInfoDto extends PartialType(CreateExternalInfoDto) {}
