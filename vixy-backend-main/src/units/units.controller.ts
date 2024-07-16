import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UnitsService } from './units.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/users/role.enum';

@Controller('units')
@UseGuards(AuthGuard, RolesGuard)
@Roles(Role.Admin, Role.Owner)
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @Post()
  async create(@Body() createUnitDto: CreateUnitDto) {
    return await this.unitsService.create(createUnitDto);
  }

  @Post('activation/:id')
  async activation(@Param('id') id: string) {
    return await this.unitsService.activation(id);
  }

  @Get()
  async findAll() {
    return await this.unitsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.unitsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUnitDto: UpdateUnitDto) {
    return await this.unitsService.update(id, updateUnitDto);
  }

  // @Delete(':id')
  // async remove(@Param('id') id: string) {
  //   return this.unitsService.remove(id);
  // }
}
