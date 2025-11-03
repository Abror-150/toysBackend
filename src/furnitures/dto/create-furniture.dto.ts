import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateFurnitureDto {
  @ApiProperty({
    example: '4f1c2d7e-0b12-4a97-8c31-6a5b8e3e34c1',
    description: 'Furniture tegishli bo‘lgan naborning UUID identifikatori',
  })
  @IsUUID()
  @IsNotEmpty({ message: 'naborId bo‘sh bo‘lmasligi kerak' })
  naborId: string;

  @ApiProperty({
    example: 'Yog‘och stol',
    description: 'Furniture nomi',
  })
  @IsString({ message: 'name faqat matn bo‘lishi kerak' })
  @IsNotEmpty({ message: 'name bo‘sh bo‘lmasligi kerak' })
  name_uz: string;

  @ApiProperty({
    example: 'ruscha',
    description: 'Furniture nomi',
  })
  @IsString({ message: 'name faqat matn bo‘lishi kerak' })
  @IsNotEmpty({ message: 'name bo‘sh bo‘lmasligi kerak' })
  name_ru?: string;

  @ApiProperty({
    example: 'inglizcha',
    description: 'Furniture nomi',
  })
  @IsString({ message: 'name faqat matn bo‘lishi kerak' })
  @IsNotEmpty({ message: 'name bo‘sh bo‘lmasligi kerak' })
  name_en?: string;
}
