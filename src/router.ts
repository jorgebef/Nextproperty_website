// File that contains all the routes for the application
import { Router, Request, Response } from 'express';

const router = Router();

// importing the property model
import Property from './models/property';

// Index
router.get('/', (req: Request, res: Response) => {
    res.render('index');
});

// Class to create objects which pass data to
// the handlebars templates for them to interact
// with said data
type DataObject = {
    props: any; // No idea why it throws this error <--------------
    navbar: any; // No idea why it throws this error <--------------
    action: any;
};

const data = {} as DataObject;

// Create properties
router
    .route('/properties/create')
    .get((req: Request, res: Response) => {
        // Here we insert data we want to provide to the view engine
        // (in this case handlebars) through the object navinfo of type NavObject
        data.action = {};
        data.navbar = { create: true };
        // here we pass the navinfo object as navinfo
        // {navinfo:navinfo} is shortened as {navinfo}
        res.render('props/create', { data });
    })
    .post(async (req: Request, res: Response) => {
        // Destructure the body into title and description params
        const { title, description } = req.body;
        const newProperty = new Property({ title, description });
        await newProperty.save();
        const propertyList = await Property.find().lean();
        data.props = propertyList;
        data.action = { create: true, id: newProperty._id };
        data.navbar = { list: true };
        res.render('props/list', { data });
    });

// List properties
router.route('/properties/list').get(async (req: Request, res: Response) => {
    const propertyList = await Property.find().lean();
    data.action = {};
    // render 'props/list' passing the objects in 'propertyList'
    // through the collection 'properties'
    // res.render('props/list', { properties: propertyList, active: { list:true } });
    data.props = propertyList;
    data.navbar = { list: true };
    res.render('props/list', { data });
});

// Delete properties
router.route('/properties/delete/:id').get(async (req: Request, res: Response) => {
    // Obtain the id passed param from the url
    const { id } = req.params;
    // Delete the property selected with id
    await Property.findByIdAndDelete(id);
    // Then find all properties
    const propertyList = await Property.find().lean();
    // Pass all properties to the data
    data.props = propertyList;
    // Set the action to be delete and provide the id of deleted item
    data.action = { del: true, id };
    // Render the list page
    res.render('props/list', { data });
});

// Edit properties
router.route('/properties/edit/:id').get(async (req: Request, res: Response) => {
    const { id } = req.params;
    const property = await Property.findById(id).lean();
    data.props = property;
    // render 'props/list' passing the objects in 'propertyList'
    // through the collection 'properties'
    res.render('props/edit', { data });
});

export default router;
