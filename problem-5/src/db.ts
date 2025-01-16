import { connect as mongooseConnect, disconnect as mongooseDisconnect } from "mongoose";

const dbHost = process.env.DB_HOST || "127.0.0.1";
const dbPort = process.env.DB_PORT || 3000;

const connect = async () => {
  await mongooseConnect(`mongodb://${dbHost}:${dbPort}/code-challenge`);
};

const disconnect = async () => {
  await mongooseDisconnect();
};

export { connect, disconnect };
