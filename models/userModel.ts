import { User } from '../interfaces';
const database = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
    role: 'admin' as const,
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
    role: 'user' as const,
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
    role: 'user' as const,
  },
];

const userModel = {

  findOne: (email: string):User | null => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    // throw new Error(`Couldn't find user with email: ${email}`);
    return null;
  },

  findById: (id: number):User | null => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    // throw new Error(`Couldn't find user with id: ${id}`);
    return null;
  },

  findOrCreate: (userData: User):User => {
    // Check if user already exists by id
    let user = database.find((user) => user.id === userData.id);

    if (user) {
      // User already exists, return it
      return user;
    }

    // User doesn't exist, create new user
    const newUser: User = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: userData.role || 'user'
    };

    database.push(newUser);
    return newUser;
  },
};

export { database, userModel };
