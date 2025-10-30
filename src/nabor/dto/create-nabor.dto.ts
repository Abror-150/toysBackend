import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateNaborDto {
  @ApiProperty({
    example: 'Soft Toy Set',
    description: 'Naborning nomi',
  })
  @IsString()
  @IsNotEmpty({ message: 'name bo‘sh bo‘lmasligi kerak' })
  name: string;

  @ApiProperty({
    example:
      'Trikotaj, astarlik mato, tugmalar, andoza va qo‘llanma bilan to‘liq to‘plam.',
    description: 'Nabor haqida to‘liq ma’lumot',
  })
  @IsString()
  @IsNotEmpty({ message: 'description kiritilishi kerak' })
  description: string;

  @ApiProperty({
    example: 'https://example.com/uploads/toy-set.jpg',
    description: 'Nabor rasmi (image URL)',
  })
  @IsString()
  @IsUrl({}, { message: 'image haqiqiy URL bo‘lishi kerak' })
  @IsNotEmpty({ message: 'image kiritilishi kerak' })
  image: string;

  @ApiProperty({
    example: true,
    description: 'Qo‘llanma (manual) bor-yo‘qligini bildiradi',
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  has_manual?: boolean;
}
