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

@Module({
  imports: [NaborModule, PrismaModule, MaterialsModule, AccessoriesModule, FurnituresModule, AndozalarModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
