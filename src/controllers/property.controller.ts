import {Request, Response} from 'express';
import fs from 'fs';
import path from 'path';

import PropertyModel from '../models/property';

import {data} from '../middlewares/navbar.middleware';

// Create property route  =========================================================
export const createGet = async (req: Request, res: Response): Promise<Response> => {
    data.action = {};
    return res.json(data);
};

// Create property route ========================================================
export const createPost = async (req: Request, res: Response): Promise<Response> => {
    // Destructure the body into title and description params
    let images;
    if (req.body.images != 'undefined') {
        images = JSON.parse(req.body.images);
    } else {
        images = '';
    }
    const newProperty = new PropertyModel({...req.body, images: images});
    await newProperty.save();
    // =============> LOGIC FOR IMAGE UPLOAD GOES HERE <====================
    // create directory named as the reference to upload all the files
    const imgDir = path.join(`uploads/${req.body.ref.toUpperCase()}`);
    if (!fs.existsSync(imgDir)) {
        fs.mkdir(imgDir, (err) => {
            if (err) {
                console.log(err);
                return res.json({msg: err});
            }
        });
    }
    // Retrieve the files from the request
    if (req.files) {
        // Check whether multiple files or single file
        if (Array.isArray(req.files.files)) {
            const imgs = (req as any).files.files;
            Object.keys(imgs).forEach((i) => {
                console.log(imgs[i]);
                imgs[i].mv(`uploads/${req.body.ref.toUpperCase()}/${imgs[i].name}`);
            });
        } else {
            const img = (req as any).files.files;
            img.mv(`uploads/${req.body.ref.toUpperCase()}/${img.name}`);
        }
    }
    // =============> LOGIC FOR IMAGE UPLOAD GOES HERE <====================
    return res.status(200).json({msg: 'ok'});
};

// Edit property route ================================================================
export const editPost = async (req: Request, res: Response): Promise<Response> => {
    const {id} = req.params;
    let images;
    if (req.body.images != 'undefined') {
        images = JSON.parse(req.body.images);
    } else {
        images = '';
    }
    // const oldProp = await PropertyModel.findById(id).lean();
    const oldProp = await PropertyModel.findOne({_id: id}).lean();
    // await PropertyModel.findByIdAndUpdate(id, { ...req.body, images });
    await PropertyModel.updateOne({_id: id}, {...req.body, images});
    if (oldProp?.ref !== req.body.ref.toUpperCase()) {
        const oldPath = `uploads/${oldProp?.ref}`;
        const newPath = `uploads/${req.body.ref.toUpperCase()}`;
        fs.mkdirSync(newPath);
        fs.readdirSync(oldPath).map((f) => {
            fs.renameSync(`${oldPath}/${f}`, `${newPath}/${f}`);
        });
        fs.rmdirSync(oldPath);
    }
    if (req.body.imgDel) {
        console.log(req.body.imgDel);
        const imgDelArray = JSON.parse(req.body.imgDel);
        if (imgDelArray.length > 1) {
            imgDelArray.map((i: string) => {
                fs.unlinkSync(`uploads/${req.body.ref.toUpperCase()}/${i}`);
            });
        } else {
            fs.unlinkSync(`uploads/${req.body.ref.toUpperCase()}/${imgDelArray}`);
        }
    }
    // Retrieve the files from the request
    if (req.files) {
        // Check whether multiple files or single file
        if (Array.isArray(req.files.files)) {
            const imgs = (req as any).files.files;
            Object.keys(imgs).forEach((i) => {
                console.log(imgs[i]);
                imgs[i].mv(`uploads/${req.body.ref.toUpperCase()}/${imgs[i].name}`);
            });
        } else {
            const img = (req as any).files.files;
            img.mv(`uploads/${req.body.ref.toUpperCase()}/${img.name}`);
        }
    }
    return res.status(200).json({msg: 'ok'});
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
    const {id} = req.params;
    const prop = await PropertyModel.findById(id).lean();
    // Delete the property selected with id
    const imgDir = prop ? path.join(`uploads/${prop.ref}`) : '';
    try {
        fs.rmdirSync(imgDir, {recursive: true});
    } catch (error) {
        console.log(error)
    }
    await PropertyModel.findByIdAndDelete(id)
    return res.status(200).json({msg: 'ok'});
};

// Get single property route  =========================================================
export const propGet = async (req: Request, res: Response): Promise<Response> => {
    const {id} = req.params;
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
