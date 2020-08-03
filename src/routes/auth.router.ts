import { Router, Request, Response } from 'express';
import * as userControl from '../controllers/user.controller';
import { redirHome } from '../controllers/user.controller';

const loginRouter = Router();

// Index
loginRouter.get('/', (req: Request, res: Response) => {
    res.render('index');
});

// Login post request
loginRouter.route('/login').get(redirHome, userControl.logInGet).post(redirHome, userControl.logInPost);

export default loginRouter;
