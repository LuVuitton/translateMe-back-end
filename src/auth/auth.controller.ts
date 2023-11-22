import { UserService } from 'src/userModule/user/user.service';
import { CreateUserDto } from './../userModule/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // @UseGuards(JwtAuthGuard)
  @Post('registration')
  registration(@Body() registerDto: CreateUserDto) {
    return this.authService.registration(registerDto);
  }
}
