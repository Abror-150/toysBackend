import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NaborModule } from './nabor/nabor.module';
import { PrismaModule } from './prisma/prisma.module';
import { MaterialsModule } from './materials/materials.module';
import { AccessoriesModule } from './accessories/accessories.module';
import { FurnituresModule } from './furnitures/furnitures.module';
import { AndozalarModule } from './andozalar/andozalar.module';
import { OrderModule } from './order/order.module';
import { UploadController } from './upload/upload.controller';

@Module({
  imports: [NaborModule, PrismaModule, MaterialsModule, AccessoriesModule, FurnituresModule, AndozalarModule, OrderModule],
  controllers: [AppController, UploadController],
  providers: [AppService],
})
export class AppModule {}
