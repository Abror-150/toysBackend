import { PartialType } from '@nestjs/mapped-types';
import { CreateNaborDto } from './create-nabor.dto';

export class UpdateNaborDto extends PartialType(CreateNaborDto) {}
