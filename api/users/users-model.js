const db = require("../data/db-config");

function getAllUsers() {
  return db("users");
}

function getAllItems() {
  return db("items");
}

function findBy(filter) {
  console.log(filter, "in findby");
  return db("users").where(filter);
}

function findById(id) {
  return db("users").where("id", id).first();
}

async function insertUser(user) {
  // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
  // AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD
  // UNLIKE SQLITE WHICH FORCES US DO DO A 2ND DB CALL
  const [newUserObject] = await db("users").insert(user, [
    "user_id",
    "username",
    "password",
  ]);
  return newUserObject; // { user_id: 7, username: 'foo', password: 'xxxxxxx' }
}

async function insertItem(item) {
  const [newItemObject] = await db("items").insert(item, [
    "item_id",
    "name",
    "description",
    "price",
  ]);
  return newItemObject;
}

async function ownerPage() {
  const ownerView = await db("owners as o").leftJoin(
    "users as u",
    "o.user_id",
    "u.user_id"
  );

  const ownerInfo = ownerView.map((e) => {
    return {
      owner_id: e.owner_id,
      user_id: e.user_id,
    };
  });

  return ownerInfo;
}

module.exports = {
  getAllUsers,
  insertUser,
  findById,
  findBy,
  getAllItems,
  insertItem,
  ownerPage,
};
