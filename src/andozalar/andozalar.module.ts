import { Module } from '@nestjs/common';
import { AndozalarService } from './andozalar.service';
import { AndozalarController } from './andozalar.controller';

@Module({
  controllers: [AndozalarController],
  providers: [AndozalarService],
})
export class AndozalarModule {}
