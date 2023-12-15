import { SortedAssignmentDto } from './dto/sorted-assignment.dto';
import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Assignment } from './entities/assignment.entity';
import { CustomerLang } from 'src/languageModule/customer-lang/entities/customer-lang.entity';
import { RequiredLang } from 'src/languageModule/required-lang/entities/required-lang.entity';
import { Candidate } from '../candidates/entities/candidate.entity';
import { UserService } from 'src/userModule/user/user.service';
import { log } from 'console';
import { User } from 'src/userModule/user/entities/user.entity';
import { CandidatesService } from '../candidates/candidates.service';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectRepository(Assignment)
    private assignmentRepository: Repository<Assignment>,
    @InjectRepository(CustomerLang)
    private сustomerLangRepository: Repository<CustomerLang>,
    @InjectRepository(RequiredLang)
    private requiredLangRepository: Repository<RequiredLang>,
    @InjectRepository(Candidate)
    private candidateRepository: Repository<Candidate>,
    private readonly userService: UserService,
    private readonly candidatesService: CandidatesService,
  ) {}

  async create(createAssignmentDto: CreateAssignmentDto, customer_id: number) {
    const { customer_languages_id, required_languages_id, ...rest } =
      createAssignmentDto;

    const me = await this.userService.findById(customer_id);

    if (!('user_id' in me)) {
      return new NotFoundException('user not found');
    }

    const createdAssignment = await this.assignmentRepository.save({
      address: rest.address,
      assignment_date: rest.assignment_date,
      assignment_title: rest.assignment_title,
      city_id: rest.city_id,
      country_id: rest.country_id,
      assignment_description: rest.assignment_description,
      execution_time_minutes: rest.execution_time_minutes,
      worth: rest.worth,
      customer_id: me,
    });

    const createdCustomerLangs = [];
    const createdRequiredLangs = [];

    try {
      let custLangData;
      let reqLangData;
      for (const e of customer_languages_id) {
        custLangData = await this.сustomerLangRepository.save({
          assignment_id: createdAssignment.assignment_id,
          customer_language_id: e,
        });
        createdCustomerLangs.push(custLangData.customer_language_id);
      }

      for (const e of required_languages_id) {
        reqLangData = await this.requiredLangRepository.save({
          assignment_id: createdAssignment.assignment_id,
          required_language_id: e,
        });
        createdRequiredLangs.push(reqLangData.required_language_id);
      }
    } catch (error) {
      throw new ConflictException(`Error: ${error}`);
    }

    const { password, user_id, full_name, user_photo } =
      createdAssignment.customer_id;
    const { customer_id: user, ...assignmets } = createdAssignment;

    return {
      ...assignmets,
      customer: {
        customer_id: user_id,
        full_name,
        user_photo,
      },
      customer_languages_id: createdCustomerLangs,
      required_languages_id: createdRequiredLangs,
    };
  }

  async getSortedAssigments(sortedDto: SortedAssignmentDto) {
    const { limit, location, location_id, matchinglang } = sortedDto;

    const qb = this.assignmentRepository.createQueryBuilder('a');
    qb.select([
      'a.assignment_id',
      'a.worth',
      'a.assignment_date',
      'a.country_id',
      'a.city_id',
      'a.assignment_title',
      'a.assignment_description',
      'a.assignment_creation_date',
      // 'a.required_languages_id',
      // 'a.customer_languages_id',
    ]);
    const [assigments, totalCount] = await qb.getManyAndCount();

    const requiredLangData = {};
    const customerLangData = {};
    for (const e of assigments) {
      const requiredLangInfo = await this.requiredLangRepository
        .createQueryBuilder('req')
        .where('req.assignment_id = :assignmentId', {
          assignmentId: e.assignment_id,
        })
        .select('req.language_id')
        .getRawMany();

      const customerLangInfo = await this.сustomerLangRepository
        .createQueryBuilder('cus')
        .where('cus.assignment_id = :assignmentId', {
          assignmentId: e.assignment_id,
        })
        .select('cus.language_id')
        .getRawMany();

      requiredLangData[e.assignment_id] = requiredLangInfo.map(
        (e) => e.language_id,
      );
      customerLangData[e.assignment_id] = customerLangInfo.map(
        (e) => e.language_id,
      );
    }

    assigments.forEach((e: AssignmentWithLang) => {
      e.required_languages_id = requiredLangData[e.assignment_id];
      e.customer_languages_id = customerLangData[e.assignment_id];
    });

    return {
      totalCount,
      assigments,
    };
  }

  async findOne(id: number) {
    const assignment: any = await this.assignmentRepository
      .createQueryBuilder('a')
      .where('a.assignment_id = :assignmentId', { assignmentId: id })
      .leftJoinAndSelect('a.customer_id', 'customer')
      .leftJoinAndSelect('a.executor_id', 'executor')
      .getOne();

    // console.log(assignment);

    if (!assignment) {
      throw new NotFoundException('Assignment not found');
    }

    const { customer_id, executor_id, ...restAssignment } = assignment;
    const {
      user_id: c_user_id,
      full_name: c_full_name,
      user_photo: c_user_photo,
    } = customer_id;

    const qb = this.candidateRepository.createQueryBuilder('cd');
    qb.select(['cd.user_id']);
    qb.where('cd.assignment_id = :assignmentId', { assignmentId: id });
    const candidates = await qb.getRawMany();

    const candidatesArr = candidates.map((e) => e.cd_user_id);

    return {
      ...restAssignment,
      customer: {
        customer_id: c_user_id,
        full_name: c_full_name,
        user_photo: c_user_photo,
      },
      executor: {
        executor_id: executor_id ? executor_id.user_id : null,
        full_name: executor_id ? executor_id.full_name : null,
        user_photo: executor_id ? executor_id.user_photo : null,
      },
      candidates: {
        candidatesCount: candidatesArr.length,
        candidates: candidatesArr,
      },
    };
  }

  async update(id: number, updateAssignmentDto: UpdateAssignmentDto) {
    const assigment = await this.assignmentRepository.findOne({
      where: { assignment_id: id },
    });
    if (!assigment) {
      throw new NotFoundException('assigment not found');
    }

    if (
      updateAssignmentDto.worth &&
      assigment.worth !== updateAssignmentDto.worth &&
      assigment.executor_id !== null
    ) {
      throw new ConflictException(
        'you cannot change the price if the executor is already appointed',
      );
    }
    await this.assignmentRepository.update(id, updateAssignmentDto);
    const updatedAssigment = await this.assignmentRepository.findOne({
      where: { assignment_id: id },
    });

    return updatedAssigment;
  }

  async getAllMyAssignment({ authUserID }: { authUserID: number }) {
    try {
      const allMyAssignment = await this.assignmentRepository
        .createQueryBuilder('a')
        .where('a.customer_id = :authUserID', { authUserID })
        .getMany();

      const assigment_ids = allMyAssignment.map((e) => e.assignment_id);
      const candidates: AssignmentsCandidate[] =
        await this.candidatesService.getCandidatesByManyAssignmentIDs(
          assigment_ids,
        );

      const requiredLangData = {};
      const customerLangData = {};
      for (const e of allMyAssignment) {
        const requiredLangInfo = await this.requiredLangRepository
          .createQueryBuilder('req')
          .where('req.assignment_id = :assignmentId', {
            assignmentId: e.assignment_id,
          })
          .select('req.language_id')
          .getRawMany();

        const customerLangInfo = await this.сustomerLangRepository
          .createQueryBuilder('cus')
          .where('cus.assignment_id = :assignmentId', {
            assignmentId: e.assignment_id,
          })
          .select('cus.language_id')
          .getRawMany();

        requiredLangData[e.assignment_id] = requiredLangInfo.map(
          (e) => e.language_id,
        );
        customerLangData[e.assignment_id] = customerLangInfo.map(
          (e) => e.language_id,
        );
      }

      allMyAssignment.forEach((e: AssignmentWithLang) => {
        e.required_languages_id = requiredLangData[e.assignment_id];
        e.customer_languages_id = customerLangData[e.assignment_id];
      });

      allMyAssignment.forEach((e: AssignmentWithLang) => {
        for (let i = 0; i < candidates.length; i++) {
          if (e.assignment_id === candidates[i].assignment_id) {
            e.candidates = candidates[i]
          } 
        }
      });

      return {
        user_id: authUserID,
        totalCount: allMyAssignment.length,
        data: allMyAssignment,
      };
    } catch (error) {
      console.error('Error fetching assignments:', error);

      return {
        success: false,
        message: 'An error occurred while fetching assignments',
      };
    }
  }

  async pickOne({ authUserID, assigment_id, candidate_id }: PickOne) {
    if (authUserID === candidate_id) {
      return new ForbiddenException('you cannot respond to your own assigment');
    }

    const candatesDate =
      await this.candidatesService.getCandidatesByAssignmentID(assigment_id);

    console.log(candatesDate);

    const isOneOfCandidates = candatesDate.candidates.some(
      (e) => e.candidate_id === candidate_id,
    );

    if (!isOneOfCandidates) {
      return new ForbiddenException(
        `candidate ${candidate_id} did not respond to task ${assigment_id}`,
      );
    }

    const allMyAssignment = await this.getAllMyAssignment({ authUserID });

    const found = allMyAssignment.data.some(
      (e) => e.assignment_id === assigment_id,
    );
    if (!found) {
      return new ForbiddenException(
        'You do not have access to this assignment',
      );
    }

    try {
      await this.assignmentRepository.update(assigment_id, {
        executor_id: candidate_id,
        assignment_status: 2,
      });

      return {
        success: true,
        message: `User ${candidate_id} is selected for assignment ${assigment_id}`,
        assigment_status: 2,
      };
    } catch (error) {
      console.error('Error picking assignment:', error);

      return {
        success: false,
        message: 'An error occurred while picking assignment',
      };
    }
  }
}

type AssignmentWithLang = Assignment & {
  required_languages_id: number[]; // Подставьте правильный тип данных
  customer_languages_id: number[]; // Подставьте правильный тип данных
  candidates: any;
};

type PickOne = {
  authUserID: number;
  assigment_id: number;
  candidate_id: number;
};

type AssignmentsCandidate = {
  totalCount: number;
  assignment_id: number;
  candidates: any[];
};
