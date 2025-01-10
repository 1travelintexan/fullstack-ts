import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");
const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    const theToken = req.headers.authorization.split(" ")[1];
    const currentUser = jwt.verify(process.env.TOKEN_SECRET, theToken);
    req.payload = currentUser; // Error: Property 'payload' does not exist on type 'Request'...
    next();
  } else {
    res.status(401).json({ message: "Unauthorized Access!" });
  }
};

export { isAuthenticated };