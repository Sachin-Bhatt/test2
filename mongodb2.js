const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

async function dbConnect2() {
  let result = await client.connect();
  let db = result.db("Response");
  return db.collection("data");
}
module.exports = dbConnect2;
