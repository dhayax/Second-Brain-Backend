import express from "express";
import dotenv from "dotenv";
import { ContentModel, UserModel } from "./db";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userMiddleware } from "./middleware";
dotenv.config();

const JWT_PASSWORD = process.env.JWT_SECRET as string;

const dbHost = process.env.DB_Host as string;
mongoose.connect(dbHost);

const app = express();
app.use(express.json());
app.post("/api/v1/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    await UserModel.create({
      username,
      password,
    });

    res.json({
      message: "user signed up ",
    });
  } catch (error) {
    res.status(411).json({
      message: "User already exist",
    });
  }
});
app.post("/api/v1/signin", async (req, res) => {
  const { username, password } = req.body;
  const response = await UserModel.findOne({
    username,
    password,
  });

  if (response) {
    const token = jwt.sign(
      {
        id: response._id,
      },
      JWT_PASSWORD
    );
    res.json({
      token,
    });
  } else {
    res.status(403).json({
      message: "Incorrect credentials",
    });
  }
});
// app.post("/api/v1/content", userMiddleware, async (req, res) => {
//   const { link, type } = req.body;
//   await ContentModel.create({
//     link,
//     type,
//     //@ts-ignore
//     userId: req.userId,
//     tags:[]
//   });

//   return res.json({
//     message:"Content Added"
//   })
// });

app.post("/api/v1/content", userMiddleware, async (req, res) => {
  const link = req.body.link;
  const title = req.body.title;
  await ContentModel.create({
    title,
    link,

    //@ts-ignore
    userId: req.userId,
    tags: [],
  });
  res.json({
    message: "content added",
  });
});
app.get("/api/v1/content", (req, res) => {});
app.delete("/api/v1/content", (req, res) => {});

app.post("/api/v1/brain/share", (req, res) => {});

app.get("/api/v1/brain/:shareLink", (req, res) => {});

app.listen(3000, () => {
  console.log(`PORT is Listening on 3000`);
});
