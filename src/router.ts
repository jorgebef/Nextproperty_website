// File that contains all the routes for the application
import { Router, Request, Response } from 'express';

const router = Router();

// importing the property model
import { Property } from './models/property';

// Index
router.get('/', (req: Request, res: Response) => {
    res.render('index');
});

// Class to create objects which pass data to
// the handlebars templates for them to interact
// with said data
type DataObject = {
    props: object; // No idea why it throws this error <--------------
    active: object; // No idea why it throws this error <--------------
};
const data = {} as DataObject;

// Create properties
router
    .route('/properties/create')
    .get((req: Request, res: Response) => {
        // Here we insert data we want to provide to the view engine
        // (in this case handlebars) through the object navinfo of type NavObject
        data.active = { create: true };
        // here we pass the navinfo object as navinfo
        // {navinfo:navinfo} is shortened as {navinfo}
        res.render('props/create', { data });
    })
    .post(async (req: Request, res: Response) => {
        console.log(req.body);
        const { title, description } = req.body;
        const newProperty = new Property({ title, description });
        await newProperty.save();
        console.log(newProperty);
        res.redirect('/properties/list');
    });

// List properties
router.route('/properties/list').get(async (req: Request, res: Response) => {
    const propertyList = await Property.find().lean();
    console.log(propertyList);
    // render 'props/list' passing the objects in 'propertyList'
    // through the collection 'properties'
    // res.render('props/list', { properties: propertyList, active: { list:true } });
    data.props = propertyList;
    data.active = { list: true };
    res.render('props/list', { data });
});

// Delete properties
router.route('/properties/delete/:id').get(async (req: Request, res: Response) => {
    const { id } = req.params;
    const property = await Property.findById(id);
    console.log(property + 'was just deleted');
    await Property.findByIdAndDelete(id);
    res.render('extras/success_delete', { message: property });
    // render 'props/list' passing the objects in 'propertyList'
    // through the collection 'properties'
    // res.render('props/list', { info: { del:true, id:id } });
});

// Edit properties
router.route('/properties/edit').get(async (req: Request, res: Response) => {
    const propertyList = await Property.find().lean();
    console.log(propertyList);
    // render 'props/list' passing the objects in 'propertyList'
    // through the collection 'properties'
    res.render('props/list', { properties: propertyList, act: { list: true } });
});

export default router;
