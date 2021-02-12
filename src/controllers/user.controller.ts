import {Request, Response} from 'express';
import UserModel from '../models/user';
import Config from '../config/config';
import jwt from 'jsonwebtoken';

// Login landing page =========================================================
export const logInGet = async (req: Request, res: Response): Promise<void> => {
    res.json('Login page!!!');
};

// Login post request controller ===============================================
export const logInPost = async (req: Request, res: Response): Promise<Response> => {
    if (!req.body.email || !req.body.password) {
        console.log(req.body);
        return res.status(400).json({msg: 'Please provide both an email and a password'});
    }
    const user = await UserModel.findOne({email: req.body.email});
    // Compare the password typed to the stored one running the method from the
    // Interface and Schema
    const isMatch = await user?.comparePassword(req.body.password);
    if (isMatch) {
        const jwToken = jwt.sign(
            {
                email: req.body.email,
                userId: user?._id,
            },
            Config.SESS_SECRET,
            {expiresIn: 1000 * 60 * 60 * 24} // 24h in miliseconds
        );
        console.log('Successful login!!!!!!!!!!');
        // return res.status(200).json({
        //     token: jwToken,
        //     expiresIn: 900000, // 15 min in miliseconds
        // });
        return res.status(200)
            .cookie('token', jwToken)
            .send({
                msg: 'successful login',
                token: jwToken,
                // tokenExpiry: new Date(Date.now() + 1000 * 60 * 60 * 24),
            });
    } else {
        return res.status(400).json({msg: 'password is incorrect'});
    }
};

export const authVerify = (req: Request, res: Response): void => {
    const token = req.cookies.token || '';
    // const token = req.headers['authorization']?.split(' ')[1] || '';
    console.log(req.headers.authorization);
    // console.log('this is the token: ' + token);
    if (token) {
        // console.log('token found!!');
        jwt.verify(token, Config.SESS_SECRET);
        console.log('token successfully verified');
        res.status(200).json('Token verified');
    } else {
        console.log('NOT VERIFIED!!!');
        // res.redirect('/api/login');
        res.status(400).json('Not logged in!!');
    }
};

// Logout post request controller =============================================
export const logOut = async (req: Request, res: Response): Promise<Response> => {
    return res
        .cookie('token', null, {
            expires: new Date(Date.now()),
            secure: false, // set to true if your using https
            httpOnly: true,
        })
        .status(200)
        .json({msg: 'successfully logged out'});
};

// // Logout post request controller =============================================
// export const logOut = async (req: Request, res: Response): Promise<void> => {
//     req.session?.destroy((err) => {
//         if (err) {
//             res.redirect('/api/properties/list');
//         }
//         res.clearCookie(Config.SESS_NAME);
//         console.log(req.session);
//         res.redirect('/api/login');
//     });
// };
