import { Schema, model } from "mongoose";
import { TaskStatus } from "../constants/taskConstant";

type ITask = {
  _id: string;
  name: string;
  status: TaskStatus;
};

const taskSchema = new Schema<ITask>({
  name: { type: String, required: true },
  status: { type: String, enum: Object.values(TaskStatus), required: true },
});

taskSchema.index({ status: 1 });
// Check the document for production deployment
// https://mongoosejs.com/docs/guide.html#indexes
// https://www.mongodb.com/docs/manual/reference/method/db.collection.createIndex/#recreating-an-existing-index

const Task = model<ITask>("Task", taskSchema);

export { ITask, Task };
