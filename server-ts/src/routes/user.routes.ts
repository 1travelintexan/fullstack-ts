import { Request, Response } from "express";
import { isAuthenticated } from "../middlewares/jwt.authentication";

const router = require("express").Router();
const prisma = require("../db/index");
const jwt = require("jsonwebtoken");

router.get("/all-users", async (req: Request, res: Response) => {
  res.json("All good in here");
});
router.get("/one-user", async (req: Request, res: Response) => {
  res.json("All good in here");
});
router.post("/signup", async (req: Request, res: Response) => {
  try {
    const createdUser = await prisma.user.create({ data: req.body });
    console.log("user created", createdUser);
    res.status(201).json(createdUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
router.post("/login", async (req: Request, res: Response) => {
  try {
    const foundUser = await prisma.user.findFirst({
      where: { email: req.body.email },
    });
    if (!foundUser) {
      res.status(403).json({ message: "Invalid credentials" });
    } else {
      const userWithoutPassword = { ...foundUser, password: "****" };
      const authToken = jwt.sign(
        userWithoutPassword,
        process.env.TOKEN_SECRET,
        { algorithm: "HS256", expiresIn: "48h" }
      );
      console.log("here is the found user", foundUser);
      console.log("here is the auth token", authToken);
      res.status(200).json({ authToken });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/verify", isAuthenticated, async (req: Request, res: Response) => {
  try {
    console.log("here is the payload", req.payload);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
module.exports = router;
