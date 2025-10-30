import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, Length } from 'class-validator';

export class CreateAndozalarDto {
  @ApiProperty({
    example: '8e52b8b3-7f7a-4a17-92f1-6c6a43a1ad12',
    description: 'Qaysi nabor (to‘plam) ga tegishli ekanligi (Nabor ID)',
  })
  @IsUUID()
  naborId: string;

  @ApiProperty({
    example: 'Yog‘ochdan kesma andoza',
    description:
      'Andoza nomi (masalan: plastmassa shakli, yog‘och shakli va hokazo)',
  })
  @IsString()
  @Length(2, 100, { message: 'Nomi 2–100 ta belgi oralig‘ida bo‘lishi kerak' })
  name: string;
}
