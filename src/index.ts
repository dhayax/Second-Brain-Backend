import express from "express";
import dotenv from "dotenv";
import { UserModel } from "./db";
import mongoose from "mongoose";
dotenv.config();

const dbHost = process.env.DB_Host as string;
mongoose.connect(dbHost);

const app = express();
app.use(express.json());
app.post("/api/v1/signup", async (req, res) => {
  const {username, password } = req.body;
  await UserModel.create({
    username,
    password,
  });

  res.json({
    message: "user signed up ",
  });
});
app.post("/api/v1/signin", (req, res) => {});
app.post("/api/v1/content", (req, res) => {});
app.get("/api/v1/content", (req, res) => {});
app.delete("/api/v1/content", (req, res) => {});

app.post("/api/v1/brain/share", (req, res) => {});

app.get("/api/v1/brain/:shareLink", (req, res) => {});

app.listen(3000,()=>{
  console.log(`PORT is Listening on 3000`)
})