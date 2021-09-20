const User = require("../users/users-model");

const checkUsernameExists = async (req, res, next) => {
  try {
    const [users] = await User.findBy({ username: req.body.username });
    if (!users) {
      next({
        status: 401,
        message: "invalid credentials",
      });
    } else {
      req.users = users;
      next();
    }
  } catch (err) {
    next(err);
  }
};

//the above middleware checks the db if a username exists
//if it does, everything continues as normal
//if it does not exist, the user is informed the credentials provided are invalid

async function checkUsernameFree(req, res, next) {
  try {
    const users = await User.findBy({ username: req.body.username });
    if (!users.length) {
      next();
    } else {
      next({
        status: 422,
        message: "Username taken.",
      });
    }
  } catch (err) {
    next(err);
  }
}

// the above middleware checks the db if the username requested is unique
// if it is not, the user is informed that the requested username is already taken
//if it is unique, everything continues as desired

module.exports = { checkUsernameExists, checkUsernameFree };
