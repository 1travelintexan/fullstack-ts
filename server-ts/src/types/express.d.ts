declare namespace Express {
  interface Request {
    payload?: {
      userName: string;
      email: string;
    };
  }
}
