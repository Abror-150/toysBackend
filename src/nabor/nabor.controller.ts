import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NaborService } from './nabor.service';
import { CreateNaborDto } from './dto/create-nabor.dto';
import { UpdateNaborDto } from './dto/update-nabor.dto';

@Controller('nabor')
export class NaborController {
  constructor(private readonly naborService: NaborService) {}

  @Post()
  create(@Body() createNaborDto: CreateNaborDto) {
    return this.naborService.create(createNaborDto);
  }

  @Get()
  findAll() {
    return this.naborService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.naborService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNaborDto: UpdateNaborDto) {
    return this.naborService.update(id, updateNaborDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.naborService.remove(id);
  }
}
