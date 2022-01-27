import TodoService, { mockData } from "./todoService.js";
import TodoModel from "./todoModel.js";

//spyon:
//overriding with jest.fn()

describe("todoService test", () => {
  let service;
  describe("getTodos", () => {
    beforeEach(() => {
      service = new TodoService();
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });

    it("returns todos if there are todos", async () => {
      const spyOn = jest.spyOn(TodoModel, "find").mockImplementation(() => {
        return Promise.resolve(mockData);
      });
      expect(await service.getTodos()).toBe(mockData);
    });
  });

  describe("getTodoById", () => {
    beforeEach(() => {
      service = new TodoService();
    });

    it("returns a specific todo with given id", () => {
      const spyOn = jest
        .spyOn(TodoModel, "findById")
        .mockImplementation((id) => mockData.find((todo) => todo.id === id));

      expect(TodoModel.findById(mockData[0].id_)).toEqual(mockData[0]);
    });
  });

  //   describe("createTodo", () => {
  //     beforeEach(() => {
  //       service = new TodoService();
  //       newMessage = "test";
  //     });

  //     it("create todo", () => {
  //       const data = service.createTodo(newMessage);
  //       expect(data.todoMessage_).toEqual(newMessage);
  //       //   expect(mockData.length).toBe(3);
  //     });
  //   });

  //   describe("updateTodo", () => {
  //     beforeEach(() => {
  //       service = new TodoService();
  //       newMessage = "test";
  //     });
  //     it("update todo", () => {
  //     const data =service.deleteTodo
  //       service.updateTodo(mockData[0].id_, newMessage);

  //       console.log(mockData);
  //     });
  //   });

  //   describe("deleteTodo", () => {
  //     beforeEach(() => {
  //       service = new TodoService();
  //     });
  //     it("delete target todo", () => {
  //       const data = service.deleteTodo(mockData[0].id_);
  //       expect(data.todoMessage_).toBe("study react");
  //     });
  //   });
});
