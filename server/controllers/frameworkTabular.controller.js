import FrameworkTabular from "../models/frameworkTabular.model";
import fs from "fs";

import errorHandler from "./../helpers/dbErrorHandler";
import createUsageLogEntry from "./../helpers/usageLogHandler";
import createErrorLogEntry from "./../helpers/errorLogHandler";
import defaultImage from "./../../client/assets/images/default.png";

//const path = require("path");
//const rootPath = path.normalize(__dirname + "/../../");

const create = async (req, res) => {
  console.log("FrameworkTabular.controller - Create - Start");
  try {
    const frameworkTabularData = new FrameworkTabular(req.body)  
    let result = await frameworkTabularData.save()
    
    let newUsageLogData = {   
      userId: req.profile._id ,
      activity:  "Create" ,
      type: "Framework" ,
      subType:"Tabular" ,
      object_id: frameworkTabularData._id ,
      description:  "Create new Tabular Record" ,
      email: req.profile.email ,
      dateTimeStamp: Date.now() ,
    };
    createUsageLogEntry(newUsageLogData);

    res.json(result)
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "Create" ,
      type: "Framework" ,
      subType:"Tabular" ,
      object_id: "",
      description:  "Create new Tabular Record",
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
  console.log("FrameworkTabular.controller - Update - Start");
  try {
    const frameworkTabularData = FrameworkTabular(req.body)
    let updatedFrameworkTabularData = {   
      topic: frameworkTabularData.topic ,
      description:  frameworkTabularData.description ,
      myClass: frameworkTabularData.myClass ,
      category:frameworkTabularData.category ,
      subject: frameworkTabularData.subject ,
      type: frameworkTabularData.type ,
      subType: frameworkTabularData.subType ,
      difficultyLevel: frameworkTabularData.difficultyLevel ,
      ageRange: frameworkTabularData.ageRange ,
      image_id: frameworkTabularData.image_id ,
      imageFileName: frameworkTabularData.imageFileName ,
      owner_id: frameworkTabularData.owner_id ,
      group_id: frameworkTabularData.group_id ,
      groupName: frameworkTabularData.groupName ,
      keepPrivate: frameworkTabularData.keepPrivate ,
      approvedForPublicUse: frameworkTabularData.approvedForPublicUse ,
      frameworkLayoutFormat: frameworkTabularData.frameworkLayoutFormat,
      frameworkResponseFormat: frameworkTabularData.frameworkResponseFormat,
      frameworkPresentationMethod: frameworkTabularData.frameworkPresentationMethod,
      frameworkSolutionMethod: frameworkTabularData.frameworkSolutionMethod,
      frameworkIncludeSpeech: frameworkTabularData.frameworkIncludeSpeech,
      frameworkIncludeTimer: frameworkTabularData.frameworkIncludeTimer,
      frameworkIncludeScoring: frameworkTabularData.frameworkIncludeScoring,
      frameworkColor: frameworkTabularData.frameworkColor,
      includeConstructs: frameworkTabularData.includeConstructs ,
      markDeleted: frameworkTabularData.markDeleted ,
      createDate:  Date.now(),
      updatedBy: frameworkTabularData.updatedBy ,
      updateDate:  Date.now(),
    };

    let result = await FrameworkTabular.replaceOne({_id: frameworkTabularData._id},updatedFrameworkTabularData)
    let newUsageLogData = {   
      userId: req.profile._id ,
      activity:  "Update" ,
      type: "Framework" ,
      subType:"Tabular" ,
      object_id: frameworkTabularData._id ,
      description:  "Update Tabular Record" ,
      email: req.profile.email ,
      dateTimeStamp: Date.now() ,
    };
    createUsageLogEntry(newUsageLogData);
    res.json(result)
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "Update" ,
      type: "Framework" ,
      subType:"Tabular" ,
      object_id: "",
      description:  "Update Tabular Record",
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
  console.log("FrameworkTabular.controller - listByCriteria - Start");
  //for (const key in req.query) {
  //  console.log("req.query - ", key, req.query[key]);
  //}
  const findQuery = createQueryObject(req.query);
  try {

    //let listOfTabular = await FrameworkTabular.find(findQuery).select("topic description owner_id group_id frameworkLayoutFormat frameworkResponseFormat frameworkPresentationMethod frameworkSolutionMethod _id");
    let listOfTabular = await FrameworkTabular.find(findQuery).select("topic description subType difficultyLevel _id owner_id group_id frameworkLayoutFormat frameworkResponseFormat frameworkPresentationMethod markDeleted _id");
    res.json(listOfTabular);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "listByCriteria" ,
      type: "Framework" ,
      subType:"Tabular" ,
      object_id: "",
      description:  "listByCriteria Tabular Records",
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

const frameworkTabularById = async (req, res, next, id) => {
  console.log("FrameworkTabular.controller - frameworkTabularById - Start");
  try {
    let frameworkTabular = await FrameworkTabular.findById(id);
    if (!frameworkTabular)
      return res.status("400").json({
        error: "frameworkTabular not found",
      });
    req.frameworkTabular = frameworkTabular;
    next();
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "frameworkTabularById" ,
      type: "Framework" ,
      subType:"Tabular" ,
      object_id: "",
      description:  "frameworkTabularById Tabular Records",
      email: req.profile.email ,
      errorCode: err,
      errorMessage: errorHandler.getErrorMessage(err),
      serverOrClient: "Server",
      dateTimeStamp: Date.now() ,
    };
    createErrorLogEntry(newErrorLogData);
    return res.status("400").json({
      error: "Could not retrieve frameworkTabular",
    });
  }
};

const readById = async (req, res) => {
  console.log("frameworkTabular.controller - readById - Start");
  const id = req.query.id;
  try {
    let frameworkTabular = await FrameworkTabular.findOne({_id: id});
    if (!frameworkTabular)
      return res.status("400").json({
        error: "FrameworkTabular not found",
      });
      return res.json(frameworkTabular);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "readById" ,
      type: "Framework" ,
      subType:"Tabular" ,
      object_id: "",
      description:  "readById Tabular Records",
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


const listByDifficultyLevelRange = async (req, res) => {
  console.log("frameworkTabular.controller - listByDifficultyLevelRange - Start");
  console.log("frameworkTabular.controller - listByDifficultyLevelRange - req.query = ",req.query);
  console.log("frameworkTabular.controller - listByDifficultyLevelRange - req.params = ",req.params);
  const minDifficultyLevel = parseInt(req.query.minDifficultyLevel);
  const maxDifficultyLevel = parseInt(req.query.maxDifficultyLevel);
  const subType = req.query.subType;
  console.log("frameworkTabular.controller - listByDifficultyLevelRange - minDifficultyLevel = ",minDifficultyLevel);
  console.log("frameworkTabular.controller - listByDifficultyLevelRange - maxDifficultyLevel = ",maxDifficultyLevel);
  try {
    let frameworkTabular = await FrameworkTabular.aggregate([
      { $match: { subType: { $eq: subType }} },
      { $match: { difficultyLevel: { $gte: minDifficultyLevel, $lte: maxDifficultyLevel} } },
      {
      $project: {
          topic: 1,
          description: 1,
          subType: 1,
          _id: 1,
          difficultyLevel: { $range: [ minDifficultyLevel, maxDifficultyLevel, 1 ] },
        }
      }])
    if (!frameworkTabular)
      return res.status("400").json({
        error: "FrameworkTabular not found",
      });
      return res.json(frameworkTabular);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "listByDifficultyLevelRange" ,
      type: "Framework" ,
      subType:"Tabular" ,
      object_id: "",
      description:  "listByDifficultyLevelRange Tabular Records",
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

const readAll = (req, res) => {
  req.frameworkTabular.image = undefined;
  return res.json(req.frameworkTabular);
};

const list = async (req, res) => {
  try {
    let frameworkTabulars = await FrameworkTabular.find();
    res.json(frameworkTabulars);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const newUserWithAccess = async (req, res) => {
  try {
    let usersWithAccess = req.body.usersWithAccess;
    let result = await FrameworkTabular.findByIdAndUpdate(
      req.frameworkTabular._id,
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
    let frameworkTabular = req.frameworkTabular;
    let deleteFrameworkTabular = await frameworkTabular.remove();
    res.json(deleteFrameworkTabular);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const isOwner = (req, res, next) => {
  const isOwner =
    req.frameworkTabular &&
    req.auth &&
    req.frameworkTabular.owner._id == req.auth._id;
  if (!isOwner) {
    return res.status("403").json({
      error: "User is not the Owner",
    });
  }
  next();
};

const listByOwner = async (req, res) => {
  console.log("FrameworkTabular.controller - listByOwner -Start");
  try {
    let frameworkTabulars = await FrameworkTabular.find({
      owner_id: req.params.userId,
    });
    res.json(frameworkTabulars);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "listByOwner" ,
      type: "Framework" ,
      subType:"Tabular" ,
      object_id: "",
      description:  "listByOwner Tabular Records",
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

const getCurrentFrameworkByMaxUpdateDateAndUserId = async (req,res) => {
  console.log("FrameworkTabular.controller - getCurrentFrameworkByMaxUpdateDateAndUserId - Start");
  try {
    let currentFrameworkTabular = await FrameworkTabular.findOne({
      owner_id: req.params.userId,
    }).sort({ updateDate: -1 });

    res.json(currentFrameworkTabular);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "getCurrentFrameworkByMaxUpdateDateAndUserId" ,
      type: "Framework" ,
      subType:"Tabular" ,
      object_id: "",
      description:  "getCurrentFrameworkByMaxUpdateDateAndUserId Tabular Record",
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
  FrameworkTabular.find(
    { approvedPublic: true },
    (err, frameworkTabulars) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err),
        });
      }
      res.json(frameworkTabulars);
    }
  );
};

const photo = (req, res, next) => {
  if (req.frameworkTabular.image.data) {
    res.set("Content-Type", req.frameworkTabular.image.contentType);
    return res.send(req.frameworkTabular.image.data);
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
  frameworkTabularById,
  readById,
  listByDifficultyLevelRange,
  readAll,
  list,
  getCurrentFrameworkByMaxUpdateDateAndUserId,
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




