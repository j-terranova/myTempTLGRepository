import ConstructSegment from "../models/constructSegment.model";
import fs from "fs";

import errorHandler from "./../helpers/dbErrorHandler";
import createUsageLogEntry from "./../helpers/usageLogHandler";
import createErrorLogEntry from "./../helpers/errorLogHandler";
import defaultImage from "./../../client/assets/images/default.png";

//const path = require("path");
//const rootPath = path.normalize(__dirname + "/../../");

const create = async (req, res) => {
  console.log("Server Side - constructSegment.controller - Create - Start");
  try {
    const constructSegmentData = new ConstructSegment(req.body) 
    let result = await constructSegmentData.save()

    let newUsageLogData = {   
      userId: req.profile._id ,
      activity:  "Create" ,
      type: "Component" ,
      subType:"Segment" ,
      object_id: constructSegmentData._id ,
      description:  "Create new Segment Record" ,
      email: req.profile.email ,
      dateTimeStamp: Date.now() ,
    };
    createUsageLogEntry(newUsageLogData);

    res.json(result)
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "Create" ,
      type: "Component" ,
      subType:"Segment" ,
      object_id: "",
      description:  "Create new Segment Record" ,
      email: req.profile.email ,
      errorCode: err,
      errorMessage: errorHandler.getErrorMessage(err),
      serverOrClient: "Server",
      dateTimeStamp: Date.now() ,
    };
    createErrorLogEntry(newErrorLogData);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const update = async (req, res) => {
  console.log("ConstructSegment.controller - Update - Start");
  try {
    const constructSegmentData = ConstructSegment(req.body)
    let updatedConstructSegmentData = {   
      topic: constructSegmentData.topic ,
      description:  constructSegmentData.description ,
      myClass: constructSegmentData.myClass ,
      category:constructSegmentData.category ,
      subject: constructSegmentData.subject ,
      type: constructSegmentData.type ,
      subType: constructSegmentData.subType ,
      difficultyLevel: constructSegmentData.difficultyLevel ,
      ageRange: constructSegmentData.ageRange ,
      image_id: constructSegmentData.image_id ,
      imageFileName: constructSegmentData.imageFileName ,
      owner_id: constructSegmentData.owner_id ,
      group_id: constructSegmentData.group_id ,
      groupName: constructSegmentData.groupName ,
      keepPrivate: constructSegmentData.keepPrivate ,
      approvedForPublicUse: constructSegmentData.approvedForPublicUse ,
      constructSegment: constructSegmentData.constructSegment ,
      markDeleted: constructSegmentData.markDeleted ,
      createDate:  Date.now(),
      updatedBy: constructSegmentData.updatedBy ,
      updateDate:  Date.now(),
    };

    let result = await ConstructSegment.replaceOne({_id: constructSegmentData._id},updatedConstructSegmentData)
    let newUsageLogData = {   
      userId: req.profile._id ,
      activity:  "Update" ,
      type: "Component" ,
      subType:"Segment" ,
      object_id: constructSegmentData._id ,
      description:  "Update Segment Record" ,
      email: req.profile.email ,
      dateTimeStamp: Date.now() ,
    };
    createUsageLogEntry(newUsageLogData);

    res.json(result)
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "Update" ,
      type: "Component" ,
      subType:"Segment" ,
      object_id: "",
      description:  "Update Segment Record" ,
      email: req.profile.email ,
      errorCode: err,
      errorMessage: errorHandler.getErrorMessage(err),
      serverOrClient: "Server",
      dateTimeStamp: Date.now() ,
    };
    createErrorLogEntry(newErrorLogData);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const listByCriteria = async (req, res) => {
  console.log("ConstructSegment.controller - listByCriteria - Start");
  //for (const key in req.query) {
  //  console.log("req.query - ", key, req.query[key]);
  //}
  const findQuery = createQueryObject(req.query);
  //const userId = req.query.userId;
  try {
    let listOfSegments = await ConstructSegment.find(findQuery).select("topic description owner_id group_id markDeleted _id");
    res.json(listOfSegments);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "listByCriteria" ,
      type: "Component" ,
      subType:"Segment" ,
      object_id: "",
      description:  "listByCriteria Segment Record" ,
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

const constructSegmentById = async (req, res, next, id) => {
  try {
    let constructSegment = await ConstructSegment.findById(id);
    if (!constructSegment)
      return res.status("400").json({
        error: "ConstructSegment not found",
      });
    req.constructSegment = constructSegment;
    next();
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "constructSegmentById" ,
      type: "Component" ,
      subType:"Segment" ,
      object_id: "",
      description:  "get constructSegmentById Segment Record" ,
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
  console.log("ConstructSegment.controller - readById - Start");
  const id = req.query.id;
  try {
    let constructSegment = await ConstructSegment.findOne({_id: id});
    return res.json(constructSegment);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "readById" ,
      type: "Component" ,
      subType:"Segment" ,
      object_id: "",
      description:  "get readById Segment Record" ,
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

const readAll = (req, res) => {
  req.constructSegment.image = undefined;
  return res.json(req.constructSegment);
};

const list = async (req, res) => {
  try {
    let constructSegments = await ConstructSegment.find();
    res.json(constructSegments);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const newUserWithAccess = async (req, res) => {
  try {
    let usersWithAccess = req.body.usersWithAccess;
    let result = await ConstructSegment.findByIdAndUpdate(
      req.constructSegment._id,
      { $push: { UsersWithAccess: usersWithAccess }, updated: Date.now() },
      { new: true }
    ).exec();
    res.json(result);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const remove = async (req, res) => {
  try {
    let constructSegment = req.constructSegment;
    let deleteConstructSegment = await constructSegment.remove();
    res.json(deleteConstructSegment);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const isOwner = (req, res, next) => {
  const isOwner =
    req.constructSegment &&
    req.auth &&
    req.constructSegment.owner._id == req.auth._id;
  if (!isOwner) {
    return res.status("403").json({
      error: "User is not the Owner",
    });
  }
  next();
};

const listByOwner = async (req, res) => {
  console.log("ConstructSegment.controller - listByOwner - Start");
  try {
    let constructSegments = await ConstructSegment.find({
      owner_id: req.params.userId,
    });
    res.json(constructSegments);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "listByOwner" ,
      type: "Component" ,
      subType:"Segment" ,
      object_id: "",
      description:  "listByOwner Segment Record" ,
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

const getCurrentConstructByMaxUpdateDateAndUserId = async (req,res) => {
  console.log("ConstructSegment.controller - getCurrentConstructByMaxUpdateDateAndUserId - Start");
  try {
    let currentConstructSegment = await ConstructSegment.findOne({
      owner_id: req.params.userId,
    }).sort({ updateDate: -1 });
    res.json(currentConstructSegment);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "getCurrentConstructByMaxUpdateDateAndUserId" ,
      type: "Component" ,
      subType:"Segment" ,
      object_id: "",
      description:  "getCurrentConstructByMaxUpdateDateAndUserId Segment Record" ,
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
  ConstructSegment.find(
    { approvedPublic: true },
    (err, constructSegments) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err),
        });
      }
      res.json(constructSegments);
    }
  );
};

const photo = (req, res, next) => {
  if (req.constructSegment.image.data) {
    res.set("Content-Type", req.constructSegment.image.contentType);
    return res.send(req.constructSegment.image.data);
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
  constructSegmentById,
  readById,
  readAll,
  list,
  getCurrentConstructByMaxUpdateDateAndUserId,
  listByCriteria,
  remove,
  update,
  isOwner,
  listByOwner,
  photo,
  defaultPhoto,
  newUserWithAccess,
  listApprovedPublic,
};




