// File that contains all the property routes for the application
import { Router } from 'express';
// importing all functions form the property controller module as p_c
import * as PropControl from '../controllers/property.controller';
import { redirLogin } from '../middlewares/auth.middleware';

const propertyRouter = Router();

// Create properties
propertyRouter.route('/api/property/create').get(PropControl.createGet).post(redirLogin, PropControl.createPost);

// List properties
// propertyRouter.route('/api/properties/list').get(redirLogin, PropControl.listGet);
propertyRouter.route('/api/property/list').get(redirLogin, PropControl.listGet);

// Edit properties
propertyRouter.route('/api/property/:id').get(redirLogin, PropControl.propGet);
propertyRouter.route('/api/property/edit/:id').put(redirLogin, PropControl.editPost);

// Delete properties
propertyRouter.route('/api/property/delete/:id').delete(redirLogin, PropControl.deleteGet);

// Images for properties route =============================================================

export default propertyRouter;
