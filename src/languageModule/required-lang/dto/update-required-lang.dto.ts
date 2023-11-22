import { PartialType } from '@nestjs/mapped-types';
import { CreateRequiredLangDto } from './create-required-lang.dto';

export class UpdateRequiredLangDto extends PartialType(CreateRequiredLangDto) {}
