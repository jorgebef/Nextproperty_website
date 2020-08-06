import { Request, Response, NextFunction } from 'express';

// confirm whether the user is authenticated
// const authenticated = passport.authenticate('jwt', { session: false });
export const redirLogin = (req: Request, res: Response, next: NextFunction): void => {
    if (req.session?.userId) {
        next();
    } else {
        res.redirect('/api/login');
    }
};

// Avoid relogging in by redirecting from login to list page if already logged in
export const redirHome = (req: Request, res: Response, next: NextFunction): void => {
    if (req.session?.userId) {
        res.redirect('/api/properties/list');
    } else {
        next();
    }
};
