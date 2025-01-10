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
