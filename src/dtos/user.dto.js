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
  return {
    name: user.name,
    gender: user.gender,
    birth: user.birth,
    email: user.email,
    address1: user.address1,
    address2: user.address2,
    phoneNumber: user.phoneNumber,
    food: preferences,
  };
};
