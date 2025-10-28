import { Strategy } from 'passport';

export interface PassportStrategy {
    name: string;
    strategy: Strategy;
}

//the following are types for the project
// User interface representing the user object structure
export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// Type for user verification callback in local strategy
export type VerifyCallback = (error: Error | null, user?: User | false, options?: { message: string }) => void;

// Express session with user information
declare module 'express-session' {
  interface SessionData {
    passport?: {
      user: number;
    };
    messages?: string[];
  }
}

// Extend Express Request to include user
declare global {
  namespace Express {
    interface User {
      id: number;
      name: string;
      email: string;
      password: string;
    }
  }
}