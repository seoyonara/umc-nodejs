import { StatusCodes } from 'http-status-codes';
import { bodyToMission, bodyToReview, bodyToUser } from '../dtos/user.dto.js';
import {
  getReviewList,
  postMissions,
  postReviews,
  userSignUp,
} from '../services/user.services.js';

export const handleUserSignUp = async (req, res, next) => {
  console.log('회원가입을 요청했습니다!');
  console.log('body: ', req.body);

  const user = await userSignUp(bodyToUser(req.body));
  res.status(StatusCodes.OK).json({ result: user });
};

export const handlePostReviews = async (req, res, next) => {
  console.log('리뷰 작성을 요청했습니다!');
  console.log('body: ', req.body);

  const review = await postReviews(bodyToReview(req.body));
  res.status(StatusCodes.OK).json({ result: review });
};

export const handlePostMissons = async (req, res, next) => {
  console.log('미션 도전을 요청했습니다!');
  console.log('body: ', req.body);

  const mission = await postMissions(bodyToMission(req.body));
  res.status(StatusCodes.OK).json({ result: mission });
};

export const handleStoreReviewList = async (req, res, next) => {
  const storeId = parseInt(req.params.storeId);
  const cursor =
    typeof req.query.cursor === 'string' ? parseInt(req.query.cursor) : 0;

  const { reviews, nextCursor } = await getReviewList(storeId, cursor);

  res.status(StatusCodes.OK).json({
    reviews,
    nextCursor,
  });
};
