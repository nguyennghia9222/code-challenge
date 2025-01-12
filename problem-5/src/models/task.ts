import { Schema, model } from "mongoose";

type ITask = {
  _id: string;
  name: string;
  status: string;
};

const taskSchema = new Schema<ITask>({
  name: { type: String, required: true },
  status: { type: String, required: true },
});

const Task = model<ITask>("Task", taskSchema);

export { ITask, Task };
