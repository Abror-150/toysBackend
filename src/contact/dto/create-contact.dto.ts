import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, Length } from 'class-validator';

export class CreateContactDto {
  @ApiProperty({
    example: 'Abror Urazaliev',
    description: 'Foydalanuvchining to‘liq ismi',
  })
  @IsString({ message: 'Name satr (string) bo‘lishi kerak' })
  @Length(2, 50, {
    message: 'Name uzunligi 2–50 belgidan iborat bo‘lishi kerak',
  })
  name: string;

  @ApiProperty({
    example: 'abror@example.com',
    description: 'Foydalanuvchining elektron pochtasi',
  })
  @IsEmail({}, { message: 'Email noto‘g‘ri formatda kiritilgan' })
  email: string;

  @ApiProperty({
    example: 'Salom! Menga sizning xizmatlaringiz yoqdi.',
    description: 'Foydalanuvchi tomonidan yuborilgan xabar matni',
  })
  @IsString({ message: 'Message satr (string) bo‘lishi kerak' })
  @Length(5, 500, { message: 'Message 5 dan 500 belgigacha bo‘lishi kerak' })
  message: string;
}
