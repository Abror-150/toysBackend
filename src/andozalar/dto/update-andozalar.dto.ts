import { PartialType } from '@nestjs/swagger';
import { CreateAndozalarDto } from './create-andozalar.dto';

export class UpdateAndozalarDto extends PartialType(CreateAndozalarDto) {}
