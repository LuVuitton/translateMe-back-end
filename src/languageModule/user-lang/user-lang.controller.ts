import {
  Controller,
  Post,
  Delete,
  Query,
  UseGuards,
  Request,
  Body,
  Get,
  Param,
} from '@nestjs/common';
import { UserLangService } from './user-lang.service';
import { CreateUserLangDto } from './dto/create-user-lang.dto';
import { DeleteUserLangDto } from './dto/delete-user-lang.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('user-lang')
export class UserLangController {
  constructor(private readonly userLangService: UserLangService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createUserLangDto: CreateUserLangDto, @Request() req) {
    return this.userLangService.create(createUserLangDto, req.user.user_id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Query() deleteDto: DeleteUserLangDto, @Request() req) {
    return this.userLangService.remove(deleteDto, req.user.user_id);
  }

  @Get(':id')
  findOne(@Param('id') user_id: string) {
    return this.userLangService.getUserLangs(+user_id);
  }

}
