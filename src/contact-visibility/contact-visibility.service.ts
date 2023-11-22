import { Injectable } from '@nestjs/common';
import { CreateContactVisibilityDto } from './dto/create-contact-visibility.dto';
import { UpdateContactVisibilityDto } from './dto/update-contact-visibility.dto';
import { ContactVisibility } from './entities/contact-visibility.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserContactsService } from 'src/userModule/user-contacts/user-contacts.service';


@Injectable()
export class ContactVisibilityService {
  constructor(
    @InjectRepository(ContactVisibility)
    private сontactVisibilityRepository: Repository<ContactVisibility>,
    private readonly userContactsService: UserContactsService,

  ) {}

  async addItem({ owner_id, viewer_id }: AddItem) {

    try {
      const contact = await this.userContactsService.getContactIdByUserId({
        user_id: owner_id,
      });
      await this.сontactVisibilityRepository.save({
        viewer_id,
        contact_id: contact.user_contact_id,
      });


      return {
        success: true,
        message: 'Contact visibility saved successfully',
      };
    } catch (error) {
      console.error('Error saving contact visibility:', error);
      return {
        success: false,
        message: 'An error occurred while saving contact visibility',
      };
    }
  }

  // async checkContactAccess({ contact_id, viewer_id }: CheckContactAccess) {
  //   // const x = await this.сontactVisibilityRepository.find();
  //   // console.log(x);
  //   return 'work'

  // }
}

type AddItem = {
  owner_id: number;
  viewer_id: number;
};

type CheckContactAccess = {
  contact_id: number;
  viewer_id: number;
};
