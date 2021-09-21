const users = [
  {
    username: "Sansa",
    password: "Stark",
  },
  {
    username: "Bilbo",
    password: "Baggins",
  },
  {
    username: "Lambda",
    password: "School",
  },
  {
    username: "Darth",
    password: "Vader",
  },
  {
    username: "Roland",
    password: "Deschain",
  },
];

// exports.users = users;

exports.seed = function (knex) {
  return knex("users").then(function () {
    return knex("users").insert(users);
  });
};
