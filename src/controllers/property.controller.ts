import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

import PropertyModel from '../models/property';

import { data } from '../middlewares/navbar.middleware';

// Create property route  =========================================================
export const createGet = async (req: Request, res: Response): Promise<Response> => {
    data.action = {};
    return res.json(data);
};

// Create property route ========================================================
export const createPost = async (req: Request, res: Response): Promise<Response> => {
    // Destructure the body into title and description params
    const { ref, title, created_timestamp, description } = req.body;
    const images = JSON.parse(req.body.images);
    const newProperty = new PropertyModel({ ref, title, created_timestamp, description, images });
    await newProperty.save();

    // =============> LOGIC FOR IMAGE UPLOAD GOES HERE <====================
    // create directory named as the reference to upload all the files
    const imgDir = path.join(`uploads/${ref}`);
    if (!fs.existsSync(imgDir)) {
        fs.mkdir(imgDir, (err) => {
            if (err) {
                console.log(err);
                return res.json({ msg: err });
            }
        });
    }
    // Retrieve the files from the request
    const imgs = (req as any).files.files;
    console.log(imgs);
    Object.keys(imgs).forEach((i) => {
        console.log(imgs[i]);
        imgs[i].mv(`uploads/${ref}/${imgs[i].name}`);
    });
    // =============> LOGIC FOR IMAGE UPLOAD GOES HERE <====================
    return res.status(200).json({ msg: 'ok' });
};

// List properties route  =========================================================
export const listGet = async (req: Request, res: Response): Promise<Response> => {
    const propertyList = await PropertyModel.find().lean();
    // Assign the object with all the values collected by the db query above
    // into the property of the data object
    data.props = propertyList;
    return res.json(data);
};

// Delete property route  =========================================================
export const deleteGet = async (req: Request, res: Response): Promise<Response> => {
    // Obtain the id passed param from the url
    const { id } = req.params;
    const prop = await PropertyModel.findById(id).lean();
    // Delete the property selected with id
    const imgDir = prop ? path.join(`uploads/${prop.ref}`) : '';
    fs.rmdirSync(imgDir, { recursive: true });
    await PropertyModel.findByIdAndDelete(id);
    return res.status(200).json({ msg: 'ok' });
};

// Get single property route  =========================================================
export const propGet = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const prop = await PropertyModel.findById(id).lean();
    // const imgDir = prop ? path.join(`uploads/${prop.ref}`) : '';
    // console.log(fs.readdirSync(imgDir));
    // fs.readdir(imgDir, (err, files) => {
    //     if (err) {
    //         return res.json({ msg: err });
    //     }
    //     if (files.length === 0) {
    //         data.images = [];
    //     } else {
    //         data.images = files;
    //     }
    // });
    data.props = prop;
    return res.status(200).json(data);
};

// Edit property route ================================================================
export const editPost = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    await PropertyModel.findByIdAndUpdate(id, req.body);
    return res.status(200).json({ msg: 'ok' });
};
