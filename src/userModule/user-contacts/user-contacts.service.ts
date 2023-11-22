import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserContactDto } from './dto/create-user-contact.dto';
import { UserContact } from './entities/user-contact.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactVisibilityService } from 'src/contact-visibility/contact-visibility.service';
import { ContactVisibility } from 'src/contact-visibility/entities/contact-visibility.entity';
import { User } from '../user/entities/user.entity';
import { UpdateUserContactDto } from './dto/update-user-contact.dto';

@Injectable()
export class UserContactsService {
  constructor(
    @InjectRepository(UserContact)
    private usersContactsRepositiry: Repository<UserContact>,

    @InjectRepository(ContactVisibility)
    private сontactVisibilityRepository: Repository<ContactVisibility>,
  ) {}

  async getContactsByUserID({ my_id, profile_id }: GetContactsByUserID) {
    const { user_contact_id } = await this.getContactIdByUserId({
      user_id: profile_id,
    });
    console.log('my_id', +my_id);
    console.log('profile_id', +profile_id);

    try {
      const allVisibility: any = await this.сontactVisibilityRepository
        .createQueryBuilder('visibility')
        .leftJoinAndSelect('visibility.viewer_id', 'viewer')
        .where('visibility.contact_id = :user_contact_id', { user_contact_id })
        .getMany();

      //allIdsWitchSeesContactId
      const found = allVisibility.find((e) => e.viewer_id.user_id === my_id);

      if (found || +my_id === +profile_id) {
        const userContacts = await this.usersContactsRepositiry.findOne({
          where: { user_id: profile_id },
        });
        return userContacts;
      } else {
        return new ForbiddenException(
          "You do not have access to the user's contacts",
        );
      }
    } catch (error) {
      console.error('Error in getContactsByUserID:', error);
      throw new Error('An error occurred while fetching contacts');
    }
  }

  async getContactIdByUserId({ user_id }: { user_id: number }) {
    try {
      const result = await this.usersContactsRepositiry.findOne({
        where: { user_id },
        select: ['user_contact_id'],
      });

      if (!result) {
        throw new NotFoundException(
          `Contact_id not found for user with id ${user_id}`,
        );
      }

      return result as { user_contact_id: number };
    } catch (error) {
      throw new InternalServerErrorException(
        `An error occurred while fetching contact: ${error.message}`,
      );
    }
  }

  async createContact(createUserContactDto: CreateUserContactDto) {
    try {
      await this.usersContactsRepositiry.save({
        user_id: createUserContactDto.user_id,
      });
      return 'User contact created successfully';
    } catch (error) {
      console.log('Unable to create user contact: ', error);
      throw new Error('Unable to create user contact');
    }
  }

  async update({ my_id, dto }: { my_id: number; dto: UpdateUserContactDto }) {
    if (Object.values(dto).every((val) => val === undefined || val === null)) {
      return {
        success: false,
        message: 'At least one contact property should be provided',
      };
    }

    const contact_id = await this.getContactIdByUserId({ user_id: my_id });

    try {
      await this.usersContactsRepositiry.update(contact_id, {
        instagram: dto.instagram,
        other_contacts: dto.other_contacts,
        phone_number: dto.phone_number,
        telegram: dto.telegram,
        viber: dto.viber,
        whatsapp: dto.whatsapp,
      });

      return {
        success: true,
        message: 'Contacts updated successfully',
      };
    } catch (error) {
      console.error('Error updating contacts:', error);
      return {
        success: false,
        message: 'An error occurred while updating contacts',
      };
    }
  }
}

type GetContactsByUserID = {
  my_id: number;
  profile_id: number;
};
