import {Router} from 'express';
import * as userControl from '../controllers/user.controller';
import {redirHome, redirLogin} from '../middlewares/auth.middleware';

const loginRouter = Router();

// Login post request
loginRouter.route('/api/login').get(redirHome, userControl.logInGet).post(redirHome, userControl.logInPost);
// loginRouter.route('/api/login').get(userControl.logInGet).post(userControl.logInPost);

// Auth post request
loginRouter.route('/api/auth').get(userControl.authVerify);

// Logout post request
loginRouter.route('/api/logout').get(redirLogin, userControl.logOut);
// loginRouter.route('/api/logout').get(userControl.logOut);

export default loginRouter;

