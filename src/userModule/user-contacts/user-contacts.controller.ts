import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserContactsService } from './user-contacts.service';
import { CreateUserContactDto } from './dto/create-user-contact.dto';
import { UpdateUserContactDto } from './dto/update-user-contact.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('user-contacts')
export class UserContactsController {
  constructor(private readonly userContactsService: UserContactsService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getById(@Request() req, @Param('id') profile_id: number) {
    return this.userContactsService.getContactsByUserID({
      my_id: req.user.user_id,
      profile_id,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@Request() req, @Body() UpdateUserContactDto: UpdateUserContactDto) {
    return this.userContactsService.update({
      my_id: req.user.user_id,
      dto: UpdateUserContactDto,
    });
  }
}
