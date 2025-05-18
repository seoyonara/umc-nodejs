import { prisma } from '../db.config.js';
import { MissionNotExistError } from '../error.js';

//User 데이터 삽입
export const addUser = async (data) => {
  const user = await prisma.user.findFirst({ where: { email: data.email } });
  if (user) {
    return null;
  }

  const created = await prisma.user.create({ data: data });
  return created.id;
};

// 사용자 정보 얻기
export const getUser = async (userId) => {
  const user = await prisma.user.findFirstOrThrow({ where: { id: userId } });
  return user;
};

// 음식 선호 카테고리 매핑
export const setPreference = async (userId, foodCategoryId) => {
  await prisma.userFoodCategory.create({
    data: {
      userId: userId,
      foodId: foodCategoryId,
    },
  });
};

// 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (userId) => {
  const preferences = await prisma.userFoodCategory.findMany({
    select: {
      id: true,
      userId: true,
      foodId: true,
      foodCategory: true,
    },
    where: { userId: userId },
    orderBy: { foodId: 'asc' },
  });

  return preferences;
};

//review 데이터 삽입
export const addReview = async (data) => {
  const store = await prisma.store.findUnique({ where: { id: data.storeid } });
  if (!store) return null;

  const created = await prisma.review.create({
    data: {
      userId: data.userid,
      storeId: data.storeid,
      content: data.content,
      score: data.score,
    },
  });

  return created.id;
};

//리뷰 정보 얻기
export const getReview = async (reviewId) => {
  return await prisma.review.findUnique({ where: { id: reviewId } });
};

//Mission 데이터 삽입
export const addMission = async (data) => {
  try {
    const existing = await prisma.userMission.findFirst({
      where: { userId: data.userid, missionId: data.missionid },
    });

    if (existing) return null;

    const created = await prisma.userMission.create({
      data: {
        userId: data.userid,
        missionId: data.missionid,
      },
    });

    return created.id;
  } catch (err) {
    throw new MissionNotExistError('존재하지 않는 미션입니다.', data);
  }
};

//미션 정보 얻기
export const getMission = async (userMissionId) => {
  return await prisma.userMission.findUnique({
    where: { id: userMissionId },
    include: {
      mission: true,
    },
  });
};

export const getAllStoreReviews = async (storeId, cursor) => {
  const reviews = await prisma.review.findMany({
    select: {
      id: true,
      content: true,
      storeId: true,
      userId: true,
      store: true,
      user: true,
    },
    where: { storeId: storeId, id: { gt: cursor } },
    orderBy: { id: 'asc' },
    take: 5,
  });

  return reviews;
};

export const getAllUserReviews = async (userId, cursor) => {
  const reviews = await prisma.review.findMany({
    select: {
      id: true,
      content: true,
      storeId: true,
      userId: true,
      store: true,
      user: true,
    },
    where: { userId: userId, id: { gt: cursor } },
    orderBy: { id: 'asc' },
    take: 5,
  });

  return reviews;
};

export const getAllStoreMissions = async (storeId, cursor) => {
  const missions = await prisma.mission.findMany({
    select: {
      id: true,
      storeId: true,
      store: true,
      date: true,
      point: true,
      cost: true,
    },
    where: { storeId: storeId, id: { gt: cursor } },
    orderBy: { id: 'asc' },
    take: 5,
  });

  return missions;
};

export const getAllUserMissions = async (userId, cursor) => {
  const missions = await prisma.userMission.findMany({
    select: {
      id: true,
      userId: true,
      missionId: true,
      isClear: true,
      mission: {
        select: {
          id: true,
          store: {
            select: {
              name: true,
              address: true,
            },
          },
        },
      },
    },
    where: {
      userId: userId,
      id: { gt: cursor },
    },
    orderBy: { id: 'asc' },
    take: 5,
  });

  return missions;
};

export const patchMissionClear = async (userMissionId) => {
  const existing = await prisma.userMission.findFirst({
    where: { id: userMissionId },
  });

  if (!existing) return null;

  const updated = await prisma.userMission.update({
    where: { id: userMissionId },
    data: { isClear: true },
    include: {
      mission: {
        include: {
          store: true,
        },
      },
    },
  });

  return updated;
};
