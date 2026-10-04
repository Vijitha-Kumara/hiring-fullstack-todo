import { Request, Response } from "express";

abstract class BaseCtrl {
  abstract model: any;

  getAll = async (req: Request, res: Response) => {
    try {
      const docs = await this.model.find({});
      return res.status(200).json({ success: true, data: docs });
    } catch (err) {
      return res.status(400).json({ error: "Error fetching documents" });
    }
  };

  count = async () => this.model.countDocuments();
  insert = async (req: Request, res: Response) => {
    try {
      const obj = await new this.model(req.body).save();
      return res.status(200).json(obj);
    } catch (err) {
      return res.status(400).json({ error: "Error inserting document" });
    }
  };

  updatefromParam = async (req: Request, res: Response) => {
    try {
      await this.model.findOneAndUpdate({ id: req.params.id }, req.body);
      return res.status(200).json(req.body);
    } catch (err) {
      return res.status(400).json({ error: "Error updating document" });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const obj = await this.model.findOneAndDelete({ id: req.params.id });
      return res.status(200).json(obj);
    } catch (err) {
      return res.status(400).json({ error: "Error deleting document" });
    }
  };
}

export default BaseCtrl;