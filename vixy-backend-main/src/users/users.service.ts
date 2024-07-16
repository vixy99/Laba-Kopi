import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from './role.enum';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/auth/dto/login.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ){}
  async create(createUserDto: CreateUserDto) {
    try {
      createUserDto.salt = await bcrypt.genSalt();
      createUserDto.password = await bcrypt.hash(createUserDto.password, createUserDto.salt);
      await this.userRepository.save(createUserDto);
      return {message: 'Successfully save user data.'};
    } catch (error) {
      return error.code
    }
  }

//   findAll() {
//     return `This action returns all users`;
//   }

  async findAllKasir() {
    try {
      return await this.userRepository.find({
        where: {
          role : Role.Kasir
        }
      });
    } catch (error) {
      return error
    }
  }
  async validateUser(loginDto : LoginDto): Promise<User> {
    const dataUser = await this.userRepository.findOne({where : [
      {username: loginDto.username },
      {email: loginDto.username} 
    ]});
    if (dataUser && (await dataUser.validatePassword(loginDto.password))) {
      return dataUser;
    }else {
      return null
    }
  }
  async findOne(id: string) {
    return await this.userRepository.findOneBy({id});
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id,updateUserDto);
  }

  async remove(id: string) {
    return await this.userRepository.softDelete(id);
  }
}
