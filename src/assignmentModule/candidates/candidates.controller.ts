import {
  Controller,
  Post,
  Body,
  Delete,
  UseGuards,
  Request,
  Get,
  Param,
} from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('candidates')
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}

  @Get(':id')
  getCandidates(@Param('id') id: string) {
    return this.candidatesService.getCandidatesByAssignmentID(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAssignments(@Request() req ) {
    return this.candidatesService.getAssignmentsByCandidateID(req.user.user_id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createCandidateDto: CreateCandidateDto) {
    return this.candidatesService.create(createCandidateDto, req.user.user_id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Request() req, @Body() createCandidateDto: CreateCandidateDto) {
    return this.candidatesService.remove(createCandidateDto, req.user.user_id);
  }


}
