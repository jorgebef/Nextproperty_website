// File that contains all the routes for the application
import { Router, Request, Response } from 'express';

const router = Router();

// importing the property model
import Property from './models/property';

// Index
router.get('/', (req: Request, res: Response) => {
    res.render('index');
});

// Create properties
router.route('/properties/create')
    .get((req: Request, res: Response) => {
        res.render('props/create');
    })
    .post(async (req: Request, res: Response) => {
        console.log(req.body);
        const { title, description } = req.body;
        const newProperty = new Property({ title, description });
        await newProperty.save();
        console.log(newProperty);
        // res.send(`title: <b>${title}</b> <br/> description: <b>${description}</b>`);
        res.redirect('/properties/list');
    });

// List properties
router.route('/properties/list')
    .get(async (req: Request, res: Response) => {
        const propertyList = await Property.find().lean();
        console.log(propertyList);
        // render 'props/list' passing the objects in 'propertyList'
        // through the collection 'properties'
        res.render('props/list', { properties: propertyList });
    });

// Delete properties
router.route('/properties/delete/:id')
    .get(async (req: Request, res: Response) => {
        const { id } = req.params;
        const property = await Property.findById(id);
        console.log(property+'was just deleted');
        await Property.findByIdAndDelete(id);
        res.render('extras/success_delete', {message: property});
        // render 'props/list' passing the objects in 'propertyList'
        // through the collection 'properties'
        // res.render('props/list', { properties: propertyList });
    });

// Edit properties
router.route('/properties/edit')
    .get(async (req: Request, res: Response) => {
        const propertyList = await Property.find().lean();
        console.log(propertyList);
        // render 'props/list' passing the objects in 'propertyList'
        // through the collection 'properties'
        res.render('props/list', { properties: propertyList });
    });


export default router;
