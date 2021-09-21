const router = require("express").Router();

const { getAllUsers, insertUser } = require("./users-model");
const User = require("../users/users-model");
const bcrypt = require("bcrypt");
const {
  checkUsernameFree,
  checkUsernameExists,
} = require("../middleware/auth-middleware");
const tokenBuilder = require("./token-builder");

router.get("/", async (req, res) => {
  res.json(await getAllUsers());
});

router.post("/register", checkUsernameFree, async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const hash = bcrypt.hashSync(password, 8);
    const newUser = { username, password: hash };
    const user = await User.insertUser(newUser);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

// the above registers a new account, with the user providing a username and password
// middleware checks to make sure the suername is unique and the password is hashed before it is saved
// if registration is successful, the response will contain an id, username, and password
// if username or password are missing, registration will fail, informing the user to provide them
// if the username is already in use, the user will be informed of this and asked to try again

router.post("/login", checkUsernameExists, (req, res, next) => {
  if (bcrypt.compareSync(req.body.password, req.users.password)) {
    const token = tokenBuilder(req.users);
    res.status(200).json({
      message: `welcome, ${req.users.username}`,
      token,
    });
  } else if (!req.body.username || !req.body.password) {
    next({
      status: 401,
      message: "please enter a username and password",
    });
  } else
    [
      next({
        status: 401,
        message: "invalid credentials",
      }),
    ];
});
// to login, the above requires a valid username and password
// if this is done successfully, the response will have a message ("welcome, {whoever}" and token
// if the login or password are missing, the response will fail and inform the user to provide a username and password
// if the username does not exist in the db, or if the password is wrong, the request will fail and the body will say 'invalid credentials'

// router.post("/", checkUsernameFree, async (req, res) => {
//   res.status(201).json(await insertUser(req.body));
// });

module.exports = router;
