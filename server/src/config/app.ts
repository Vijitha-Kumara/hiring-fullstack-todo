import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ quiet: true });
import { Routes } from "../router/routes";
import cors from "cors";
class App {
  public app: express.Application;
  public mongoUrl: string = process.env.MONGO_URL ?? "";
  private routes: Routes = new Routes();
  constructor() {
    this.app = express();
    this.config();
    this.mongoSetup();
    this.routes.route(this.app);
  }

  private mongoSetup(): void {
    mongoose.set("strictQuery", true);
    mongoose.connect(this.mongoUrl).then((db) => {
      console.log("Mongo connected Sucessfully !!!");
    });
  }

   private config(): void {
    this.app.use(express.json());
    this.app.use(
      cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
      }),
    );
  }
}

export default new App().app;
