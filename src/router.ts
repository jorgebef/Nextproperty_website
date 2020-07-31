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
    props: any; // Property information to pass to the renderer
    navbar: any; // Navbar section to highlight
    action: any; // Action that we are perfonming
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
    // Clean the action property of the data object since we are only listing
    data.action = {};
    // Assign the object with all the values collected by the db query above
    // into the property of the data object
    data.props = propertyList;
    // Assign the corresponding object with values for the navbar to read
    data.navbar = { list: true };
    // render 'props/list' passing the objects in 'propertyList'
    // through the collection 'properties'
    res.render('props/list', { data });
});

// Delete properties
router.route('/properties/delete/:id').get(async (req: Request, res: Response) => {
    // Obtain the id passed param from the url
    const { id } = req.params;
    // Delete the property selected with id
    await Property.findByIdAndDelete(id);
    // Then find all properties
    const propList_new = await Property.find().lean();
    // Pass all properties to the data
    data.props = propList_new;
    // Set the action to be delete and provide the id of deleted item
    data.action = { del: true, id };
    data.navbar = { list: true };
    // Render the list page
    res.render('props/list', { data });
});

// Edit properties
router
    .route('/properties/edit/:id')
    .get(async (req: Request, res: Response) => {
        const { id } = req.params;
        const prop = await Property.findById(id).lean();
        data.action = {};
        data.navbar = { edit: true };
        data.props = prop;
        // render 'props/list' passing the objects in 'propertyList'
        // through the collection 'properties'
        res.render('props/edit', { data });
    })
    .post(async (req: Request, res: Response) => {
        const { id } = req.params;
        await Property.findByIdAndUpdate(id, req.body);
        const propertyList = await Property.find().lean();
        data.props = propertyList;
        data.action = { edit: true, id };
        data.navbar = { list: true };
        res.render('props/list', { data });
    });

export default router;
