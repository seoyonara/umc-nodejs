export const bodyToUser = (body) => {
  const birth = new Date(body.birth);

  return {
    name: body.name,
    gender: body.gender,
    birth,
    email: body.email,
    address1: body.address1 || '',
    address2: body.address2 || '',
    phoneNumber: body.phoneNumber,
    food: body.food,
  };
};

export const responseFromUser = ({ user, preferences }) => {
  const preferFoods = preferences.map(
    (preference) => preference.foodCategory.name
  );

  return {
    email: user.email,
    name: user.name,
    food: preferFoods,
  };
};

export const bodyToReview = (body) => {
  return {
    userid: body.userid,
    storeid: body.storeid,
    content: body.content,
    score: body.score,
  };
};

export const responseFromReview = ({ review }) => {
  return {
    userid: review.userid,
    storeid: review.storeid,
    content: review.content,
    score: review.score,
  };
};

export const bodyToMission = (body) => {
  return {
    userid: body.userid,
    missionid: body.missionid,
  };
};

export const responseFromMission = ({ mission }) => {
  return {
    userid: mission.userId,
    missionid: mission.missionId,
    isclear: mission.isClear,
  };
};

export const responseFromReviewList = (reviewList) => {
  return reviewList.map((review) => ({
    id: review.id,
    content: review.content,
    user: {
      id: review.user.id,
      name: review.user.name,
    },
    store: {
      name: review.store.name,
      address: review.store.address,
    },
  }));
};

export const responseFromMissionList = (missionList) => {
  return missionList.map((mission) => ({
    id: mission.id,
    store: {
      name: mission.store.name,
      address: mission.store.address,
    },
    date: mission.date,
    point: mission.point,
    cost: mission.cost,
  }));
};

export const responseFromUserMissionList = (missionList) => {
  return missionList.map((userMission) => ({
    id: userMission.id,
    mission: {
      name: userMission.mission.store.name,
      address: userMission.mission.store.address,
    },
    isClear: userMission.isClear,
  }));
};

export const responseFromMissionUpdate = (userMission) => {
  return {
    id: userMission.id,
    mission: {
      name: userMission.mission.store.name,
      address: userMission.mission.store.address,
    },
    isclear: userMission.isClear,
  };
};
