import { pool } from '../db.config.js';

//User 데이터 삽입
export const addUser = async (data) => {
  const conn = await pool.getConnection();

  try {
    const [confirm] = await pool.query(
      `SELECT EXISTS(SELECT 1 FROM user WHERE email = ?) as isExistEmail;`,
      data.email
    );

    if (confirm[0].isExistEmail) {
      return null;
    }

    const [result] = await pool.query(
      `INSERT INTO user (email, name, gender, birth, address1, address2, phone_number) VALUES (?, ?, ?, ?, ?, ?, ?);`,
      [
        data.email,
        data.name,
        data.gender,
        data.birth,
        data.address1,
        data.address2,
        data.phoneNumber,
      ]
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

// 사용자 정보 얻기
export const getUser = async (userId) => {
  const conn = await pool.getConnection();

  try {
    const [user] = await pool.query(`SELECT * FROM user WHERE id = ?;`, userId);
    console.log(user);

    if (user.length == 0) {
      return null;
    }

    return user[0];
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

// 음식 선호 카테고리 매핑
export const setPreference = async (userId, foodCategoryId) => {
  const conn = await pool.getConnection();

  try {
    await pool.query(`INSERT INTO user_food (foodid, userid) VALUES (?, ?);`, [
      foodCategoryId,
      userId,
    ]);
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

// 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (userId) => {
  const conn = await pool.getConnection();

  try {
    const [preferences] = await pool.query(
      'SELECT ufc.id, ufc.foodid, ufc.userid, fcl.name ' +
        'FROM user_food ufc JOIN food fcl on ufc.foodid = fcl.id ' +
        'WHERE ufc.userid = ? ORDER BY ufc.foodid ASC;',
      userId
    );

    return preferences;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
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
      [
        data.userid,
        data.storeid,
        data.content,
        data.score
      ]
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
    const [review] = await pool.query(`SELECT * FROM review WHERE id = ?;`, reviewId);
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
      [
        data.userid,
        data.missionid,
      ]
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
    const [mission] = await pool.query(`SELECT * FROM user_mission WHERE id = ?;`, userMissionId);
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