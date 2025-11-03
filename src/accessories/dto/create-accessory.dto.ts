import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateAccessoryDto {
  @ApiProperty({
    description: 'Ushbu accessory tegishli bo‘lgan nabor ID',
    example: 'b4b27d2a-4e61-4b2e-81f2-4b5b6e3e8d3b',
  })
  @IsNotEmpty({ message: 'naborId bo‘sh bo‘lmasligi kerak' })
  @IsUUID('4', { message: 'naborId noto‘g‘ri UUID formatda' })
  naborId: string;

  @ApiProperty({
    description: 'Accessory nomi',
    example: 'Qo‘shimcha batareya',
  })
  @IsNotEmpty({ message: 'name bo‘sh bo‘lmasligi kerak' })
  @IsString({ message: 'name string formatda bo‘lishi kerak' })
  name_uz: string;

  @ApiProperty({
    description: 'ruscha',
    example: 'Qo‘shimcha batareya',
  })
  @IsNotEmpty({ message: 'name bo‘sh bo‘lmasligi kerak' })
  @IsString({ message: 'name string formatda bo‘lishi kerak' })
  name_ru: string;

  @ApiProperty({
    description: 'inglizcha',
    example: 'Qo‘shimcha batareya',
  })
  @IsNotEmpty({ message: 'name bo‘sh bo‘lmasligi kerak' })
  @IsString({ message: 'name string formatda bo‘lishi kerak' })
  name_en?: string;
}
