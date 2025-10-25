import { Injectable } from '@nestjs/common';
import { CreateNaborDto } from './dto/create-nabor.dto';
import { UpdateNaborDto } from './dto/update-nabor.dto';

@Injectable()
export class NaborService {
  create(createNaborDto: CreateNaborDto) {
    return 'This action adds a new nabor';
  }

  findAll() {
    return `This action returns all nabor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} nabor`;
  }

  update(id: number, updateNaborDto: UpdateNaborDto) {
    return `This action updates a #${id} nabor`;
  }

  remove(id: number) {
    return `This action removes a #${id} nabor`;
  }
}
