import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import Config from '../config/config';

// confirm whether the user is authenticated
// const authenticated = passport.authenticate('jwt', { session: false });
export const redirLogin = (req: Request, res: Response, next: NextFunction): void => {
    // const token = req?.headers?.authorization?.split(' ')[1];
    // const token = req.cookies.token || '';
    const token = req.headers['authorization']?.split(' ')[1] || '';
    console.log('this is the token: ' + token);
    if (token) {
        console.log('token found!!');
        console.log(token);
        jwt.verify(token, Config.SESS_SECRET);
        console.log('token successfully verified');
        next();
    } else {
        console.log('Redirecting to Login screen');
        // res.redirect('/api/login');
        res.status(403).json('Not logged in!!');
    }
};

// Avoid relogging in by redirecting from login to list page if already logged in
export const redirHome = (req: Request, res: Response, next: NextFunction): void => {
    if (req.session?.userId) {
        // res.redirect('/api/properties/list');
        next();
    } else {
        next();
    }
};
