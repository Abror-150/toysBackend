import { Module } from '@nestjs/common';
import { NaborService } from './nabor.service';
import { NaborController } from './nabor.controller';

@Module({
  controllers: [NaborController],
  providers: [NaborService],
})
export class NaborModule {}
