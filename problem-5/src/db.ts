import { connect as mongooseConnect, disconnect as mongooseDisconnect } from "mongoose";

const connect = async () => {
  await mongooseConnect("mongodb://mongodb:27017/code-challenge");
};

const disconnect = async () => {
  await mongooseDisconnect();
};

export { connect, disconnect };
