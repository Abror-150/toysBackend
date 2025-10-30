import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    const { fullName, phoneNumber, location, totalPrice, status, orderItems } =
      createOrderDto;

    const one = await this.prisma.nabor.findUnique({
      where: { id: orderItems[0].naborId },
    });
    if (!one) throw new BadRequestException('Nabor not found');
    const order = await this.prisma.order.create({
      data: {
        fullName,
        phoneNumber,
        location,
        totalPrice,
        status,
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
