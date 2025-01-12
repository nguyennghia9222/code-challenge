import {
  connect as mongooseConnect,
  disconnect as mongooseDisconnect,
} from "mongoose";

const connect = async () => {
  await mongooseConnect("mongodb://127.0.0.1:27017/code-challenge");
};

const disconnect = async () => {
  await mongooseDisconnect();
};

export { connect, disconnect };
