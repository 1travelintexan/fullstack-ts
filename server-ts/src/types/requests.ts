// src/types/requests.ts

import { Request } from "express";

export interface RequestCreateTodo extends Request {
  body: {
    title: string;
    description: string;
    completed: boolean;
    ownerId: string;
  };
}
export interface RequestUpdateTodo extends Request {
  body: {
    title?: string;
    description?: string;
    completed?: boolean;
    ownerId?: string;
  };
}
export interface RequestCreateUser extends Request {
  body: {
    username: string;
    email: string;
    password: string;
  };
}
export interface RequestLoginUser extends Request {
  body: {
    email: string;
    password: string;
  };
}
