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
router.get("/all-todos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allTodos = yield prisma.todo.find();
        console.log("here are all the todos", allTodos);
        res.status(200).json({ allTodos });
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}));
router.get("/one-todo/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const oneTodo = yield prisma.todo.findFirst({
            where: { id: req.params.id },
        });
        console.log("here are all the todos", oneTodo);
        res.status(200).json({ oneTodo });
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}));
router.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}));
router.post("/update/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}));
module.exports = router;
