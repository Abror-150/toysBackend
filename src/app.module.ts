import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NaborModule } from './nabor/nabor.module';

@Module({
  imports: [NaborModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
