"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const router = require("express").Router();
const prisma = require("../db/index");
const jwt = require("jsonwebtoken");
router.get("/all-users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json("All good in here");
}));
router.get("/one-user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json("All good in here");
}));
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createdUser = yield prisma.user.create({ data: req.body });
        console.log("user created", createdUser);
        res.status(201).json(createdUser);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundUser = yield prisma.user.findFirst({
            where: { email: req.body.email },
        });
        if (!foundUser) {
            res.status(403).json({ message: "Invalid credentials" });
        }
        else {
            const userWithoutPassword = Object.assign(Object.assign({}, foundUser), { password: "****" });
            const authToken = jwt.sign(userWithoutPassword, process.env.TOKEN_SECRET, { algorithm: "HS256", expiresIn: "48h" });
            console.log("here is the found user", foundUser);
            console.log("here is the auth token", authToken);
            res.status(200).json({ authToken });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}));
module.exports = router;
