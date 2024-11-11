export const databaseName = "recipes-app";

const { MongoClient, ObjectId } = require("mongodb");

// export async function connectDatabase() {
//   const dbConnection: any = process.env.PUBLIC_DB_CONNECTION;
//   console.log("Connected to database");
//   return await MongoClient.connect(dbConnection);
// }

export async function connectDatabase() {
  const dbConnection: any = process.env.PUBLIC_DB_CONNECTION;
  return await MongoClient.connect(dbConnection);
}

export async function insertDocument(
  client: any,
  collection: string,
  document: object
) {
  console.log("insertDocument-mongo"+document)
  const db = client.db(databaseName);
  const result = await db.collection(collection).insertOne(document);
  return result;
}

export async function getAllDocuments(client: any, collection: string) {
  const db = client.db(databaseName);
  const documents = await db.collection(collection).find().toArray();
  console.log("Doc: ", documents);
  return documents;
}
