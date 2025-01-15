import { createRequest, createResponse } from "node-mocks-http";
import { HttpError } from "../../src/constants/errorConstant";
import TaskHandler from "../../src/handlers/taskHandler";

const next = jest.fn();
const repositoryMock = {
  getTask: jest.fn(),
  getTasks: jest.fn(),
  createTask: jest.fn(),
  updateTask: jest.fn(),
  deleteTask: jest.fn(),
};
jest.mock("../../src/repositories/taskRepository", () => jest.fn().mockImplementation(() => repositoryMock));

describe("taskHandler", () => {
  describe("getTask", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should get task by id", async () => {
      const req = createRequest({ params: { id: "testId" } });
      const res = createResponse();
      const mockResponseData = { _id: "testId", name: "test name", status: "in-progress" };
      repositoryMock.getTask = jest.fn().mockResolvedValue(mockResponseData);

      const handler = new TaskHandler();
      await handler.getTask(req, res, next);

      expect(repositoryMock.getTask).toHaveBeenCalledWith("testId");
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual(mockResponseData);
    });

    it("should handle error", async () => {
      const req = createRequest({ params: { id: "testId" } });
      const res = createResponse();
      repositoryMock.getTask = jest.fn().mockRejectedValue(null);

      const handler = new TaskHandler();
      await handler.getTask(req, res, next);

      expect(repositoryMock.getTask).toHaveBeenCalledWith("testId");
      expect(next).toHaveBeenCalled();
    });
  });

  describe("getTasks", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should validate params", async () => {
      const req = createRequest({ query: { status: "invalid" } });
      const res = createResponse();
      const mockResponseData = [{ _id: "testId", name: "test name", status: "pending" }];
      repositoryMock.getTasks = jest.fn().mockResolvedValue(mockResponseData);

      const handler = new TaskHandler();
      await handler.getTasks(req, res, next);

      expect(repositoryMock.getTasks).not.toHaveBeenCalled();
      expect(res.statusCode).toBe(422);
      expect(res._getJSONData().error).toEqual(HttpError.ValidationError);
    });

    it("should get tasks", async () => {
      const req = createRequest({ query: { status: "in-progress" } });
      const res = createResponse();
      const mockResponseData = [{ _id: "testId", name: "test name", status: "in-progress" }];
      repositoryMock.getTasks = jest.fn().mockResolvedValue(mockResponseData);

      const handler = new TaskHandler();
      await handler.getTasks(req, res, next);

      expect(repositoryMock.getTasks).toHaveBeenCalled();
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual(mockResponseData);
    });

    it("should handle error", async () => {
      const req = createRequest();
      const res = createResponse();
      repositoryMock.getTasks = jest.fn().mockRejectedValue(null);

      const handler = new TaskHandler();
      await handler.getTasks(req, res, next);

      expect(repositoryMock.getTasks).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });

  describe("createTask", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should validate params", async () => {
      const req = createRequest({ body: { name: null, status: "invalid" } });
      const res = createResponse();
      const mockResponseData = { _id: "testId", name: "test name", status: "pending" };
      repositoryMock.createTask = jest.fn().mockResolvedValue(mockResponseData);

      const handler = new TaskHandler();
      await handler.createTask(req, res, next);

      expect(repositoryMock.createTask).not.toHaveBeenCalled();
      expect(res.statusCode).toBe(422);
      expect(res._getJSONData().error).toEqual(HttpError.ValidationError);
    });

    it("should create task", async () => {
      const bodyParams = { name: "test name", status: "pending" };
      const req = createRequest({ body: bodyParams });
      const res = createResponse();
      const mockResponseData = { _id: "testId", ...bodyParams };
      repositoryMock.createTask = jest.fn().mockResolvedValue(mockResponseData);

      const handler = new TaskHandler();
      await handler.createTask(req, res, next);

      expect(repositoryMock.createTask).toHaveBeenCalledWith(bodyParams);
      expect(res.statusCode).toBe(201);
      expect(res._getJSONData()).toEqual(mockResponseData);
    });

    it("should handle error", async () => {
      const bodyParams = { name: "test name", status: "pending" };
      const req = createRequest({ body: bodyParams });
      const res = createResponse();
      repositoryMock.createTask = jest.fn().mockRejectedValue(null);

      const handler = new TaskHandler();
      await handler.createTask(req, res, next);

      expect(repositoryMock.createTask).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });

  describe("updateTask", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should validate params", async () => {
      const req = createRequest({ params: { id: "testId" }, body: { name: null, status: "invalid" } });
      const res = createResponse();
      const mockResponseData = { _id: "testId", name: "updated name", status: "completed" };
      repositoryMock.updateTask = jest.fn().mockResolvedValue(mockResponseData);

      const handler = new TaskHandler();
      await handler.updateTask(req, res, next);

      expect(repositoryMock.updateTask).not.toHaveBeenCalled();
      expect(res.statusCode).toBe(422);
      expect(res._getJSONData().error).toEqual(HttpError.ValidationError);
    });

    it("should update task", async () => {
      const bodyParams = { name: "updated name", status: "completed" };
      const req = createRequest({ params: { id: "testId" }, body: bodyParams });
      const res = createResponse();
      const mockResponseData = { _id: "testId", ...bodyParams };
      repositoryMock.updateTask = jest.fn().mockResolvedValue(mockResponseData);

      const handler = new TaskHandler();
      await handler.updateTask(req, res, next);

      expect(repositoryMock.updateTask).toHaveBeenCalledWith("testId", bodyParams);
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual(mockResponseData);
    });

    it("should handle error", async () => {
      const bodyParams = { name: "updated name", status: "completed" };
      const req = createRequest({ params: { id: "testId" }, body: bodyParams });
      const res = createResponse();
      repositoryMock.updateTask = jest.fn().mockRejectedValue(null);

      const handler = new TaskHandler();
      await handler.updateTask(req, res, next);

      expect(repositoryMock.updateTask).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });

  describe("deleteTask", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should delete task", async () => {
      const req = createRequest({ params: { id: "testId" } });
      const res = createResponse();
      const mockResponseData = { _id: "testId" };
      repositoryMock.deleteTask = jest.fn().mockResolvedValue(mockResponseData);

      const handler = new TaskHandler();
      await handler.deleteTask(req, res, next);

      expect(repositoryMock.deleteTask).toHaveBeenCalledWith("testId");
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual(mockResponseData);
    });

    it("should handle error", async () => {
      const req = createRequest({ params: { id: "testId" } });
      const res = createResponse();
      repositoryMock.deleteTask = jest.fn().mockRejectedValue(null);

      const handler = new TaskHandler();
      await handler.deleteTask(req, res, next);

      expect(repositoryMock.deleteTask).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });
});
