import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserByEmailIdAndPassword, getUserById} from "../../controllers/userController";
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

passport.serializeUser(function (user: Express.User, done: (err: any, id?: number) => void) {
  // console.log('🔒 Serializing user:', user.id);  // Debug log
  done(null, user.id);
});

passport.deserializeUser(function (id: number, done: (err: any, user?: User | false) => void) {
  // console.log('🔓 Deserializing user ID:', id);  // Debug log
  let user = getUserById(id);
  if (user) {
    // console.log('✅ User found:', user.email);  // Debug log
    done(null, user);
  } else {
    // console.log('❌ User not found');  // Debug log
    done({ message: "User not found" }, false);
  }
});

const passportLocalStrategy: PassportStrategy = {
  name: 'local',
  strategy: localStrategy,
};

export default passportLocalStrategy;
