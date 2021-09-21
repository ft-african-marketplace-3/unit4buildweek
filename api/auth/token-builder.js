const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../secrets/index");

module.exports = function (users) {
  const payload = {
    subject: users.id,
    username: users.username,
    password: users.password,
  };
  const options = {
    expiresIn: "1d",
  };

  const token = jwt.sign(payload, JWT_SECRET, options);
  return token;
};
