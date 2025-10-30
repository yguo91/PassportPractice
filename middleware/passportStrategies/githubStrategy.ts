import { Strategy as GitHubStrategy, Profile } from 'passport-github2';
import { PassportStrategy, User} from '../../interfaces/index';
import { Request, Response } from 'express';
import passport from 'passport';
import { findOrCreateUser } from '../../controllers/userController';

const githubStrategy: GitHubStrategy = new GitHubStrategy(
    {
        clientID: process.env.GITHUB_CLIENT_ID || "",
        clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
        callbackURL: process.env.GITHUB_CALLBACK_URL || "http://localhost:8000/auth/github/callback",
        passReqToCallback: true,
    },
    
    async (req: Request, accessToken: string, refreshToken: string, profile: Profile, 
        done: (error: any, user?: User | false)=>void) => {
            try{
                console.log('GitHub profile:', profile);

                const userData: User = {
                    id: Number(profile.id),
                    name: profile.displayName || (profile.username ?? "") ,
                    email: (profile.emails && profile.emails[0]?.value) || "",
                    password: ""
                };

                // Add to database - find existing user or create new one
                const user = findOrCreateUser(userData);

                return done(null, user);

            } catch(error){
                console.error('GitHub OAuth error:', error);
                done(error as Error);
            }
        },
);

const passportGitHubStrategy: PassportStrategy = {
    name: 'github',
    strategy: githubStrategy,
};

export default passportGitHubStrategy;
