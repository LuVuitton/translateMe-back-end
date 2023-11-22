import { PartialType } from '@nestjs/mapped-types';
import { CreateContactVisibilityDto } from './create-contact-visibility.dto';

export class UpdateContactVisibilityDto extends PartialType(CreateContactVisibilityDto) {}
