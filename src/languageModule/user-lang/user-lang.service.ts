import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserLangDto } from './dto/create-user-lang.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserLang } from './entities/user-lang.entity';
import { User } from 'src/userModule/user/entities/user.entity';
import { DeleteUserLangDto } from './dto/delete-user-lang.dto';

@Injectable()
export class UserLangService {
  constructor(
    @InjectRepository(UserLang)
    private userLangRepository: Repository<UserLang>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserLangDto: CreateUserLangDto, authUserID: number) {
    for (const e of createUserLangDto.languages) {
      if (e[1] <= 0 || e[1] >= 4) {
        throw new HttpException(
          `proficiency_id shall be between 1 and 3`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    const user = await this.userRepository.findOne({
      where: { user_id: authUserID },
    });
    if (!user) {
      throw new NotFoundException('user not found');
    }

    for (const e of createUserLangDto.languages) {
      try {
        await this.userLangRepository.save({
          user_id: authUserID,
          language_id: e[0],
          proficiency_id: e[1],
        });
      } catch (error) {
        throw new HttpException(
          `${error.message}, The languages array should be in the format [language_id, proficiency_id]`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    const languagesData = await this.userLangRepository
      .createQueryBuilder('ul')
      .select([
        'ul.proficiency_id',
        'language.language_id',
        'language.language_name',
      ])
      .leftJoin('ul.language_id', 'language')
      .where('ul.user_id = :userId', {
        userId: authUserID,
      })
      .getRawMany();

    const result = languagesData.map((e) => ({
      proficiency: e.ul_proficiency_id,
      language_id: e.language_language_id,
      language_name: e.language_language_name,
    }));

    return {
      user_id: authUserID,
      languageCount: result.length,
      languages: result,
    };
  }

  async remove(deleteDto: DeleteUserLangDto, authUserID: number) {
    const primaryId = await this.userLangRepository.find({
      where: {
        language_id: deleteDto.language_id,
        user_id: authUserID,
      },
    });

    if (primaryId.length !== 0) {
      try {
        await this.userLangRepository.delete(primaryId[0].id);
        return { message: 'language was successfully deleted' };
      } catch (error) {
        throw new ConflictException(error);
      }
    } else {
      throw new NotFoundException('language not found');
    }
  }


  async getUserLangs(user_id:number) {
    const languagesData = await this.userLangRepository
      .createQueryBuilder('ul')
      .select([
        'ul.proficiency_id',
        'language.language_id',
        'language.language_name',
      ])
      .leftJoin('ul.language_id', 'language')
      .where('ul.user_id = :userId', {
        userId: user_id,
      })
      .getRawMany();

    const result = languagesData.map((e) => ({
      proficiency: e.ul_proficiency_id,
      language_id: e.language_language_id,
      language_name: e.language_language_name,
    }));

    return {
      user_id: user_id,
      languageCount: result.length,
      languages: result,
    };
  }
}
