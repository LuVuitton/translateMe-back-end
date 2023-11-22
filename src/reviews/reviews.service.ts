import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}

  async create(createReviewDto: CreateReviewDto, authUserID: number) {
    let result;
    

    try {
      const newReview = await this.reviewRepository.save({
        reviewer_id: authUserID,
        recipient_id: createReviewDto.recipient_id,
        review_text: createReviewDto.review_text,
      });


      console.log(authUserID);
      console.log(createReviewDto);
      

      try {
        result = await this.reviewRepository
          .createQueryBuilder('r')
          .where('review_id = :id', { id: newReview.review_id })
          .innerJoin('r.reviewer_id', 'user')
          .addSelect(['user.user_id', 'user.full_name', 'user.user_photo'])
          .where('r.review_id = :id', { id: newReview.review_id })
          .getOne();

      } catch (error) {
        return new Error(error);
      }
    } catch (error) {
      console.log(error);
    }
    return result
  }

  async getRewiewsByUserID(userID: number) {
    let allReviewsArr: any[];

    try {
      allReviewsArr = await this.reviewRepository
        .createQueryBuilder('r')
        .select(['r.review_id', 'r.review_text', 'r.review_creation_date'])
        .addSelect(['user.user_id', 'user.full_name', 'user.user_photo'])
        .innerJoin('r.reviewer_id', 'user')
        .where('recipient_id = :id', { id: userID })
        .getMany();
    } catch (error) {
      return new Error(error);
    }

    return {
      userID,
      totaCounts: allReviewsArr.length,
      userReviews: allReviewsArr,
    };
  }
}
