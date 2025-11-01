import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import axios from 'axios';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    const { fullName, phoneNumber, location, totalPrice, orderItems } =
      createOrderDto;

    if (!orderItems || orderItems.length === 0)
      throw new BadRequestException('orderItems bo‘sh bo‘lmasligi kerak');

    const one = await this.prisma.nabor.findUnique({
      where: { id: orderItems[0].naborId },
    });
    if (!one) throw new BadRequestException('Nabor topilmadi');

    const order = await this.prisma.order.create({
      data: {
        fullName,
        phoneNumber,
        location,
        totalPrice,
        status: OrderStatus.PENDING,
        orderItems: {
          create: orderItems.map((item) => ({
            naborId: item.naborId,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        orderItems: {
          include: { nabor: true },
        },
      },
    });

    const BOT_TOKEN = '8202198108:AAHVOgeiLCJ2Y_SDUG-y_dB-kn8MVcEHJmA';
    const CHAT_ID = '-5043252829';

    const productList = order.orderItems
      .map((item) => `🧵 ${item.nabor.name} — ${item.quantity} dona`)
      .join('\n');

    const message = `
🆕 *Yangi buyurtma keldi!*
━━━━━━━━━━━━━━
👤 Ism: ${order.fullName}
📞 Telefon: ${order.phoneNumber}
📍 Manzil: ${order.location}
📦 Mahsulotlar:
${productList}
💰 Jami: ${order.totalPrice} so'm
📦 Status: ${order.status}
━━━━━━━━━━━━━━
🕒 Sana: ${new Date().toLocaleString('uz-UZ')}
`;

    try {
      await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      });
    } catch (err) {
      console.error('Telegramga xabar yuborishda xatolik:', err.message);
    }

    return order;
  }

  async findAll() {
    return this.prisma.order.findMany({
      include: {
        orderItems: {
          include: { nabor: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        orderItems: {
          include: { nabor: true },
        },
      },
    });

    if (!order) throw new NotFoundException(`Order with ID ${id} not found`);
    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const existing = await this.prisma.order.findUnique({
      where: { id },
      include: { orderItems: true },
    });
    if (!existing) throw new NotFoundException(`Order with ID ${id} not found`);

    const { orderItems, ...orderData } = updateOrderDto;

    const updatedOrder = await this.prisma.order.update({
      where: { id },
      data: {
        ...orderData,
        ...(orderItems && {
          orderItems: {
            deleteMany: {},
            create: orderItems.map((item) => ({
              naborId: item.naborId,
              quantity: item.quantity,
            })),
          },
        }),
      },
      include: {
        orderItems: {
          include: { nabor: true },
        },
      },
    });

    return updatedOrder;
  }

  async remove(id: string) {
    const existing = await this.prisma.order.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Order with ID ${id} not found`);

    await this.prisma.order.delete({ where: { id } });
    return { message: `Order with ID ${id} successfully deleted` };
  }
}
