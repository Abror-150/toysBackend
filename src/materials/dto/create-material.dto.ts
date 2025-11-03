import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { MaterialsType } from '@prisma/client';

export class CreateMaterialDto {
  @ApiProperty({
    description: 'Nabor ID — bu material tegishli bo‘lgan Naborning IDsi',
    example: 'e6b5f962-9c41-4a3f-9e6d-7b912b1b6214',
  })
  @IsString()
  @IsNotEmpty()
  naborId: string;

  @ApiProperty({
    description: 'Material turi (TRIKOTAJ, ASTARLIK, yoki PAXTALIK)',
    enum: MaterialsType,
    example: MaterialsType.TRIKOTAJ,
  })
  @IsEnum(MaterialsType)
  type: MaterialsType;

  @ApiProperty({
    description: 'Material haqida qisqacha tavsif',
    example: 'Yuqori sifatli trikotaj mato, bolalar kiyimi uchun mos.',
  })
  @IsString()
  @IsNotEmpty()
  description_uz?: string;

  @ApiProperty({
    description: 'rus',
    example: 'Yuqori sifatli trikotaj mato, bolalar kiyimi uchun mos.',
  })
  @IsString()
  @IsNotEmpty()
  description_ru?: string;

  @ApiProperty({
    description: 'english',
    example: 'Yuqori sifatli trikotaj mato, bolalar kiyimi uchun mos.',
  })
  @IsString()
  @IsNotEmpty()
  description_en?: string;
}
