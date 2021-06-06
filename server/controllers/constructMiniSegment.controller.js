import ConstructMiniSegment from "../models/constructMiniSegment.model";
import fs from "fs";
import errorHandler from "./../helpers/dbErrorHandler";
import createUsageLogEntry from "./../helpers/usageLogHandler";
import createErrorLogEntry from "./../helpers/errorLogHandler";
import defaultImage from "./../../client/assets/images/default.png";

//const path = require("path");
//const rootPath = path.normalize(__dirname + "/../../");

const create = async (req, res) => {
  console.log("ConstructMiniSegment.controller - Create  Start");
  try {
    const constructMiniSegmentData = new ConstructMiniSegment(req.body)
    let result = await constructMiniSegmentData.save()
    
    let newUsageLogData = {   
      userId: req.profile._id ,
      activity:  "Create" ,
      type: "Component" ,
      subType:"MiniSegment" ,
      object_id: constructMiniSegmentData._id ,
      description:  "Create new MiniSegment Record" ,
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
      subType:"MiniSegment" ,
      object_id: "",
      description:  "Create new MiniSegment Record" ,
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
  console.log("ConstructMiniSegment.controller - Update - Start");
  try {
    const constructMiniSegmentData = ConstructMiniSegment(req.body)
    let updatedConstructMiniSegmentData = {   
      topic: constructMiniSegmentData.topic ,
      description:  constructMiniSegmentData.description ,
      myClass: constructMiniSegmentData.myClass ,
      category:constructMiniSegmentData.category ,
      subject: constructMiniSegmentData.subject ,
      type: constructMiniSegmentData.type ,
      subType: constructMiniSegmentData.subType ,
      difficultyLevel: constructMiniSegmentData.difficultyLevel ,
      ageRange: constructMiniSegmentData.ageRange ,
      image_id: constructMiniSegmentData.image_id ,
      imageFileName: constructMiniSegmentData.imageFileName ,
      owner_id: constructMiniSegmentData.owner_id ,
      group_id: constructMiniSegmentData.group_id ,
      groupName: constructMiniSegmentData.groupName ,
      keepPrivate: constructMiniSegmentData.keepPrivate ,
      approvedForPublicUse: constructMiniSegmentData.approvedForPublicUse ,
      constructMiniSegment: constructMiniSegmentData.constructMiniSegment ,
      markDeleted: constructMiniSegmentData.markDeleted ,
      createDate:  constructMiniSegmentData.createDate,
      updatedBy: constructMiniSegmentData.updatedBy ,
      updateDate:  constructMiniSegmentData.updateDate,
    };

    let result = await ConstructMiniSegment.replaceOne({_id: constructMiniSegmentData._id},updatedConstructMiniSegmentData);
    let newUsageLogData = {   
      userId: req.profile._id ,
      activity:  "Update" ,
      type: "Component" ,
      subType:"MiniSegment" ,
      object_id: constructMiniSegmentData._id ,
      description:  "Update MiniSegment Record" ,
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
      subType:"MiniSegment" ,
      object_id: "",
      description:  "Update new MiniSegment Record" ,
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
  console.log("ConstructMiniSegment.controller - listByCriteria - Start");
  //for (const key in req.query) {
  //  console.log("req.query - ", key, req.query[key]);
  //}
  const findQuery = createQueryObject(req.query);
  //const userId = req.query.userId;
  try {
    let listOfMiniSegments = await ConstructMiniSegment.find(findQuery).select("topic description owner_id group_id markDeleted _id");
    res.json(listOfMiniSegments);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "listByCriteria" ,
      type: "Component" ,
      subType:"MiniSegment" ,
      object_id: "",
      description:  "listByCriteria MiniSegment Records" ,
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

const constructMiniSegmentById = async (req, res, next, id) => {
  console.log("ConstructMiniSegment.controller - constructMiniSegmentById - Start");
  try {
    let constructMiniSegment = await ConstructMiniSegment.findById(id);
    if (!constructMiniSegment)
      return res.status("400").json({
        error: "ConstructMiniSegment not found",
      });
    req.constructMiniSegment = constructMiniSegment;
    next();
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "constructMiniSegmentById" ,
      type: "Component" ,
      subType:"MiniSegment" ,
      object_id: "",
      description:  "get constructMiniSegmentById MiniSegment Record" ,
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
  console.log("ConstructMiniSegment.controller - readById - Start");
  const id = req.query.id;
  try {
    let constructMiniSegment = await ConstructMiniSegment.findOne({_id: id});
    return res.json(constructMiniSegment);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "readById" ,
      type: "Component" ,
      subType:"MiniSegment" ,
      object_id: "",
      description:  "get readById MiniSegment Record" ,
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
  req.constructMiniSegment.image = undefined;
  return res.json(req.constructMiniSegment);
};

const list = async (req, res) => {
  try {
    let constructMiniSegments = await ConstructMiniSegment.find();
    res.json(constructMiniSegments);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const newUserWithAccess = async (req, res) => {
  try {
    let usersWithAccess = req.body.usersWithAccess;
    let result = await ConstructMiniSegment.findByIdAndUpdate(
      req.constructMiniSegment._id,
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
    let constructMiniSegment = req.constructMiniSegment;
    let deleteConstructMiniSegment = await constructMiniSegment.remove();
    res.json(deleteConstructMiniSegment);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const isOwner = (req, res, next) => {
  const isOwner =
    req.constructMiniSegment &&
    req.auth &&
    req.constructMiniSegment.owner._id == req.auth._id;
  if (!isOwner) {
    return res.status("403").json({
      error: "User is not the Owner",
    });
  }
  next();
};

const listByOwner = async (req, res) => {
  console.log("ConstructMiniSegment.controller - listByOwner - Start");
  try {
    let constructMiniSegments = await ConstructMiniSegment.find({
      owner_id: req.params.userId,
    });

    res.json(constructMiniSegments);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "listByOwner" ,
      type: "Component" ,
      subType:"MiniSegment" ,
      object_id: "",
      description:  "listByOwner MiniSegment Record" ,
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

const getCurrentConstructByMaxUpdateDateAndUserId = async (req, res) => {
  console.log("ConstructMiniSegment.controller - getCurrentConstructByMaxUpdateDateAndUserId - Start");
  try {
    let currentConstructMiniSegment = await ConstructMiniSegment.findOne({
      owner_id: req.params.userId,
    }).sort({ updateDate: -1 });
    res.json(currentConstructMiniSegment);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "getCurrentConstructByMaxUpdateDateAndUserId" ,
      type: "Component" ,
      subType:"MiniSegment" ,
      object_id: "",
      description:  "getCurrentConstructByMaxUpdateDateAndUserId MiniSegment Record" ,
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
  ConstructMiniSegment.find(
    { approvedPublic: true },
    (err, constructMiniSegments) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err),
        });
      }
      res.json(constructMiniSegments);
    }
  );
};

const photo = (req, res, next) => {
  if (req.constructMiniSegment.image.data) {
    res.set("Content-Type", req.constructMiniSegment.image.contentType);
    return res.send(req.constructMiniSegment.image.data);
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
  constructMiniSegmentById,
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



