import {userModel} from "../models/userModel";
import { User } from "../interfaces";

const getUserByEmailIdAndPassword = (
  email: string, 
  password: string
):User | null | 'wrong-password'=> {
  let user = userModel.findOne(email);
  if (!user) {
    // User doesn't exist
    return null;
  }
  
  if (!isUserValid(user, password)) {
    // User exists but password is wrong
    return 'wrong-password';
  }
  
  // User exists and password is correct
  return user;
};
const getUserById = (id:number):User | null => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user: User, password: string):boolean {
  return user.password === password;
}

const findOrCreateUser = (userData: User): User => {
  return userModel.findOrCreate(userData);
};

export {
  getUserByEmailIdAndPassword,
  getUserById,
  findOrCreateUser,
};
