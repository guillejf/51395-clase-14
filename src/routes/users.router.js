import express from "express";
import { UserModel } from "../models/users.model.js";

export const usersRouter = express.Router();

usersRouter.get("/", async (req, res) => {
  try {
    const users = await UserModel.find({});
    return res.status(200).json({
      status: "success",
      msg: "listado de usuarios",
      data: users,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      msg: "something went wrong :(",
      data: {},
    });
  }
});

usersRouter.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    if (!firstName || !lastName || !email) {
      console.log(
        "validation error: please complete firstName, lastname and email."
      );
      return res.status(400).json({
        status: "error",
        msg: "please complete firstName, lastname and email.",
        data: {},
      });
    }
    const userCreated = await UserModel.create({ firstName, lastName, email });
    return res.status(201).json({
      status: "success",
      msg: "user created",
      data: userCreated,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      msg: "something went wrong :(",
      data: {},
    });
  }
});

usersRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email } = req.body;
  try {
    if (!firstName || !lastName || !email || !id) {
      console.log(
        "validation error: please complete firstName, lastname and email."
      );
      return res.status(400).json({
        status: "error",
        msg: "please complete firstName, lastname and email.",
        data: {},
      });
    }
    const userUptaded = await UserModel.updateOne(
      { _id: id },
      { firstName, lastName, email }
    );
    return res.status(201).json({
      status: "success",
      msg: "user uptaded",
      data: userUptaded,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      msg: "something went wrong :(",
      data: {},
    });
  }
});

usersRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await UserModel.deleteOne({ _id: id });

    if (result?.deletedCount > 0) {
      return res.status(200).json({
        status: "success",
        msg: "user deleted",
        data: {},
      });
    } else {
      return res.status(404).json({
        status: "error",
        msg: "user not found",
        data: {},
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      msg: "something went wrong :(",
      data: {},
    });
  }
});
