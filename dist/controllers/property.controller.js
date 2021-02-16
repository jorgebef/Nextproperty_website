"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.propGet = exports.deleteGet = exports.listGet = exports.editPost = exports.createPost = exports.createGet = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const property_1 = __importDefault(require("../models/property"));
const navbar_middleware_1 = require("../middlewares/navbar.middleware");
// Create property route  =========================================================
const createGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    navbar_middleware_1.data.action = {};
    return res.json(navbar_middleware_1.data);
});
exports.createGet = createGet;
// Create property route ========================================================
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Destructure the body into title and description params
    let images;
    if (req.body.images != 'undefined') {
        images = JSON.parse(req.body.images);
    }
    else {
        images = '';
    }
    const newProperty = new property_1.default(Object.assign(Object.assign({}, req.body), { images: images }));
    yield newProperty.save();
    // =============> LOGIC FOR IMAGE UPLOAD GOES HERE <====================
    // create directory named as the reference to upload all the files
    const imgDir = path_1.default.join(`uploads/${req.body.ref.toUpperCase()}`);
    if (!fs_1.default.existsSync(imgDir)) {
        fs_1.default.mkdir(imgDir, (err) => {
            if (err) {
                console.log(err);
                return res.json({ msg: err });
            }
        });
    }
    // Retrieve the files from the request
    if (req.files) {
        // Check whether multiple files or single file
        if (Array.isArray(req.files.files)) {
            const imgs = req.files.files;
            Object.keys(imgs).forEach((i) => {
                console.log(imgs[i]);
                imgs[i].mv(`uploads/${req.body.ref.toUpperCase()}/${imgs[i].name}`);
            });
        }
        else {
            const img = req.files.files;
            img.mv(`uploads/${req.body.ref.toUpperCase()}/${img.name}`);
        }
    }
    // =============> LOGIC FOR IMAGE UPLOAD GOES HERE <====================
    return res.status(200).json({ msg: 'ok' });
});
exports.createPost = createPost;
// Edit property route ================================================================
const editPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let images;
    if (req.body.images != 'undefined') {
        images = JSON.parse(req.body.images);
    }
    else {
        images = '';
    }
    // const oldProp = await PropertyModel.findById(id).lean();
    const oldProp = yield property_1.default.findOne({ _id: id }).lean();
    // await PropertyModel.findByIdAndUpdate(id, { ...req.body, images });
    yield property_1.default.updateOne({ _id: id }, Object.assign(Object.assign({}, req.body), { images }));
    if ((oldProp === null || oldProp === void 0 ? void 0 : oldProp.ref) !== req.body.ref.toUpperCase()) {
        const oldPath = `uploads/${oldProp === null || oldProp === void 0 ? void 0 : oldProp.ref}`;
        const newPath = `uploads/${req.body.ref.toUpperCase()}`;
        fs_1.default.mkdirSync(newPath);
        fs_1.default.readdirSync(oldPath).map((f) => {
            fs_1.default.renameSync(`${oldPath}/${f}`, `${newPath}/${f}`);
        });
        fs_1.default.rmdirSync(oldPath);
    }
    if (req.body.imgDel) {
        console.log(req.body.imgDel);
        const imgDelArray = JSON.parse(req.body.imgDel);
        if (imgDelArray.length > 1) {
            imgDelArray.map((i) => {
                try {
                    fs_1.default.unlinkSync(`uploads/${req.body.ref.toUpperCase()}/${i}`);
                }
                catch (error) {
                    console.log(error);
                }
            });
        }
        else {
            try {
                fs_1.default.unlinkSync(`uploads/${req.body.ref.toUpperCase()}/${imgDelArray}`);
            }
            catch (error) {
                console.log(error);
            }
        }
    }
    // Retrieve the files from the request
    if (req.files) {
        // Check whether multiple files or single file
        if (Array.isArray(req.files.files)) {
            const imgs = req.files.files;
            Object.keys(imgs).forEach((i) => {
                console.log(imgs[i]);
                imgs[i].mv(`uploads/${req.body.ref.toUpperCase()}/${imgs[i].name}`);
            });
        }
        else {
            const img = req.files.files;
            img.mv(`uploads/${req.body.ref.toUpperCase()}/${img.name}`);
        }
    }
    return res.status(200).json({ msg: 'ok' });
});
exports.editPost = editPost;
// List properties route  =========================================================
const listGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const propertyList = yield property_1.default.find().lean();
    // Assign the object with all the values collected by the db query above
    // into the property of the data object
    navbar_middleware_1.data.props = propertyList;
    return res.json(navbar_middleware_1.data);
});
exports.listGet = listGet;
// Delete property route  =========================================================
const deleteGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Obtain the id passed param from the url
    const { id } = req.params;
    const prop = yield property_1.default.findById(id).lean();
    // Delete the property selected with id
    const imgDir = prop ? path_1.default.join(`uploads/${prop.ref}`) : '';
    try {
        fs_1.default.rmdirSync(imgDir, { recursive: true });
    }
    catch (error) {
        console.log(error);
    }
    yield property_1.default.findByIdAndDelete(id);
    return res.status(200).json({ msg: 'ok' });
});
exports.deleteGet = deleteGet;
// Get single property route  =========================================================
const propGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const prop = yield property_1.default.findById(id).lean();
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
    navbar_middleware_1.data.props = prop;
    return res.status(200).json(navbar_middleware_1.data);
});
exports.propGet = propGet;
