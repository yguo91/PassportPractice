import { Strategy as LocalStrategy } from "passport-local";
import { getUserByEmailIdAndPassword } from "../../controllers/userController";
import { PassportStrategy, User } from '../../interfaces/index';

const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email: string, password: string, done: (error: any, user?: User | false, options?: { message: string }) => void) => {
    const result = getUserByEmailIdAndPassword(email, password);

    if (result === null) {
      // User not found
      return done(null, false, {
        message: `Couldn't find user with email: ${email}`
      });
    }

    if (result === 'wrong-password') {
      // Password is incorrect
      return done(null, false, {
        message: "Password is incorrect"
      });
    }

    // Login successful
    return done(null, result);
  }
);

const passportLocalStrategy: PassportStrategy = {
  name: 'local',
  strategy: localStrategy,
};

export default passportLocalStrategy;
