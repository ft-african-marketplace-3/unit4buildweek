const items = [
  {
    location: 254,
    name: "beans",
    item_type: "beans",
    description: "a bag of beans",
    price: 3,
  },
  {
    location: 255,
    name: "a cup",
    item_type: "houseware",
    description: "a cup fashioned out of clay",
    price: 5,
  },
  {
    location: 256,
    name: "A Hammer",
    item_type: "tool",
    description: "",
    price: 8,
  },
  {
    location: 254,
    name: "A pint of beer",
    item_type: "drink",
    description: "a refreshing lager",
    price: 4,
  },
  {
    location: 255,
    name: "a chicken",
    item_type: "animal",
    description: "Almost certainly a poor pet, but at least you get eggs",
    price: 15,
  },
];

exports.items = items;

exports.seed = function (knex) {
  return knex("items").insert(items);
};
