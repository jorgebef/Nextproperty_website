import { Request, Response } from 'express';
import PropertyModel from '../models/property';

// ============================================================================
//        _   _____ _    __   __  __________    ____  __________
//       / | / /   | |  / /  / / / / ____/ /   / __ \/ ____/ __ \
//      /  |/ / /| | | / /  / /_/ / __/ / /   / /_/ / __/ / /_/ /
//     / /|  / ___ | |/ /  / __  / /___/ /___/ ____/ /___/ _, _/
//    /_/ |_/_/  |_|___/  /_/ /_/_____/_____/_/   /_____/_/ |_|
//
// Class to create objects which pass data to
// the handlebars templates for them to interact
// with said data
type DataObject = {
    props: unknown; // Property information to pass to the renderer
    navbar: unknown; // Navbar section to highlight
    assignNavActive(req: Request): void; // Method assign nav
    action: unknown; // Action that we are perfonming
    session: unknown; // Cookie handler
    assignSession(req: Request): void; // Method assign cookie to data object
};

const data = {} as DataObject;

data.assignSession = (req: Request): void => {
    const userid = req.session?.userId;
    const loggedUser = req.session?.loggedUser;
    data.session = { userid, loggedUser };
};

data.assignNavActive = (req: Request): void => {
    const navActive = req.path.slice(req.path.lastIndexOf('/') + 1);
    console.log(navActive);
    data.navbar = { [navActive]: true };
};
// ============================================================================

// Create property route  =========================================================
export const createGet = async (req: Request, res: Response): Promise<void> => {
    // Here we insert data we want to provide to the view engine
    // (in this case handlebars) through the object navinfo of type NavObject
    // ---------------------------------------------------------------------
    // Clean the action property of the data object since we are only listing
    data.action = {};
    // Assign the corresponding object with values for the navbar to read
    // data.navActive = { create: true };
    data.assignNavActive(req);
    // We assign the cookie value if there is one to data.session
    data.assignSession(req);
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
    data.assignNavActive(req);
    data.assignSession(req);
    res.render('props/list', { data });
};

// List properties route  =========================================================
export const listGet = async (req: Request, res: Response): Promise<void> => {
    const propertyList = await PropertyModel.find().lean();
    data.action = {};
    // Assign the object with all the values collected by the db query above
    // into the property of the data object
    data.props = propertyList;
    data.assignNavActive(req);
    data.assignSession(req);
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
    data.assignNavActive(req);
    data.assignSession(req);
    res.render('props/list', { data });
};

// Edit property route  =========================================================
export const editGet = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const prop = await PropertyModel.findById(id).lean();
    data.action = {};
    data.assignNavActive(req);
    data.props = prop;
    data.assignSession(req);
    res.render('props/edit', { data });
};
export const editPost = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    await PropertyModel.findByIdAndUpdate(id, req.body);
    const propertyList = await PropertyModel.find().lean();
    data.props = propertyList;
    data.action = { edit: true, id };
    data.assignNavActive(req);
    data.assignSession(req);
    res.render('props/list', { data });
};
