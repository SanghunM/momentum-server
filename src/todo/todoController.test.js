import mockHttp from "node-mocks-http";
import TodoService from "./todoService.js";
import TodoContoller from "./todoController.js";
import Todo from "./Todo.js";

const mockData = [new Todo("study react"), new Todo("study JS")];

describe("test todoController", () => {
  let req, res, next, service, controller, mockTodo;

  describe("getTodos", () => {
    beforeEach(() => {
      service = new TodoService();
      controller = new TodoContoller();
      req = mockHttp.createRequest({
        method: "GET",
        url: "/todo",
      });
      res = mockHttp.createResponse();
      next = jest.fn();
      jest
        .spyOn(TodoService.prototype, "getTodos")
        .mockImplementation(() => mockData);
    });

    it("returns todos", () => {
      controller.getTodos(req, res, next);
      const data = res._getJSONData();
      expect(data.todos[0].todoMessage_).toEqual(mockData[0].todoMessage);
    });
  });

  describe("getTodoById", () => {
    beforeEach(() => {
      mockTodo = new Todo("test");
      req = mockHttp.createRequest({
        method: "GET",
        url: "/todo:id",
        params: {
          id: mockTodo.id,
        },
      });
      res = mockHttp.createResponse();
      next = jest.fn();
      service = new TodoService();
      controller = new TodoContoller();
      jest
        .spyOn(TodoService.prototype, "getTodoById")
        .mockImplementation(() => mockTodo);
    });
    it("returns a specific todo corresponding to given id", () => {
      controller.getTodoById(req, res, next);
      const data = res._getJSONData();
      expect(data.todo.todoMessage_).toBe(mockTodo.todoMessage);
      expect(service.getTodoById).toHaveBeenCalledTimes(1);
      expect(service.getTodoById).toHaveBeenCalledWith(req.params.id);
    });
  });

  describe("createTodos", () => {
    beforeEach(() => {
      mockTodo = new Todo("test");
      req = mockHttp.createRequest({
        method: "POST",
        url: "/todo",
        body: {
          content: mockTodo.todoMessage,
        },
      });
      res = mockHttp.createResponse();
      next = jest.fn();
      service = new TodoService();
      controller = new TodoContoller();
      jest
        .spyOn(TodoService.prototype, "createTodo")
        .mockImplementation(() => mockTodo);
    });
    it("should create new todo within todos", () => {
      controller.createTodo(req, res, next);
      const data = res._getJSONData();
      expect(res.statusCode).toBe(201);
      expect(service.createTodo).toBeCalledWith(req.body.content);
    });
  });

  describe("updateTodo", () => {
    beforeEach(() => {
      mockTodo = new Todo("test");
      req = mockHttp.createRequest({
        method: "DELETE",
        url: "/todo:id",
        params: {
          id: mockTodo.id,
        },
        body: {
          content: mockTodo.todoMessage,
        },
      });
      res = mockHttp.createResponse();
      next = jest.fn();
      service = new TodoService();
      controller = new TodoContoller();
      jest
        .spyOn(TodoService.prototype, "updateTodo")
        .mockImplementation(() => mockTodo);
    });
    it("should update target todo with given id", () => {
      controller.updateTodo(req, res, next);
      const data = res._getJSONData();
      expect(res.statusCode).toBe(200);
      expect(service.updateTodo).toBeCalledWith(
        req.params.id,
        req.body.content
      );
    });
  });

  describe("deleteTodo", () => {
    beforeEach(() => {
      mockTodo = new Todo("test");
      req = mockHttp.createRequest({
        method: "DELETE",
        url: "/todo:id",
        params: {
          id: mockTodo.id,
        },
      });
      res = mockHttp.createResponse();
      next = jest.fn();
      service = new TodoService();
      controller = new TodoContoller();
      jest
        .spyOn(TodoService.prototype, "deleteTodo")
        .mockImplementation(() => mockTodo);
    });
    it("should delete todo with given id", () => {
      controller.deleteTodo(req, res, next);
      const data = res._getJSONData();
      expect(res.statusCode).toBe(200);
      expect(service.deleteTodo).toBeCalledWith(req.params.id);
    });
  });
});
