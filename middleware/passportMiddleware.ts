import { Application } from "express";
import passport from "passport";
import PassportConfig from "./PassportConfig";
import { User } from "../interfaces";
import { getUserById } from "../controllers/userController";

import localStrategy from "./passportStrategies/localStrategy";
import passportGitHubStrategy from "./passportStrategies/githubStrategy";

// Serialize and deserialize user for session management
passport.serializeUser(function (user: Express.User, done: (err: any, id?: number) => void) {
  done(null, user.id);
});

passport.deserializeUser(function (id: number, done: (err: any, user?: User | false) => void) {
  let user = getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, false);
  }
});

// No need to actually pass the instance of passport since it returns a singleton
const passportConfig = new PassportConfig([localStrategy, passportGitHubStrategy]);

const passportMiddleware = (app: Application): void => {
  app.use(passport.initialize());
  app.use(passport.session());
};

export default passportMiddleware;
