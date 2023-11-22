import { PartialType } from '@nestjs/mapped-types';
import { CreateUserLangDto } from './create-user-lang.dto';

export class UpdateUserLangDto extends PartialType(CreateUserLangDto) {}
