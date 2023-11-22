import { Injectable } from '@nestjs/common';
import { UserService } from 'src/userModule/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/userModule/user/entities/user.entity';
import { CreateUserDto } from 'src/userModule/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByData({ email, password });
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  generateTwtToken(data: { user_id: number; email: string }) {
    const payload = { email: data.email, sub: data.user_id };
    return this.jwtService.sign(payload);
  }

  async login(user: User) {
    const { password, ...userData } = user;

    return {
      ...userData,
      token: this.generateTwtToken(userData),
    };
  }

  async registration(registerDto: CreateUserDto) {
    const newUser = await this.userService.createUser(registerDto);
    return {
      ...newUser,
      token: this.generateTwtToken(newUser),
    };
  }
}
