// File that contains all the property routes for the application
import { Router } from 'express';
// importing all functions form the property controller module as p_c
import * as PropControl from '../controllers/property.controller';
import { redirLogin } from '../controllers/auth.controller';

const propertyRouter = Router();

// Create properties
propertyRouter
    .route('/api/properties/create')
    .get(redirLogin, PropControl.createGet)
    .post(redirLogin, PropControl.createPost);

// List properties
propertyRouter.route('/api/properties/list').get(redirLogin, PropControl.listGet);

// Delete properties
propertyRouter.route('/api/properties/delete/:id').get(redirLogin, PropControl.deleteGet);

// Edit properties
propertyRouter
    .route('/api/properties/edit/:id')
    .get(redirLogin, PropControl.editGet)
    .post(redirLogin, PropControl.editPost);

export default propertyRouter;
