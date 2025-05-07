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
    userid: mission.userid,
    missionid: mission.missionid,
    isclear: mission.isclear,
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
