import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

import fs from "fs";
declare global {
  var signin: (userId?: string) => string[];
}
jest.mock("../nats-wrapper");

let mongo: any;
const tmpDirs: string[] = [];
beforeAll(async () => {
  process.env.JWT_KEY = "asdfasdf";
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  mongo = await MongoMemoryServer.create();

  const tmpDirPath = mongo.instanceInfo?.tmpDir?.name;
  tmpDirs.push(tmpDirPath);
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  jest.clearAllMocks();
  if (mongoose.connection.db) {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
      await collection.deleteMany({});
    }
  }
});

afterAll(async () => {
  console.log("afterAll");
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  if (mongo) {
    await mongo.stop();
  }
  for (let tmpDirPath of tmpDirs) {
    if (tmpDirPath && fs.existsSync(tmpDirPath)) {
      console.log("remove tmpDirPath", tmpDirPath);
      fs.rmSync(tmpDirPath, { recursive: true, force: true });
    }
  }
});
global.signin = (userId?: string) => {
  // Build a JWT payload.  { id, email }
  const payload = {
    id: userId || new mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com",
  };

  // Create the JWT!
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session Object. { jwt: MY_JWT }
  const session = { jwt: token };

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");

  // return a string thats the cookie with the encoded data
  return [`session=${base64}`];
};
