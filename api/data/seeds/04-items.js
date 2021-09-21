const items = [
  {
    owner_id: 1,
    location: 254,
    name: "beans",
    description: "a bag of beans",
    price: 3,
  },
  {
    owner_id: 2,
    location: 255,
    name: "a cup",
    description: "a cup fashioned out of clay",
    price: 5,
  },
  {
    owner_id: 3,
    location: 256,
    name: "A Hammer",
    description: "",
    price: 8,
  },
  {
    owner_id: 1,
    location: 254,
    name: "A pint of beer",
    description: "a refreshing lager",
    price: 4,
  },
  {
    owner_id: 2,
    location: 255,
    name: "a chicken",
    description: "Almost certainly a poor pet, but at least you get eggs",
    price: 15,
  },
];

exports.items = items;

exports.seed = function (knex) {
  return knex("items").insert(items);
};
