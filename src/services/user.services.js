import { responseFromMission, responseFromUser } from '../dtos/user.dto.js';
import { responseFromReview } from '../dtos/user.dto.js';
import {
  addMission,
  addReview,
  addUser,
  getMission,
  getReview,
  getUser,
  getUserPreferencesByUserId,
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
    throw new Error('이미 존재하는 이메일입니다.');
  }

  for (const food of data.food) {
    await setPreference(joinUserId, food);
  }

  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);

  return responseFromUser({ user, preferences });
};

export const postReviews = async(data) => {
  const newReviewId = await addReview({
    userid: data.userid,
    storeid: data.storeid,
    content: data.content,
    score: data.score
  })

  if(newReviewId === null){
    throw new Error('존재하지 않는 가게입니다');
  }

  const review = await getReview(newReviewId);
  
  return responseFromReview({review});
}

export const postMissions = async(data) => {
  const newMissionId = await addMission({
    userid: data.userid,
    missionid: data.missionid,
  })

  if(!newMissionId){
    throw new Error('이미 도전 중인 미션입니다');
  }

  const mission = await getMission(newMissionId);
  
  return responseFromMission({mission});
}
