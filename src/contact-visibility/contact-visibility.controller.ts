import { Controller } from '@nestjs/common';
import { ContactVisibilityService } from './contact-visibility.service';
import { CreateContactVisibilityDto } from './dto/create-contact-visibility.dto';
import { UpdateContactVisibilityDto } from './dto/update-contact-visibility.dto';

@Controller('contact-visibility')
export class ContactVisibilityController {
  constructor(
    private readonly contactVisibilityService: ContactVisibilityService,
  ) {}
}
