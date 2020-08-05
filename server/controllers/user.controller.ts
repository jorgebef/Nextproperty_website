import { Request, Response } from 'express';
import UserModel from '../models/user';
import Config from '../config/config';

// Login landing page =========================================================
export const logInGet = async (req: Request, res: Response): Promise<void> => {
    res.render('control_panel/login');
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
        if (req.session) {
            req.session.userId = user._id;
            req.session.loggedUser = user.email;
        }
        console.log(req.session);
        return res.redirect('/api/properties/list');
    } else {
        return res.status(400).json({ msg: 'password is incorrect' });
    }
};

// Logout post request controller =============================================
export const logOut = async (req: Request, res: Response): Promise<void> => {
    req.session?.destroy((err) => {
        if (err) {
            res.redirect('/api/properties/list');
        }
        res.clearCookie(Config.SESS_NAME);
        console.log(req.session);
        res.redirect('/api/login');
    });
};
