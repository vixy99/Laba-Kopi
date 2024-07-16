import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { join } from 'path';
import * as fs from 'fs';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ){}

  async create(createProductDto: CreateProductDto, file: Express.Multer.File) {
    try {
      const dataSave = JSON.parse(JSON.stringify(createProductDto))
      if(file){
        dataSave.image_file = file.filename;
      }
      await this.productRepository.save(dataSave);
      return {message: 'Successfully save the data.'};
    } catch (error) {
      return error.code
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto, file: Express.Multer.File) {
    try {
      const dataUpdate = JSON.parse(JSON.stringify(updateProductDto))
      if(file){
        dataUpdate.image_file = file.filename;
        const data = await this.findOne(id);
        const fileLocation = join(__dirname,'..', `../products/${data.image_file}`);
        console.log(fileLocation)
        await fs.unlink(fileLocation, (err) => {
          if(err) {
            console.log(err);
          }
        })
      }
      await this.productRepository.update(id, dataUpdate);
      return {message: 'Successfully update user data.'};
    } catch (error) {
      return error.code
    }
  }

  async activation(id: string) {
    const data = await this.findOne(id);
    if(data){
      if(data.deleted_at){
        await this.productRepository.update(id, {deleted_at: null});
      }else{
        await this.remove(id);
      }
      return "Activation Updated";
    }
    return data;
  }

  async findAll() {
    return await this.productRepository.find({withDeleted: true});
  }

  async findOne(id: string) {
    const data = await this.productRepository.findOne({where : {
      id
      },
      withDeleted: true
    });
    if(data){
      return data;
    }
    return null;
  }

  async remove(id: string) {
    const result =  await this.productRepository.softDelete(id);
    var message = "Data Not Found";
    if(result.affected !== 0){
      message = "Successfully delete user data";
    }
    return message;
  }
}
