module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove,
};

const db = require("../data/dbConfig");

function find() {
  return db("schemes");
}

function findById(id) {
  return db("schemes").where({ id });
}

function findSteps(id) {
  return db("steps")
    .join("schemes", "schemes.id", "=", "steps.scheme_id")
    .where("schemes.id", "=", id)
    .orderBy("steps.step_number");
}

async function add(scheme) {
  const [id] = await db("schemes").insert(scheme);
  return findById(id);
}

function update(changes, id) {
  return db("schemes").update(changes).where({ id });
}

function remove(id) {
  return db("schemes").where({ id }).del();
}
