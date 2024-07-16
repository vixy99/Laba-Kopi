import { Injectable } from '@nestjs/common';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Unit } from './entities/unit.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UnitsService {
  constructor(
    @InjectRepository(Unit)
    private unitRepository: Repository<Unit>
  ){}

  async create(createUnitDto: CreateUnitDto) {
    try {
      await this.unitRepository.save(createUnitDto);
      return {message: 'Successfully save the data.'};
    } catch (error) {
      return error.code
    }
  }

  async activation(id: string) {
    const data = await this.findOne(id);
    if(data){
      if(data.deleted_at){
        await this.unitRepository.update(id, {deleted_at: null});
      }else{
        await this.remove(id);
      }
      return "Activation Updated";
    }
    return data;
  }

  async findAll() {
    return await this.unitRepository.find({withDeleted: true});
  }

  async findOne(id: string) {
    const data = await this.unitRepository.findOne({where : {
      id
      },
      withDeleted: true
    });
    if(data){
      return data;
    }
    return null;
  }

  async update(id: string, updateUnitDto: UpdateUnitDto) {
    try {
      await this.unitRepository.update(id, updateUnitDto);
      return {message: 'Successfully update user data.'};
    } catch (error) {
      return error.code
    }
  }

  async remove(id: string) {
    const result =  await this.unitRepository.softDelete(id);
    var message = "Data Not Found";
    if(result.affected !== 0){
      message = "Successfully delete user data";
    }
    return message;
  }
}
