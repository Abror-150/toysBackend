import { Module } from '@nestjs/common';
import { FurnituresService } from './furnitures.service';
import { FurnituresController } from './furnitures.controller';

@Module({
  controllers: [FurnituresController],
  providers: [FurnituresService],
})
export class FurnituresModule {}
