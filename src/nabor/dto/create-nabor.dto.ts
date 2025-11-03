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
  name_uz?: string;

  @ApiProperty({
    example: 'Набор мягких игрушек',
    description: 'Набор',
  })
  @IsString()
  @IsNotEmpty({ message: 'name bo‘sh bo‘lmasligi kerak' })
  name_ru?: string;

  @ApiProperty({
    example: 'hello',
    description: 'n',
  })
  @IsString()
  @IsNotEmpty({ message: 'name bo‘sh bo‘lmasligi kerak' })
  name_en?: string;

  @ApiProperty({
    example:
      'Trikotaj, astarlik mato, tugmalar, andoza va qo‘llanma bilan to‘liq to‘plam.',
    description: 'Nabor haqida to‘liq ma’lumot',
  })
  @IsString()
  @IsNotEmpty({ message: 'description kiritilishi kerak' })
  description_uz?: string;

  @ApiProperty({
    example: 'ruscha',
    description: 'Nabor haqida to‘liq ma’lumot',
  })
  @IsString()
  @IsNotEmpty({ message: 'description kiritilishi kerak' })
  description_ru?: string;

  @ApiProperty({
    example: 'english what up man',
    description: 'Nabor haqida to‘liq ma’lumot',
  })
  @IsString()
  @IsNotEmpty({ message: 'description kiritilishi kerak' })
  description_en?: string;

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
