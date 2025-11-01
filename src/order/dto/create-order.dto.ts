import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsInt,
  IsArray,
  ValidateNested,
  Min,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OrderStatus } from '@prisma/client';

class OrderItemDto {
  @ApiProperty({
    example: '1b23c45d-6789-4fgh-90ij-12klmnop3456',
    description: 'Nabor ID (bog‘langan nabor ID si)',
  })
  @IsString()
  @IsNotEmpty()
  naborId: string;

  @ApiProperty({ example: 2, description: 'Buyurtmadagi mahsulot soni' })
  @IsInt()
  @Min(1)
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({
    example: 'Ali Valiyev',
    description: 'Buyurtmachining to‘liq ismi',
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: '+998901234567', description: 'Telefon raqami' })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    example: 'Toshkent, Yunusobod',
    description: 'Yetkazib berish manzili',
  })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ example: 150000, description: 'Buyurtmaning umumiy narxi' })
  @IsInt()
  @Min(0)
  totalPrice: number;

  @ApiProperty({
    type: [OrderItemDto],
    description: 'Buyurtmadagi mahsulotlar ro‘yxati',
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  orderItems: OrderItemDto[];
}
