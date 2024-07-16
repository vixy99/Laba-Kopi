import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService
  ){}

  async login(loginDto : LoginDto) {
    try {
      const dataUser =  await this.userService.validateUser(loginDto)
      if (!dataUser) {
          throw new UnauthorizedException('Wrong email or password');
      }
      return {token : await this.createToken(dataUser)}
    } catch (error) {
      return error
    }
  }

  async createToken(user: User) {
      const payload = {
        sub: user.id,
        username: user.username,
        role: user.role,
        email: user.email
      };
      return await this.jwtService.signAsync(payload);
  }
}
