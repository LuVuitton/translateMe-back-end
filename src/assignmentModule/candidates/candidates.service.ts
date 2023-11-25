import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { Candidate } from './entities/candidate.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assignment } from '../assignment/entities/assignment.entity';
import { ContactVisibilityService } from 'src/contact-visibility/contact-visibility.service';

@Injectable()
export class CandidatesService {
  constructor(
    @InjectRepository(Candidate)
    private candidateRepository: Repository<Candidate>,
    @InjectRepository(Assignment)
    private assignmentRepository: Repository<Assignment>,
    private readonly contactVisibilityService: ContactVisibilityService,
  ) {}

  async getCandidatesByAssignmentID(assignmentID: number) {
    let arrayCandidates: any[];
    let candidates: any[];
    try {
      candidates = await this.candidateRepository
        .createQueryBuilder('c')
        .where('c.assignment_id = :id', {
          id: assignmentID,
        })
        .leftJoinAndSelect('c.user_id', 'user')
        .leftJoinAndSelect('c.assignment_id', 'assignment')
        .select([
          'c.candidate_creation_date',
          'c.assignment_id',
          'user.user_id',
          'user.full_name',
          'user.user_photo',
          'assignment.executor_id',
        ])
        .getRawMany();

      arrayCandidates = candidates.map((e) => {
        return {
          assignment_id: e.c_assignment_id,
          apply_time: e.c_candidate_creation_date,
          candidate_id: e.user_user_id,
          candidate_full_name: e.user_full_name,
          candidate_photo: e.user_user_photo,
          isExecutor: e.user_user_id === e.executor_id,
        };
      });
    } catch (error) {
      return error;
    }

    return {
      totalCount: arrayCandidates.length,
      assignment_id: assignmentID,
      candidates: arrayCandidates,
    };
  }

  async getAssignmentsByCandidateID(candidateID: number) {
    let arrayAssignments: any[];
    try {
      const assignments = await this.candidateRepository
        .createQueryBuilder('c')
        .where('c.user_id = :id', {
          id: candidateID,
        })
        .leftJoinAndSelect('c.assignment_id', 'assignment') // Используем правильное название связи (relationship)
        .select([
          'c.assignment_id',
          'c.candidate_creation_date',
          'assignment.worth',
          'assignment.assignment_status',
          'assignment.address',
          'assignment.assignment_date',
          'assignment.country_id',
          'assignment.city_id',
          'assignment.assignment_title',
          'assignment.assignment_description',
          'assignment.executor_id',
          'assignment.execution_time_minutes',
        ])
        .getRawMany();

      arrayAssignments = assignments.map((e) => {
        return {
          assignment_id: e.c_assignment_id,
          apply_time: e.c_candidate_creation_date,
          worth: e.assignment_worth,
          status: e.assignment_assignment_status,
          address: e.assignment_address,
          date: e.assignment_assignment_date,
          country_id: e.assignment_country_id,
          city_id: e.assignment_city_id,
          title: e.assignment_assignment_title,
          description: e.assignment_assignment_description,
          executor_id: e.executor_id,
          execution_time_minutes: e.assignment_execution_time_minutes,
        };
      });
    } catch (error) {
      return error;
    }

    return {
      totalCount: arrayAssignments.length,
      candidate_id: candidateID,
      assignments: arrayAssignments,
    };
  }

  async create(createCandidateDto: CreateCandidateDto, authUserID: number) {
    const assignment = await this.assignmentRepository
      .createQueryBuilder('assignment')
      .leftJoinAndSelect('assignment.executor_id', 'executor')
      .leftJoinAndSelect('assignment.customer_id', 'customer')
      .where('assignment.assignment_id = :assignment_id', {
        assignment_id: createCandidateDto.assignment_id,
      })
      .getOne();

    if (!assignment) {
      throw new NotFoundException('assignment not found');
    }
    if (assignment.customer_id.user_id === authUserID) {
      throw new ConflictException('the user cannot respond to his own task');
    }

    try {
      const createdCandidate = await this.candidateRepository.save({
        assignment_id: createCandidateDto.assignment_id,
        user_id: authUserID,
      });

      await this.contactVisibilityService.addItem({
        owner_id: authUserID,
        viewer_id: assignment.customer_id.user_id,
      });

      const { assignment_id, user_id } = createdCandidate;

      return {
        message: 'user was successfully added',
        assignment_id,
        user_id,
      };
    } catch (error) {
      throw new ConflictException(error.sqlMessage);
    }
  }

  async remove(createCandidateDto: CreateCandidateDto, authUserID: number) {
    const assignment = await this.assignmentRepository.findOne({
      where: { assignment_id: createCandidateDto.assignment_id },
    });

    if (!assignment) {
      throw new NotFoundException('assignment not found');
    }

    // return this.candidateRepository.delete(id) проверить какой колонку id  он удаляет
    const candidate = await this.candidateRepository.findOne({
      where: {
        assignment_id: createCandidateDto.assignment_id,
        user_id: authUserID,
      },
    });
    if (!candidate) {
      throw new NotFoundException('candidate not found');
    }

    try {
      await this.candidateRepository.delete(candidate.id);
      return { message: 'user was successfully deleted' };
    } catch (error) {
      throw new ConflictException(error);
    }
  }
}

type GetAllByAsID = {
  authUserID: number;
  assignmentID: number;
};
