import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import { UserContactsService } from '../user-contacts/user-contacts.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly userContactsService: UserContactsService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    let isEmailExist;
    try {
      isEmailExist = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });
      if (isEmailExist) {
        throw new ConflictException('email already exists'); //conflict is the 409 status
      }
      const newUser = await this.userRepository.save({
        email: createUserDto.email,
        full_name: createUserDto.full_name,
        password: createUserDto.password,
      });

      await this.userContactsService.createContact({
        user_id: newUser.user_id,
      });

      return {
        user_id: newUser.user_id,
        full_name: newUser.full_name,
        email: newUser.email,
        user_registration_date: newUser.user_registration_date,
      };
    } catch (err) {
      if (isEmailExist) {
        throw new ConflictException('email already exists'); //conflict is the 409 status
      }
      throw new ForbiddenException(`registration error: ${err}`);
    }
  }

  async findByData(userData: LoginUserDto) {
    const { email, password } = userData;

    return await this.userRepository.findOne({
      where: { email, password }, //checking fun
    });
  }

  async findById(id: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { user_id: id },
      });
      if (!user) {
        return {
          success: false,
          message: 'User not found',
        };
      }

      const { password, ...userData } = user;
      return userData;
    } catch (error) {
      console.error('Error finding user by ID:', error);
      return {
        success: false,
        message: 'An error occurred while finding user by ID',
      };
    }
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { user_id: id },
      });
      if (!user) {
        return {
          success: false,
          message: 'User not found',
        };
      }

      await this.userRepository.update(id, {
        city_id: updateUserDto.city_id,
        country_id: updateUserDto.country_id,
        full_name: updateUserDto.full_name,
        user_photo: updateUserDto.user_photo,
        about_me: updateUserDto.about_me
      });

      const updatedUser = await this.userRepository.findOne({
        where: { user_id: id },
      });

      const { password, ...userData } = updatedUser;
      return {
        success: true,
        message: 'User updated successfully',
        user: userData,
      };
    } catch (error) {
      console.error('Error updating user:', error);
      return {
        success: false,
        message: 'An error occurred while updating user',
      };
    }
  }
}
