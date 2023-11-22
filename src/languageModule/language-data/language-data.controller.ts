import { Controller } from '@nestjs/common';
import { LanguageDataService } from './language-data.service';

@Controller('language-data')
export class LanguageDataController {
  constructor(private readonly languageDataService: LanguageDataService) {}

  // @Post()
  // create(@Body() createLanguageDatumDto: CreateLanguageDatumDto) {
  //   return this.languageDataService.create(createLanguageDatumDto);
  // }

  // @Get()
  // findAll() {
  //   return this.languageDataService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.languageDataService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateLanguageDatumDto: UpdateLanguageDatumDto,
  // ) {
  //   return this.languageDataService.update(+id, updateLanguageDatumDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.languageDataService.remove(+id);
  // }
}
