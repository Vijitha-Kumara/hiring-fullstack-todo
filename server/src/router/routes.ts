import { Application, Request, Response } from "express";
import TodoCtrl from "../controller/todo";

export class Routes {
  private todo_controller: TodoCtrl = new TodoCtrl();

  public route(app: Application) {
    app.post("/api/todos", (req: Request, res: Response) => {
      this.todo_controller.insert(req, res);
    });

    app.get("/api/todos", (req: Request, res: Response) => {
      this.todo_controller.getAll(req, res);
    });

    app.put("/api/todos/:id", (req: Request, res: Response) => {
      this.todo_controller.updatefromParam(req, res);
    });

    app.patch("/api/todos/:id/done", (req: Request, res: Response) => {
      this.todo_controller.setToggle(req, res);
    });

    app.delete("/api/todos/:id", (req: Request, res: Response) => {
      this.todo_controller.delete(req, res);
    });
  }
}