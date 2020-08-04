import { Router } from 'express';
import * as userControl from '../controllers/user.controller';
import { redirHome, redirLogin } from '../controllers/auth.controller';

const loginRouter = Router();

// Login post request
loginRouter.route('/api/login').get(redirHome, userControl.logInGet).post(redirHome, userControl.logInPost);

// Logout post request
loginRouter.route('/api/logout').post(redirLogin, userControl.logOut);

export default loginRouter;
