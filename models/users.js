const users = require("../data/users.json");
const userProfiles = require("../data/userProfiles.json");

getAge = (birthdate) => {
  const d1 = new Date(birthdate);
  const d2 = new Date();
  return d2.getFullYear() - d1.getFullYear();
};

exports.checkUser = async (name, userMessage) => {
  // find username in json; if not found show error
  const user = users.find((x) => x.username == name);
  if (!user) {
    return { user: null, msg: "msg_not_match" };
  }

  // find respective userprofile using user.uid
  const userProfile = userProfiles.find((x) => x.userUid == user.uid);
  const age = userProfile ? getAge(userProfile.birthdate): -1

  // check user age
  if (age > 0 && age < 10) {
    const usr = {
      uid: user.uid,
      username: user.username,
      address: userProfile.address,
      message: userMessage
    }

    return {
      user: usr,
      msg: "msg_request_receive",
    };
  } else {
    return { user: null, msg: "msg_age_not_match" };
  }
};
