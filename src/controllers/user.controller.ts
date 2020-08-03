import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/user';

// confirm whether the user is authenticated
// const authenticated = passport.authenticate('jwt', { session: false });
export const redirLogin = (req: Request, res: Response, next: NextFunction): void => {
    if (req?.session?.userId) {
        next();
    } else {
        res.redirect('/login');
    }
};

// Avoid relogging in by redirecting from login to list page if already logged in
export const redirHome = (req: Request, res: Response, next: NextFunction): void => {
    if (req?.session?.userId) {
        res.redirect('/properties/list');
    } else {
        next();
    }
};

// Login landing page =========================================================
export const logInGet = async (req: Request, res: Response): Promise<void> => {
    res.render('auth/login');
};

// Login post request controller ===============================================
export const logInPost = async (req: Request, res: Response): Promise<unknown> => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ msg: 'Please provide both an email and a password' });
    }
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).json({ msg: 'Email not found' });
    }
    // Compare the password typed to the stored one running the method from the
    // Interface and Schema
    const isMatch = await user.comparePassword(req.body.password);

    if (isMatch) {
        // if to avoid the T2532 error for the request type
        if (req.session) req.session.userId = user._id;
        console.log(req.session);
        return res.redirect('properties/list');
    } else {
        return res.status(400).json({ msg: 'password is incorrect' });
    }
};
