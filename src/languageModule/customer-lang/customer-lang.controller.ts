import { Controller, Post, Body, Param, Delete, Get } from '@nestjs/common';
import { CustomerLangService } from './customer-lang.service';
import { CreateCustomerLangDto } from './dto/create-customer-lang.dto';

@Controller('customer-lang')
export class CustomerLangController {
  constructor(private readonly customerLangService: CustomerLangService) {}

  @Get(':id')
  getLangsById(@Param('id') id: string) {
    return this.customerLangService.getByAssignmentId({assigment_id:+id});
  }

  // @Post()
  // create(@Body() createCustomerLangDto: CreateCustomerLangDto) {
  //   return this.customerLangService.create(createCustomerLangDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.customerLangService.remove(+id);
  // }
}
