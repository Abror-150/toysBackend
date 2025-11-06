import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContactService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateContactDto) {
    const created = await this.prisma.contact.create({ data });
    return created;
  }
  async findAll() {
    const [data, totalContacts] = await Promise.all([
      this.prisma.contact.findMany({
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.contact.count(),
    ]);

    return {
      totalContacts,
      data,
    };
  }

  async findOne(id: string) {
    const contact = await this.prisma.contact.findFirst({
      where: { id },
    });

    if (!contact) {
      throw new NotFoundException(`Contact #${id} topilmadi`);
    }

    return contact;
  }

  async remove(id: string) {
    const contact = await this.prisma.contact.findUnique({
      where: { id },
    });

    if (!contact) {
      throw new NotFoundException(`Contact #${id} topilmadi`);
    }

    await this.prisma.contact.delete({
      where: { id },
    });

    return { message: `Contact #${id} muvaffaqiyatli o'chirildi` };
  }
}
