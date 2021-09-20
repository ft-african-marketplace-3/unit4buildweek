const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../secrets/index");

module.exports = function (user) {
  const payload = {
    subject: user.id,
    username: user.username,
    password: user.password,
  };
  const options = {
    expiresIn: "1d",
  };

  const token = jwt.sign(payload, JWT_SECRET, options);
  return token;
};
