import {
  responseFromMission,
  responseFromMissionList,
  responseFromMissionUpdate,
  responseFromReviewList,
  responseFromUser,
  responseFromUserMissionList,
} from '../dtos/user.dto.js';
import { responseFromReview } from '../dtos/user.dto.js';
import {
  DuplicateUserEmailError,
  MissionAlreadyActiveError,
  MissionNotExistError,
  StoreNotExistError,
} from '../error.js';
import {
  addMission,
  addReview,
  addUser,
  getAllStoreMissions,
  getAllStoreReviews,
  getAllUserMissions,
  getAllUserReviews,
  getMission,
  getReview,
  getUser,
  getUserPreferencesByUserId,
  patchMissionClear,
  setPreference,
} from '../repositories/user.repositories.js';

export const userSignUp = async (data) => {
  const joinUserId = await addUser({
    name: data.name,
    gender: data.gender,
    birth: data.birth,
    email: data.email,
    address1: data.address1 || '',
    address2: data.address2 || '',
    phoneNumber: data.phoneNumber,
  });

  if (joinUserId === null) {
    throw new DuplicateUserEmailError('이미 존재하는 이메일입니다.', data);
  }

  for (const food of data.food) {
    await setPreference(joinUserId, food);
  }

  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);

  return responseFromUser({ user, preferences });
};

export const postReviews = async (data) => {
  const newReviewId = await addReview({
    userid: data.userid,
    storeid: data.storeid,
    content: data.content,
    score: data.score,
  });

  if (newReviewId === null) {
    throw new StoreNotExistError('존재하지 않는 가게입니다.', data);
  }

  const review = await getReview(newReviewId);

  return responseFromReview({ review });
};

export const postMissions = async (data) => {
  const newMissionId = await addMission({
    userid: data.userid,
    missionid: data.missionid,
  });

  console.log(newMissionId);
  if (!newMissionId) {
    throw new MissionAlreadyActiveError('이미 도전 중인 미션입니다', data);
  }

  const mission = await getMission(newMissionId);
  console.log(mission);

  return responseFromMission({ mission });
};

export const getReviewList = async (storeId, cursor) => {
  const reviewList = await getAllStoreReviews(storeId, cursor);
  const nextCursor = reviewList.length === 5 ? reviewList[4].id : null;
  return {
    reviews: responseFromReviewList(reviewList),
    nextCursor,
  };
};

export const getUserReviewList = async (userId, cursor) => {
  const reviewList = await getAllUserReviews(userId, cursor);
  const nextCursor = reviewList.length === 5 ? reviewList[4].id : null;
  return {
    reviews: responseFromReviewList(reviewList),
    nextCursor,
  };
};

export const getMissionList = async (storeId, cursor) => {
  const missionList = await getAllStoreMissions(storeId, cursor);
  const nextCursor = missionList.length === 5 ? missionList[4].id : null;
  return {
    missions: responseFromMissionList(missionList),
    nextCursor,
  };
};

export const getUserMissionList = async (userId, cursor) => {
  const missionList = await getAllUserMissions(userId, cursor);
  const nextCursor = missionList.length === 5 ? missionList[4].id : null;
  return {
    missions: responseFromUserMissionList(missionList),
    nextCursor,
  };
};

export const patchMissionState = async (userMissionId) => {
  const mission = await patchMissionClear(userMissionId);
  if (!mission) {
    throw new MissionNotExistError('존재하지 않는 미션입니다!');
  }
  return {
    mission: responseFromMissionUpdate(mission),
  };
};
