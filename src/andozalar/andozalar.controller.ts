import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AndozalarService } from './andozalar.service';
import { CreateAndozalarDto } from './dto/create-andozalar.dto';
import { UpdateAndozalarDto } from './dto/update-andozalar.dto';

@Controller('andozalar')
export class AndozalarController {
  constructor(private readonly andozalarService: AndozalarService) {}

  @Post()
  create(@Body() createAndozalarDto: CreateAndozalarDto) {
    return this.andozalarService.create(createAndozalarDto);
  }

  @Get()
  findAll() {
    return this.andozalarService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.andozalarService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAndozalarDto: UpdateAndozalarDto,
  ) {
    return this.andozalarService.update(id, updateAndozalarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.andozalarService.remove(id);
  }
}
