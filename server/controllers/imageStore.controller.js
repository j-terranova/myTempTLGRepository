import ImageStore from "../models/imageStore.model";
import fs from "fs";
import errorHandler from "./../helpers/dbErrorHandler";
import createUsageLogEntry from "./../helpers/usageLogHandler";
import createErrorLogEntry from "./../helpers/errorLogHandler";
import formidable from "formidable";
import defaultImage from "./../../client/assets/images/default.png";

const path = require("path");
const rootPath = path.normalize(__dirname + "/../../");

const create = (req, res) => {
  console.log("Server Side - imageStore.controller - create - start");
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.log("Server Side - imageStore.controller - error parsing - err =  ", err);
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }
    let imageStore = new ImageStore(fields);
    if (files.image) {
      imageStore.image.data = fs.readFileSync(files.image.path);
      imageStore.image.contentType = files.image.type;
    }
    try {
      let createdImageStore = await imageStore.save();
      let newUsageLogData = {   
        userId: req.profile._id ,
        activity:  "Create" ,
        type: "Component" ,
        subType:"ImageStore" ,
        object_id: imageStore._id ,
        description:  "Create new ImageStore Record" ,
        email: req.profile.email ,
        dateTimeStamp: Date.now() ,
      };
      createUsageLogEntry(newUsageLogData);

      let imageBase64 = Buffer.from(createdImageStore.image.data, 'binary').toString('base64');
      let returnImage = {
      fileNameInternal: createdImageStore.fileNameInternal,
      fileNameExternal: createdImageStore.fileNameExternal,
      topic:  createdImageStore.topic,
      description:   createdImageStore.description,
      myClass:  createdImageStore.myClass,
      category:  createdImageStore.category,
      subject:  createdImageStore.subject,
      type:  createdImageStore.type,
      subType:  createdImageStore.subType,
      difficultyLevel:  createdImageStore.difficultyLevel,
      ageRange:  createdImageStore.ageRange,
      imageBase64:  imageBase64,
      imageType: createdImageStore.image.contentType,
      owner_id: createdImageStore.owner_id,
      group_id:  createdImageStore.group_id ,
      keepPrivate:  createdImageStore.keepPrivate ,
      approvedForPublicUse: createdImageStore.approvedForPublicUse,
      markDeleted:  createdImageStore.markDeleted,
      createDate:  createdImageStore.createDate,
      updatedBy:  createdImageStore.updatedBy,
      updateDate: createdImageStore.updateDate,
      _id:  createdImageStore._id,
      }
      res.json(returnImage);
    } catch (err) {
      let newErrorLogData = {   
        userId: req.profile._id ,
        activity:  "Create" ,
        type: "Component" ,
        subType:"Image" ,
        object_id: "",
        description:  "Create new Image Record" ,
        email: req.profile.email ,
        errorCode: err,
        errorMessage: errorHandler.getErrorMessage(err),
        serverOrClient: "Server",
        dateTimeStamp: Date.now() ,
      };
      createErrorLogEntry(newErrorLogData);
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
  });
};

const update = async (req, res) => {
  console.log("Server Side - imageStore.controller - Update - Start ");
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      let newErrorLogData = {   
        userId: req.profile._id ,
        activity:  "Update" ,
        type: "Component" ,
        subType:"Image" ,
        object_id: "",
        description:  "Parsing data - Update Image Record" ,
        email: req.profile.email ,
        errorCode: err,
        errorMessage: errorHandler.getErrorMessage(err),
        serverOrClient: "Server",
        dateTimeStamp: Date.now() ,
      };
      createErrorLogEntry(newErrorLogData);
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }
    let imageStore = ImageStore(fields);
    if (files.image) {
      imageStore.image.data = fs.readFileSync(files.image.path);
      imageStore.image.contentType = files.image.type;
    } else
    {
      imageStore.image.data = Buffer.from(fields.imageBinary, 'binary').toString('base64');
      imageStore.image.contentType = fields.imageType;
    }
    try {

      const filter = { _id: imageStore._id };
      const update = {
        fileNameInternal: imageStore.fileNameInternal,
        fileNameExternal: imageStore.fileNameExternal,
        topic:  imageStore.topic,
        description:   imageStore.description,
        myClass:  imageStore.myClass,
        category:  imageStore.category,
        subject:  imageStore.subject,
        type:  imageStore.type,
        subType:  imageStore.subType,
        difficultyLevel:  imageStore.difficultyLevel,
        ageRange:  imageStore.ageRange,
        image:  imageStore.image,
        owner_id: imageStore.owner_id,
        group_id:  imageStore.group_id ,
        keepPrivate:  imageStore.keepPrivate ,
        approvedForPublicUse: imageStore.approvedForPublicUse,
        markDeleted:  imageStore.markDeleted,
        createDate:  imageStore.createDate,
        updatedBy:  imageStore.updatedBy,
        updateDate: imageStore.updateDate,
      };
        let updatedImageStore = await ImageStore.findOneAndUpdate(filter, update, {
        returnNewDocument : true,
      });
      
      let newUsageLogData = {   
        userId: req.profile._id ,
        activity:  "Update" ,
        type: "Component" ,
        subType:"ImageStore" ,
        object_id: imageStore._id ,
        description:  "Update ImageStore Record" ,
        email: req.profile.email ,
        dateTimeStamp: Date.now() ,
      };
      createUsageLogEntry(newUsageLogData);
      let imageBase64 = Buffer.from(updatedImageStore.image.data, 'binary').toString('base64');
      let returnImage = {
      fileNameInternal: updatedImageStore.fileNameInternal,
      fileNameExternal: updatedImageStore.fileNameExternal,
      topic:  updatedImageStore.topic,
      description:   updatedImageStore.description,
      myClass:  updatedImageStore.myClass,
      category:  updatedImageStore.category,
      subject:  updatedImageStore.subject,
      type:  updatedImageStore.type,
      subType:  updatedImageStore.subType,
      difficultyLevel:  updatedImageStore.difficultyLevel,
      ageRange:  updatedImageStore.ageRange,
      imageBase64:  imageBase64,
      imageType: updatedImageStore.image.contentType,
      owner_id: updatedImageStore.owner_id,
      group_id:  updatedImageStore.group_id ,
      keepPrivate:  updatedImageStore.keepPrivate ,
      approvedForPublicUse: updatedImageStore.approvedForPublicUse,
      markDeleted:  updatedImageStore.markDeleted,
      createDate:  updatedImageStore.createDate,
      updatedBy:  updatedImageStore.updatedBy,
      updateDate: updatedImageStore.updateDate,
      _id:  updatedImageStore._id,
      }
      res.json(returnImage);

    } catch (err) {
      let newErrorLogData = {   
        userId: req.profile._id ,
        activity:  "Update" ,
        type: "Component" ,
        subType:"Image" ,
        object_id: "",
        description:  "Update Image Record" ,
        email: req.profile.email ,
        errorCode: err,
        errorMessage: errorHandler.getErrorMessage(err),
        serverOrClient: "Server",
        dateTimeStamp: Date.now() ,
      };
      createErrorLogEntry(newErrorLogData);
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
  });
};

const listByCriteria = async (req, res) => {
  console.log("ImageStore.controller - listByCriteria - Start");
  //for (const key in req.query) {
  //  console.log("req.query - ", key, req.query[key]);
  //}
  const findQuery = createQueryObject(req.query);
  try {
    let listOfImages = await ImageStore.find(findQuery).select("topic description owner_id group_id markDeleted _id");
    res.json(listOfImages);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "listByCriteria" ,
      type: "Component" ,
      subType:"Image" ,
      object_id: "",
      description:  "listByCriteria Image Record" ,
      email: req.profile.email ,
      errorCode: err,
      errorMessage: errorHandler.getErrorMessage(err),
      serverOrClient: "Server",
      dateTimeStamp: Date.now() ,
    };
    createErrorLogEntry(newErrorLogData);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const imageStoreById = async (req, res, next, id) => {
  console.log("ImageStore.controller - imageStoreById - Start");
  try {
    let imageStore = await ImageStore.findById(id);
    if (!imageStore)
      return res.status("400").json({
        error: "ImageStore not found",
      });
    req.imageStore = imageStore;
    next();
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "imageStoreById" ,
      type: "Component" ,
      subType:"Image" ,
      object_id: "",
      description:  "imageStoreById Image Record" ,
      email: req.profile.email ,
      errorCode: err,
      errorMessage: errorHandler.getErrorMessage(err),
      serverOrClient: "Server",
      dateTimeStamp: Date.now() ,
    };
    createErrorLogEntry(newErrorLogData);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const readById = async (req, res) => {
  console.log("ImageStore.controller - readById -  Start");
  const id = req.query.id;
  try {
    let imageStore = await ImageStore.findOne({_id: id});
    let imageBase64 = Buffer.from(imageStore.image.data, 'binary').toString('base64');
    let returnImage = {
    fileNameInternal: imageStore.fileNameInternal,
    fileNameExternal: imageStore.fileNameExternal,
    topic:  imageStore.topic,
    description:   imageStore.description,
    myClass:  imageStore.myClass,
    category:  imageStore.category,
    subject:  imageStore.subject,
    type:  imageStore.type,
    subType:  imageStore.subType,
    difficultyLevel:  imageStore.difficultyLevel,
    ageRange:  imageStore.ageRange,
    imageBase64:  imageBase64,
    imageType: imageStore.image.contentType,
    owner_id: imageStore.owner_id,
    group_id:  imageStore.group_id ,
    keepPrivate:  imageStore.keepPrivate ,
    approvedForPublicUse: imageStore.approvedForPublicUse,
    markDeleted:  imageStore.markDeleted,
    createDate:  imageStore.createDate,
    updatedBy:  imageStore.updatedBy,
    updateDate: imageStore.updateDate,
    _id:  imageStore._id,
    }
    res.json(returnImage);
    //return returnImage;
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "readById" ,
      type: "Component" ,
      subType:"Image" ,
      object_id: "",
      description:  "get readById Image Record" ,
      email: req.profile.email ,
      errorCode: err,
      errorMessage: errorHandler.getErrorMessage(err),
      serverOrClient: "Server",
      dateTimeStamp: Date.now() ,
    };
    createErrorLogEntry(newErrorLogData);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
}


const list = async (req, res) => {
  try {
    let imageStores = await ImageStore.find();
    res.json(imageStores);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const remove = async (req, res) => {
  try {
    let imageStore = req.imageStore;
    let deleteImageStore = await imageStore.remove();
    res.json(deleteImageStore);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const isOwner = (req, res, next) => {
  const isOwner =
    req.imageStore &&
    req.auth &&
    req.imageStore.owner._id == req.auth._id;
  if (!isOwner) {
    return res.status("403").json({
      error: "User is not the Owner",
    });
  }
  next();
};

const listByOwner = async (req, res) => {
  console.log("ImageStore.controller - listByOwner - Start");
  try {
    let imageStores = await ImageStore.find({
      owner_id: req.params.userId,
    });

    res.json(imageStores);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "listByOwner" ,
      type: "Component" ,
      subType:"Image" ,
      object_id: "",
      description:  "listByOwner Image Record" ,
      email: req.profile.email ,
      errorCode: err,
      errorMessage: errorHandler.getErrorMessage(err),
      serverOrClient: "Server",
      dateTimeStamp: Date.now() ,
    };
    createErrorLogEntry(newErrorLogData);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};


const getCurrentImageByMaxUpdateDateAndUserId = async (req,res) => {
  console.log("ImageStore.controller - getCurrentImageByMaxUpdateDateAndUserId - Start");
  try {
    let currentImageStore = await ImageStore.findOne({
      owner_id: req.params.userId,
    }).sort({ updateDate: -1 });

    res.json(currentImageStore);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "getCurrentImageByMaxUpdateDateAndUserId" ,
      type: "Component" ,
      subType:"Image" ,
      object_id: "",
      description:  "getCurrentImageByMaxUpdateDateAndUserId Image Record" ,
      email: req.profile.email ,
      errorCode: err,
      errorMessage: errorHandler.getErrorMessage(err),
      serverOrClient: "Server",
      dateTimeStamp: Date.now() ,
    };
    createErrorLogEntry(newErrorLogData);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};


const listApprovedPublic = (req, res) => {
  ImageStore.find(
    { approvedPublic: true },
    (err, imageStores) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err),
        });
      }
      res.json(imageStores);
    }
  );
};

const photo = (req, res, next) => {
  if (req.imageStore.image.data) {
    res.set("Content-Type", req.imageStore.image.contentType);
    return res.send(req.imageStore.image.data);
  }
  next();
};
const defaultPhoto = (req, res) => {
  return res.sendFile(process.cwd() + defaultImage);
};

function createQueryObject(obj) {
  let queryString = "{";
  let cnt = 0;
  for (const key in obj) {
    if (
      key != "false" &&
      obj[key] != undefined &&
      obj[key] != "undefined" &&
      obj[key] != null &&
      obj[key] != "" &&
      obj[key] != false &&
      obj[key] != "false" &&
      obj[key].length > 0
    ) {
      cnt > 0 ? (queryString = queryString + ",") : queryString;
      queryString = queryString + '"' + key + '": "' + obj[key] + '"';
      cnt = cnt + 1;
      console.log(
        " createQueryObj - iteration : " + cnt + "  " + key + ":  " + obj[key]
      );
    }
  }

  queryString = queryString + "}";
  console.log("createQueryObject - queryString = ", queryString);
  const queryObj = JSON.parse(queryString);
  return queryObj;
}

export default {
  create,
  update,
  listByCriteria,
  imageStoreById,
  readById,
  list,
  remove,
  isOwner,
  listByOwner,
  getCurrentImageByMaxUpdateDateAndUserId,
  photo,
  defaultPhoto,
  listApprovedPublic,
};




