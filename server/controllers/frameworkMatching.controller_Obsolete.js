import FrameworkLesson from "../models/frameworkLesson.model";
import fs from "fs";

import errorHandler from "./../helpers/dbErrorHandler";
import createUsageLogEntry from "./../helpers/usageLogHandler";
import createErrorLogEntry from "./../helpers/errorLogHandler";
import defaultImage from "./../../client/assets/images/default.png";

//const path = require("path");
//const rootPath = path.normalize(__dirname + "/../../");

const create = async (req, res) => {
  console.log("FrameworkMatching.controller - Create - Start");
  try {
    const frameworkMatchingData = new FrameworkLesson(req.body)  
    let result = await frameworkMatchingData.save()
    
    let newUsageLogData = {   
      userId: req.profile._id ,
      activity:  "Create" ,
      type: "Framework" ,
      subType:"Matching" ,
      object_id: frameworkMatchingData._id ,
      description:  "Create new Matching Record" ,
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
      subType:"Matching" ,
      object_id: "",
      description:  "Create new Matching Record",
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
  console.log("FrameworkMatching.controller - Update - Start");
  try {
    const frameworkMatchingData = FrameworkLesson(req.body)
    let updatedFrameworkMatchingData = {   
      topic: frameworkMatchingData.topic ,
      description:  frameworkMatchingData.description ,
      myClass: frameworkMatchingData.myClass ,
      category:frameworkMatchingData.category ,
      subject: frameworkMatchingData.subject ,
      type: frameworkMatchingData.type ,
      subType: frameworkMatchingData.subType ,
      difficultyLevel: frameworkMatchingData.difficultyLevel ,
      ageRange: frameworkMatchingData.ageRange ,
      image_id: frameworkMatchingData.image_id ,
      imageFileName: frameworkMatchingData.imageFileName ,
      owner_id: frameworkMatchingData.owner_id ,
      group_id: frameworkMatchingData.group_id ,
      groupName: frameworkMatchingData.groupName ,
      keepPrivate: frameworkMatchingData.keepPrivate ,
      approvedForPublicUse: frameworkMatchingData.approvedForPublicUse ,
      frameworkLayoutFormat: frameworkMatchingData.frameworkLayoutFormat,
      frameworkResponseFormat: frameworkMatchingData.frameworkResponseFormat,
      frameworkPresentationMethod: frameworkMatchingData.frameworkPresentationMethod,
      frameworkSolutionMethod: frameworkMatchingData.frameworkSolutionMethod,
      frameworkIncludeSpeech: frameworkMatchingData.frameworkIncludeSpeech,
      frameworkIncludeTimer: frameworkMatchingData.frameworkIncludeTimer,
      frameworkIncludeScoring: frameworkMatchingData.frameworkIncludeScoring,
      frameworkColor: frameworkMatchingData.frameworkColor,
      includeConstructs: frameworkMatchingData.includeConstructs ,
      markDeleted: frameworkMatchingData.markDeleted ,
      createDate:  Date.now(),
      updatedBy: frameworkMatchingData.updatedBy ,
      updateDate:  Date.now(),
    };

    let result = await FrameworkLesson.replaceOne({_id: frameworkMatchingData._id},updatedFrameworkMatchingData)
    let newUsageLogData = {   
      userId: req.profile._id ,
      activity:  "Update" ,
      type: "Framework" ,
      subType:"Matching" ,
      object_id: frameworkMatchingData._id ,
      description:  "Update Matching Record" ,
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
      subType:"Matching" ,
      object_id: "",
      description:  "Update Matching Record",
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
  console.log("FrameworkMatching.controller - listByCriteria - Start");
  //for (const key in req.query) {
  //  console.log("req.query - ", key, req.query[key]);
  //}
  const findQuery = createQueryObject(req.query);
  try {

    //let listOfMatching = await FrameworkLesson.find(findQuery).select("topic description owner_id group_id frameworkLayoutFormat frameworkResponseFormat frameworkPresentationMethod frameworkSolutionMethod _id");
    let listOfMatching = await FrameworkLesson.find(findQuery).select("topic description subType difficultyLevel _id");
    res.json(listOfMatching);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "listByCriteria" ,
      type: "Framework" ,
      subType:"Matching" ,
      object_id: "",
      description:  "listByCriteria Matching Records",
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

const frameworkMatchingById = async (req, res, next, id) => {
  console.log("FrameworkMatching.controller - frameworkMatchingById - Start");
  try {
    let frameworkMatching = await FrameworkLesson.findById(id);
    if (!frameworkMatching)
      return res.status("400").json({
        error: "frameworkMatching not found",
      });
    req.frameworkMatching = frameworkMatching;
    next();
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "frameworkMatchingById" ,
      type: "Framework" ,
      subType:"Matching" ,
      object_id: "",
      description:  "frameworkMatchingById Matching Records",
      email: req.profile.email ,
      errorCode: err,
      errorMessage: errorHandler.getErrorMessage(err),
      serverOrClient: "Server",
      dateTimeStamp: Date.now() ,
    };
    createErrorLogEntry(newErrorLogData);
    return res.status("400").json({
      error: "Could not retrieve frameworkMatching",
    });
  }
};

const readById = async (req, res) => {
  console.log("frameworkMatching.controller - readById - Start");
  const id = req.query.id;
  try {
    let frameworkMatching = await FrameworkLesson.findOne({_id: id});
    if (!frameworkMatching)
      return res.status("400").json({
        error: "FrameworkMatching not found",
      });
      return res.json(frameworkMatching);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "readById" ,
      type: "Framework" ,
      subType:"Matching" ,
      object_id: "",
      description:  "readById Matching Records",
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
  console.log("frameworkMatching.controller - listByDifficultyLevelRange - Start");
  console.log("frameworkMatching.controller - listByDifficultyLevelRange - req.query = ",req.query);
  console.log("frameworkMatching.controller - listByDifficultyLevelRange - req.params = ",req.params);
  const minDifficultyLevel = parseInt(req.query.minDifficultyLevel);
  const maxDifficultyLevel = parseInt(req.query.maxDifficultyLevel);
  const frameworkLayoutFormat = req.query.frameworkLayoutFormat;
  const frameworkResponseFormat = req.query.frameworkResponseFormat;
  console.log("frameworkMatching.controller - listByDifficultyLevelRange - minDifficultyLevel = ",minDifficultyLevel);
  console.log("frameworkMatching.controller - listByDifficultyLevelRange - maxDifficultyLevel = ",maxDifficultyLevel);
  // example: { $match: { $or: [ { score: { $gt: 70, $lt: 90 } }, { views: { $gte: 1000 } } ] } },
 
  //{ difficultyLevel: { $gt: minDifficultyLevel, $lt: maxDifficultyLevel} } ] },
 try {
    let frameworkMatching = await FrameworkLesson.aggregate([
      { $match: { frameworkLayoutFormat: { $eq: frameworkLayoutFormat }} },
      { $match: { frameworkResponseFormat: {$eq:  frameworkResponseFormat }} },
      { $match: { difficultyLevel: { $gte: minDifficultyLevel, $lte: maxDifficultyLevel} } },
      {$project: {
          topic: 1,
          description: 1,
          subType: 1,
          _id: 1,
          difficultyLevel: 1 }
        }
      ])
    if (!frameworkMatching)
      return res.status("400").json({
        error: "FrameworkMatching not found",
      });
      return res.json(frameworkMatching);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "listByDifficultyLevelRange" ,
      type: "Framework" ,
      subType:"Matching" ,
      object_id: "",
      description:  "listByDifficultyLevelRange Matching Records",
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
  req.frameworkMatching.image = undefined;
  return res.json(req.frameworkMatching);
};

const list = async (req, res) => {
  try {
    let frameworkMatchings = await FrameworkLesson.find();
    res.json(frameworkMatchings);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const newUserWithAccess = async (req, res) => {
  try {
    let usersWithAccess = req.body.usersWithAccess;
    let result = await FrameworkLesson.findByIdAndUpdate(
      req.frameworkMatching._id,
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
    let frameworkMatching = req.frameworkMatching;
    let deleteFrameworkMatching = await frameworkMatching.remove();
    res.json(deleteFrameworkMatching);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const isOwner = (req, res, next) => {
  const isOwner =
    req.frameworkMatching &&
    req.auth &&
    req.frameworkMatching.owner._id == req.auth._id;
  if (!isOwner) {
    return res.status("403").json({
      error: "User is not the Owner",
    });
  }
  next();
};

const listByOwner = async (req, res) => {
  console.log("FrameworkMatching.controller - listByOwner -Start");
  try {
    let frameworkMatchings = await FrameworkLesson.find({
      owner_id: req.params.userId,
    });
    res.json(frameworkMatchings);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "listByOwner" ,
      type: "Framework" ,
      subType:"Matching" ,
      object_id: "",
      description:  "listByOwner Matching Records",
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
  console.log("FrameworkMatching.controller - getCurrentFrameworkByMaxUpdateDateAndUserId - Start");
  try {
    let currentFrameworkMatching = await FrameworkLesson.findOne({
      owner_id: req.params.userId,
    }).sort({ updateDate: -1 });

    res.json(currentFrameworkMatching);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "getCurrentFrameworkByMaxUpdateDateAndUserId" ,
      type: "Framework" ,
      subType:"Matching" ,
      object_id: "",
      description:  "getCurrentFrameworkByMaxUpdateDateAndUserId Matching Record",
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
  FrameworkLesson.find(
    { approvedPublic: true },
    (err, frameworkMatchings) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err),
        });
      }
      res.json(frameworkMatchings);
    }
  );
};

const photo = (req, res, next) => {
  if (req.frameworkMatching.image.data) {
    res.set("Content-Type", req.frameworkMatching.image.contentType);
    return res.send(req.frameworkMatching.image.data);
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
  frameworkMatchingById,
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




