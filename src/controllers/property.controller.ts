import { Request, Response } from 'express';

import PropertyModel from '../models/property';

// Class to create objects which pass data to
// the handlebars templates for them to interact
// with said data
type DataObject = {
    props: unknown; // Property information to pass to the renderer
    navActive: unknown; // Navbar section to highlight
    action: unknown; // Action that we are perfonming
    session: unknown; // Cookie handler
};

const data = {} as DataObject;

// Create property route  =========================================================
export const createGet = async (req: Request, res: Response): Promise<void> => {
    // Here we insert data we want to provide to the view engine
    // (in this case handlebars) through the object navinfo of type NavObject
    // ---------------------------------------------------------------------
    // Clean the action property of the data object since we are only listing
    data.action = {};
    // Assign the corresponding object with values for the navbar to read
    data.navActive = { create: true };
    // First we look if there is a cookie or not
    data.session = req.session?.userId;
    // here we pass the data object as data (same as data:data)
    res.render('props/create', { data });
};
export const createPost = async (req: Request, res: Response): Promise<void> => {
    // Destructure the body into title and description params
    const { ref, title, description } = req.body;
    const newProperty = new PropertyModel({ ref, title, description });
    await newProperty.save();
    const propertyList = await PropertyModel.find().lean();
    data.props = propertyList;
    data.action = { create: true, id: newProperty._id };
    data.navActive = { list: true };
    res.render('props/list', { data });
};

// List properties route  =========================================================
export const listGet = async (req: Request, res: Response): Promise<void> => {
    const propertyList = await PropertyModel.find().lean();
    data.action = {};
    // Assign the object with all the values collected by the db query above
    // into the property of the data object
    data.props = propertyList;
    data.navActive = { list: true };
    data.session = req.session?.userId;
    res.render('props/list', { data });
};

// Delete property route  =========================================================
export const deleteGet = async (req: Request, res: Response): Promise<void> => {
    // Obtain the id passed param from the url
    const { id } = req.params;
    // Delete the property selected with id
    await PropertyModel.findByIdAndDelete(id);
    // Then find all properties
    const propList_new = await PropertyModel.find().lean();
    data.props = propList_new;
    // Set the action to be delete and provide the id of deleted item
    data.action = { del: true, id };
    data.navActive = { list: true };
    res.render('props/list', { data });
};

// Edit property route  =========================================================
export const editGet = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const prop = await PropertyModel.findById(id).lean();
    data.action = {};
    data.navActive = { edit: true };
    data.props = prop;
    res.render('props/edit', { data });
};
export const editPost = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    await PropertyModel.findByIdAndUpdate(id, req.body);
    const propertyList = await PropertyModel.find().lean();
    data.props = propertyList;
    data.action = { edit: true, id };
    data.navActive = { list: true };
    res.render('props/list', { data });
};
