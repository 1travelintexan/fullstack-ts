import { Request, Response } from "express";
import { isAuthenticated } from "../middlewares/jwt.authentication";
import { compareSync, genSaltSync, hashSync } from "bcryptjs";
import { RequestCreateUser, RequestLoginUser } from "../types/requests";
const router = require("express").Router();
const { prisma } = require("../db/index");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req: RequestCreateUser, res: Response) => {
  try {
    const salt = genSaltSync(12);
    const hashedPassword = hashSync(req.body.password, salt);
    const createdUser = await prisma.user.create({
      data: { ...req.body, password: hashedPassword },
    });
    console.log("user created", createdUser);
    res.status(201).json(createdUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
router.post("/login", async (req: RequestLoginUser, res: Response) => {
  try {
    const foundUser = await prisma.user.findFirst({
      where: { email: req.body.email },
    });
    if (!foundUser) {
      res.status(403).json({ message: "Invalid credentials" });
    } else {
      const passwordMatches = compareSync(
        req.body.password,
        foundUser.password
      );
      console.log("password matches", passwordMatches);
      if (passwordMatches) {
        const userWithoutPassword = { ...foundUser, password: "****" };
        const authToken = jwt.sign(
          userWithoutPassword,
          process.env.TOKEN_SECRET,
          { algorithm: "HS256", expiresIn: "48h" }
        );
        console.log("here is the found user", foundUser);
        console.log("here is the auth token", authToken);
        res.status(200).json({ authToken });
      } else {
        res.status(403).json({ message: "Invalid Credentials" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
router.get("/all-users", async (req: Request, res: Response) => {
  res.json("All good in here");
});
router.get("/one-user", async (req: Request, res: Response) => {
  res.json("All good in here");
});

//INNER JOIN
router.get("/user-todos/:id", async (req: Request, res: Response) => {
  console.log("here is prisma", prisma);
  try {
    const userAndTodos = await prisma.user.findMany({
      where: { id: req.params.id },
      include: { todos: true },
    });
    console.log("user with todos", userAndTodos);
    res.status(200).json(userAndTodos);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/verify", isAuthenticated, async (req: Request, res: Response) => {
  try {
    // console.log("here is the payload", req.payload);
    res.status(200).json({ currentUser: req.payload });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
module.exports = router;

//log the queries 'new PrismaClient({log: ['query']})
//select inside the create or find will return only the properties that you want and can be nested but either select or include. Not both
//if you have a unique key on the table then you can check for the two combination as unique with the findUnique method (it has to have a unique constraint)
//you can use take:2 on the findMany and this will limit the count/ skip:1 will skip the first and grab the next 2
//you can sort the found users too
//orderBy: {
// age: 'asc' or 'desc'
// }

//you can say things that are NOT something
// where: {name: {not: 'Sally'}}
//pass an array of possiblities
// where: {name: {in: ['Ragnar', 'Joshua']}} also notIn* and lt lte gt gte*
//you can check if a string 'contains' a value
//where: { email: {contains: 'test.com'}} endsWith* and startsWith* works as well
//you can check multiple emails with the AND or the OR query or the NOT query or the EVERY
// where: {AND: [{email: {startsWith: 'josh'}}, {email: {endsWith: '.com'}}]}
// you can update with an increment to a property or even multipy/divide
