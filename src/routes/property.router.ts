// File that contains all the property routes for the application
import { Router, Request, Response } from 'express';

const propertyRouter = Router();

// importing all functions form the property controller module as p_c
import * as PropControl from '../controllers/property.controller';
import { redirLogin } from '../controllers/user.controller';

// Index
propertyRouter.get('/', (req: Request, res: Response) => {
    res.render('index');
});

// Create properties
propertyRouter
    .route('/properties/create')
    .get(redirLogin, PropControl.createGet)
    .post(redirLogin, PropControl.createPost);

// List properties
propertyRouter.route('/properties/list').get(redirLogin, PropControl.listGet);

// Delete properties
propertyRouter.route('/properties/delete/:id').get(redirLogin, PropControl.deleteGet);

// Edit properties
propertyRouter
    .route('/properties/edit/:id')
    .get(redirLogin, PropControl.editGet)
    .post(redirLogin, PropControl.editPost);

export default propertyRouter;
