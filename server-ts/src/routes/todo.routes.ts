import { Request, Response } from "express";
import { RequestCreateTodo, RequestUpdateTodo } from "../types/requests";
const router = require("express").Router();
const { prisma } = require("../db/index");

router.get("/all-todos", async (req: Request, res: Response) => {
  try {
    const allTodos = await prisma.todo.findMany();
    console.log("here are all the todos", allTodos);
    res.status(200).json({ allTodos });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
router.get("/one-todo/:id", async (req: Request, res: Response) => {
  try {
    const oneTodo = await prisma.todo.findFirst({
      where: { id: req.params.id },
    });
    console.log("here are all the todos", oneTodo);
    res.status(200).json({ oneTodo });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
router.post("/create", async (req: RequestCreateTodo, res: Response) => {
  try {
    const newTodo = await prisma.todo.create({ data: req.body });
    console.log("here is the new todo ", newTodo);
    res.status(200).json(newTodo);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
router.put("/update/:id", async (req: RequestUpdateTodo, res: Response) => {
  try {
    const updatedTodo = await prisma.todo.update({
      where: { id: req.params.id },
      data: req.body,
    });
    console.log("here is the updated todo ", updatedTodo);
    res.status(200).json(updatedTodo);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
module.exports = router;
