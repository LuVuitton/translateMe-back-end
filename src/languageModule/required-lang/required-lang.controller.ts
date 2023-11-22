import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RequiredLangService } from './required-lang.service';
import { CreateRequiredLangDto } from './dto/create-required-lang.dto';
import { UpdateRequiredLangDto } from './dto/update-required-lang.dto';

@Controller('required-lang')
export class RequiredLangController {
  constructor(private readonly requiredLangService: RequiredLangService) {}

  @Get(':id')
  getLangsById(@Param('id') id: string) {
    return this.requiredLangService.getByAssignmentId({assigment_id:+id});
  }


}
