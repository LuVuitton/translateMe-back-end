import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { SortedAssignmentDto } from './dto/sorted-assignment.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PickCandidateDto } from './dto/pick-candidate-assignment.dto';

@Controller('assignment')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createAssignmentDto: CreateAssignmentDto) {
    return this.assignmentService.create(createAssignmentDto, req.user.user_id);
  }

  @Get('sort/')
  getSorted(@Query() sortedDto: SortedAssignmentDto) {
    return this.assignmentService.getSortedAssigments(sortedDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all-my-assignments')
  getAll(@Request() req) {
    return this.assignmentService.getAllMyAssignment({
      authUserID: req.user.user_id,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assignmentService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  pickCandidate(@Request() req, @Body() pickCandidateDto: PickCandidateDto) {
    
    return this.assignmentService.pickOne({
      assigment_id: pickCandidateDto.assignment_id,
      authUserID: req.user.user_id,
      candidate_id: pickCandidateDto.candidate_id,
    });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAssignmentDto: UpdateAssignmentDto,
  ) {
    return this.assignmentService.update(+id, updateAssignmentDto);
  }

}
