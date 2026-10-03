import Todo from "../model/Todo";
import BaseCtrl from "./base";
import { Request, Response } from "express";

export default class TodoCtrl extends BaseCtrl {
  model = Todo;

  setToggle = async (req: Request, res: Response) => {
    try {
      await this.model.findOneAndUpdate(
        { id: req.body.id },
        { done: req.body.done },
      );
      return res.status(200).json(req.body);
    } catch (err) {
      return res.status(400).json({ error: "Error updating document" });
    }
  };
}