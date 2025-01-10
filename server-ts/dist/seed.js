"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma = require("./db/index");
const newUser = {
    username: "Joshua",
    email: "joshua@joshua.com",
    password: "1234",
};
const newToDo = {
    title: "Walk Ragnar",
    description: "Go outside and enjoy the air",
    completed: false,
    ownerId: "1e1e79d2-326f-41dd-bc71-8de6a8e75ff9",
};
// prisma.user
//   .create({ data: newUser })
//   .then((user) => {
//     console.log("Success... a new user was created!!");
//     console.log(user);
//   })
//   .catch((error) => {
//     console.log("Something went wrong...");
//     console.log(error);
//   });
prisma.toDo
    .create({ data: newToDo })
    .then((createdTodo) => {
    console.log("Success... a new todo was created!!");
    console.log(createdTodo);
})
    .catch((error) => {
    console.log("Something went wrong...");
    console.log(error);
});
