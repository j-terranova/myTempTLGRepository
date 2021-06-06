import FrameworkTrivia from "../models/frameworkTrivia.model";
import fs from "fs";

import errorHandler from "./../helpers/dbErrorHandler";
import createUsageLogEntry from "./../helpers/usageLogHandler";
import createErrorLogEntry from "./../helpers/errorLogHandler";
import defaultImage from "./../../client/assets/images/default.png";

//const path = require("path");
//const rootPath = path.normalize(__dirname + "/../../");

const create = async (req, res) => {
  console.log("FrameworkTrivia.controller - Create - Start");
  try {
    const frameworkTriviaData = new FrameworkTrivia(req.body)  
    let result = await frameworkTriviaData.save()
    
    let newUsageLogData = {   
      userId: req.profile._id ,
      activity:  "Create" ,
      type: "Framework" ,
      subType:"Trivia" ,
      object_id: frameworkTriviaData._id ,
      description:  "Create new Trivia Record" ,
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
      subType:"Trivia" ,
      object_id: "",
      description:  "Create new Trivia Record",
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
  console.log("FrameworkTrivia.controller - Update - Start");
  try {
    const frameworkTriviaData = FrameworkTrivia(req.body)
    let updatedFrameworkTriviaData = {   
      topic: frameworkTriviaData.topic ,
      description:  frameworkTriviaData.description ,
      myClass: frameworkTriviaData.myClass ,
      category:frameworkTriviaData.category ,
      subject: frameworkTriviaData.subject ,
      type: frameworkTriviaData.type ,
      subType: frameworkTriviaData.subType ,
      difficultyLevel: frameworkTriviaData.difficultyLevel ,
      ageRange: frameworkTriviaData.ageRange ,
      image_id: frameworkTriviaData.image_id ,
      imageFileName: frameworkTriviaData.imageFileName ,
      owner_id: frameworkTriviaData.owner_id ,
      group_id: frameworkTriviaData.group_id ,
      groupName: frameworkTriviaData.groupName ,
      keepPrivate: frameworkTriviaData.keepPrivate ,
      approvedForPublicUse: frameworkTriviaData.approvedForPublicUse ,
      frameworkLayoutFormat: frameworkTriviaData.frameworkLayoutFormat,
      frameworkResponseFormat: frameworkTriviaData.frameworkResponseFormat,
      frameworkPresentationMethod: frameworkTriviaData.frameworkPresentationMethod,
      frameworkSolutionMethod: frameworkTriviaData.frameworkSolutionMethod,
      frameworkIncludeSpeech: frameworkTriviaData.frameworkIncludeSpeech,
      frameworkIncludeTimer: frameworkTriviaData.frameworkIncludeTimer,
      frameworkIncludeScoring: frameworkTriviaData.frameworkIncludeScoring,
      frameworkColor: frameworkTriviaData.frameworkColor,
      includeConstructs: frameworkTriviaData.includeConstructs ,
      markDeleted: frameworkTriviaData.markDeleted ,
      createDate:  Date.now(),
      updatedBy: frameworkTriviaData.updatedBy ,
      updateDate:  Date.now(),
    };

    let result = await FrameworkTrivia.replaceOne({_id: frameworkTriviaData._id},updatedFrameworkTriviaData)
    let newUsageLogData = {   
      userId: req.profile._id ,
      activity:  "Update" ,
      type: "Framework" ,
      subType:"Trivia" ,
      object_id: frameworkTriviaData._id ,
      description:  "Update Trivia Record" ,
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
      subType:"Trivia" ,
      object_id: "",
      description:  "Update Trivia Record",
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
  console.log("FrameworkTrivia.controller - listByCriteria - Start");
  //for (const key in req.query) {
  //  console.log("req.query - ", key, req.query[key]);
  //}
  const findQuery = createQueryObject(req.query);
  try {

    //let listOfTrivia = await FrameworkTrivia.find(findQuery).select("topic description owner_id group_id frameworkLayoutFormat frameworkResponseFormat frameworkPresentationMethod frameworkSolutionMethod _id");
    let listOfTrivia = await FrameworkTrivia.find(findQuery).select("topic description subType difficultyLevel _id owner_id group_id frameworkLayoutFormat frameworkResponseFormat frameworkPresentationMethod markDeleted _id");
    res.json(listOfTrivia);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "listByCriteria" ,
      type: "Framework" ,
      subType:"Trivia" ,
      object_id: "",
      description:  "listByCriteria Trivia Records",
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

const frameworkTriviaById = async (req, res, next, id) => {
  console.log("FrameworkTrivia.controller - frameworkTriviaById - Start");
  try {
    let frameworkTrivia = await FrameworkTrivia.findById(id);
    if (!frameworkTrivia)
      return res.status("400").json({
        error: "frameworkTrivia not found",
      });
    req.frameworkTrivia = frameworkTrivia;
    next();
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "frameworkTriviaById" ,
      type: "Framework" ,
      subType:"Trivia" ,
      object_id: "",
      description:  "frameworkTriviaById Trivia Records",
      email: req.profile.email ,
      errorCode: err,
      errorMessage: errorHandler.getErrorMessage(err),
      serverOrClient: "Server",
      dateTimeStamp: Date.now() ,
    };
    createErrorLogEntry(newErrorLogData);
    return res.status("400").json({
      error: "Could not retrieve frameworkTrivia",
    });
  }
};

const readById = async (req, res) => {
  console.log("frameworkTrivia.controller - readById - Start");
  const id = req.query.id;
  try {
    let frameworkTrivia = await FrameworkTrivia.findOne({_id: id});
    if (!frameworkTrivia)
      return res.status("400").json({
        error: "FrameworkTrivia not found",
      });
      return res.json(frameworkTrivia);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "readById" ,
      type: "Framework" ,
      subType:"Trivia" ,
      object_id: "",
      description:  "readById Trivia Records",
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
  console.log("frameworkTrivia.controller - listByDifficultyLevelRange - Start");
  console.log("frameworkTrivia.controller - listByDifficultyLevelRange - req.query = ",req.query);
  console.log("frameworkTrivia.controller - listByDifficultyLevelRange - req.params = ",req.params);
  const minDifficultyLevel = parseInt(req.query.minDifficultyLevel);
  const maxDifficultyLevel = parseInt(req.query.maxDifficultyLevel);
  const subType = req.query.subType;
  console.log("frameworkTiframeworkTriviacTacToe.controller - listByDifficultyLevelRange - minDifficultyLevel = ",minDifficultyLevel);
  console.log("frameworkTrivia.controller - listByDifficultyLevelRange - maxDifficultyLevel = ",maxDifficultyLevel);
  try {
    let frameworkTrivia = await FrameworkTrivia.aggregate([
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
    if (!frameworkTrivia)
      return res.status("400").json({
        error: "FrameworkTrivia not found",
      });
      return res.json(frameworkTrivia);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "listByDifficultyLevelRange" ,
      type: "Framework" ,
      subType:"Trivia" ,
      object_id: "",
      description:  "listByDifficultyLevelRange Trivia Records",
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
  req.frameworkTrivia.image = undefined;
  return res.json(req.frameworkTrivia);
};

const list = async (req, res) => {
  try {
    let frameworkTrivias = await FrameworkTrivia.find();
    res.json(frameworkTrivias);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const newUserWithAccess = async (req, res) => {
  try {
    let usersWithAccess = req.body.usersWithAccess;
    let result = await FrameworkTrivia.findByIdAndUpdate(
      req.frameworkTrivia._id,
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
    let frameworkTrivia = req.frameworkTrivia;
    let deleteFrameworkTrivia = await frameworkTrivia.remove();
    res.json(deleteFrameworkTrivia);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const isOwner = (req, res, next) => {
  const isOwner =
    req.frameworkTrivia &&
    req.auth &&
    req.frameworkTrivia.owner._id == req.auth._id;
  if (!isOwner) {
    return res.status("403").json({
      error: "User is not the Owner",
    });
  }
  next();
};

const listByOwner = async (req, res) => {
  console.log("FrameworkTrivia.controller - listByOwner -Start");
  try {
    let frameworkTrivias = await FrameworkTrivia.find({
      owner_id: req.params.userId,
    });
    res.json(frameworkTrivias);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "listByOwner" ,
      type: "Framework" ,
      subType:"Trivia" ,
      object_id: "",
      description:  "listByOwner Trivia Records",
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
  console.log("FrameworkTrivia.controller - getCurrentFrameworkByMaxUpdateDateAndUserId - Start");
  try {
    let currentFrameworkTrivia = await FrameworkTrivia.findOne({
      owner_id: req.params.userId,
    }).sort({ updateDate: -1 });

    res.json(currentFrameworkTrivia);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "getCurrentFrameworkByMaxUpdateDateAndUserId" ,
      type: "Framework" ,
      subType:"Trivia" ,
      object_id: "",
      description:  "getCurrentFrameworkByMaxUpdateDateAndUserId Trivia Record",
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
  FrameworkTrivia.find(
    { approvedPublic: true },
    (err, frameworkTrivias) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err),
        });
      }
      res.json(frameworkTrivias);
    }
  );
};

const photo = (req, res, next) => {
  if (req.frameworkTrivia.image.data) {
    res.set("Content-Type", req.frameworkTrivia.image.contentType);
    return res.send(req.frameworkTrivia.image.data);
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
  frameworkTriviaById,
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




