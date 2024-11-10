//TODO: change database name.

const { MongoClient, ObjectId } = require("mongodb");

export async function connectDatabase() {
  const dbConnection: any = process.env.PUBLIC_DB_CONNECTION;
  return await MongoClient.connect(dbConnection);
}

export async function insertDocument(
  client: any,
  collection: string,
  document: object
) {
  const db = client.db("mini-proj");
  const result = await db.collection(collection).insertOne(document);
  return result;
}

export async function getAllDocuments(client: any, collection: string) {
  const db = client.db("mini-proj");
  const documents = await db.collection(collection).find().toArray();
  return documents;
}
