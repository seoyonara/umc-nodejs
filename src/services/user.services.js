import { responseFromUser } from '../dtos/user.dto.js';
import {
  addUser,
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
