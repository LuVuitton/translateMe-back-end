import { PartialType } from '@nestjs/mapped-types';
import { CreateLanguageDatumDto } from './create-language-datum.dto';

export class UpdateLanguageDatumDto extends PartialType(CreateLanguageDatumDto) {}
