import express, {Request, Response} from "express";
const router = express.Router();
import { ensureAuthenticated } from "../middleware/checkAuth";

router.get("/", (req:Request, res:Response) => {
  res.redirect("/dashboard");
});

router.get("/dashboard", ensureAuthenticated, (req:Request, res:Response) => {
  res.render("dashboard", {
    user: req.user,
  });
});

export default router;
