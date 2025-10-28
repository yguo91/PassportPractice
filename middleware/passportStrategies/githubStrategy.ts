import { Strategy as GitHubStrategy, Profile } from 'passport-github2';
import { PassportStrategy, User} from '../../interfaces/index';
import { Request, Response } from 'express';
import passport from 'passport';

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
