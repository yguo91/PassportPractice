import { Request, Response, NextFunction } from 'express';

export const ensureAuthenticated = (req: Request, res: Response, next: NextFunction):void => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/login");
}

export const forwardAuthenticated = (req: Request, res: Response, next: NextFunction):void => {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/dashboard");
}

export const ensureAdmin = (req: Request, res: Response, next: NextFunction):void => {
  if (req.isAuthenticated() && req.user && req.user.role === 'admin') {
    return next();
  }
  res.status(403).send("Access denied. Admin only.");
}