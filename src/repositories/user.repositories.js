import { pool, prisma } from '../db.config.js';

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
  const conn = await pool.getConnection();

  try {
    const [confirm] = await pool.query(
      `SELECT * FROM store where id = ?;`,
      data.storeid
    );

    if (confirm.length === 0) {
      return null;
    }

    const [result] = await pool.query(
      `INSERT INTO review (userid, storeid, content, score) VALUES (?, ?, ?, ?);`,
      [data.userid, data.storeid, data.content, data.score]
    );

    return result.insertId;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

//리뷰 정보 얻기
export const getReview = async (reviewId) => {
  const conn = await pool.getConnection();

  try {
    const [review] = await pool.query(
      `SELECT * FROM review WHERE id = ?;`,
      reviewId
    );
    console.log(review);

    if (review.length == 0) {
      return null;
    }

    return review[0];
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

//review 데이터 삽입
export const addMission = async (data) => {
  const conn = await pool.getConnection();

  try {
    const [confirm] = await pool.query(
      `SELECT * FROM user_mission where userid = ? and missionid = ?;`,
      [data.userid, data.missionid]
    );

    if (confirm.length !== 0) {
      return null;
    }

    const [result] = await pool.query(
      `INSERT INTO user_mission (userid, missionid) VALUES (?, ?);`,
      [data.userid, data.missionid]
    );

    return result.insertId;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

//미션 정보 얻기
export const getMission = async (userMissionId) => {
  const conn = await pool.getConnection();

  try {
    const [mission] = await pool.query(
      `SELECT * FROM user_mission WHERE id = ?;`,
      userMissionId
    );
    console.log(mission);

    if (mission.length == 0) {
      return null;
    }

    return mission[0];
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
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
