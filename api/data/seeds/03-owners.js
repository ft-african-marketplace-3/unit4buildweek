const owners = [
  {
    user_id: 1,
  },
  {
    user_id: 2,
  },
  {
    user_id: 3,
  },
];

exports.owners = owners;

exports.seed = function (knex) {
  return knex("owners").insert(owners);
};
