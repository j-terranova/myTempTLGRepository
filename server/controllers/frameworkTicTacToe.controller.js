import FrameworkTicTacToe from "../models/frameworkTicTacToe.model";
import fs from "fs";

import errorHandler from "./../helpers/dbErrorHandler";
import createUsageLogEntry from "./../helpers/usageLogHandler";
import createErrorLogEntry from "./../helpers/errorLogHandler";
import defaultImage from "./../../client/assets/images/default.png";

//const path = require("path");
//const rootPath = path.normalize(__dirname + "/../../");

const create = async (req, res) => {
  console.log("FrameworkTicTacToe.controller - Create - Start");
  try {
    const frameworkTicTacToeData = new FrameworkTicTacToe(req.body)  
    let result = await frameworkTicTacToeData.save()
    
    let newUsageLogData = {   
      userId: req.profile._id ,
      activity:  "Create" ,
      type: "Framework" ,
      subType:"TicTacToe" ,
      object_id: frameworkTicTacToeData._id ,
      description:  "Create new TicTacToe Record" ,
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
      subType:"TicTacToe" ,
      object_id: "",
      description:  "Create new TicTacToe Record",
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
  console.log("FrameworkTicTacToe.controller - Update - Start");
  try {
    const frameworkTicTacToeData = FrameworkTicTacToe(req.body)
    let updatedFrameworkTicTacToeData = {   
      topic: frameworkTicTacToeData.topic ,
      description:  frameworkTicTacToeData.description ,
      myClass: frameworkTicTacToeData.myClass ,
      category:frameworkTicTacToeData.category ,
      subject: frameworkTicTacToeData.subject ,
      type: frameworkTicTacToeData.type ,
      subType: frameworkTicTacToeData.subType ,
      difficultyLevel: frameworkTicTacToeData.difficultyLevel ,
      ageRange: frameworkTicTacToeData.ageRange ,
      image_id: frameworkTicTacToeData.image_id ,
      imageFileName: frameworkTicTacToeData.imageFileName ,
      owner_id: frameworkTicTacToeData.owner_id ,
      group_id: frameworkTicTacToeData.group_id ,
      groupName: frameworkTicTacToeData.groupName ,
      keepPrivate: frameworkTicTacToeData.keepPrivate ,
      approvedForPublicUse: frameworkTicTacToeData.approvedForPublicUse ,
      frameworkLayoutFormat: frameworkTicTacToeData.frameworkLayoutFormat,
      frameworkResponseFormat: frameworkTicTacToeData.frameworkResponseFormat,
      frameworkPresentationMethod: frameworkTicTacToeData.frameworkPresentationMethod,
      frameworkSolutionMethod: frameworkTicTacToeData.frameworkSolutionMethod,
      frameworkIncludeSpeech: frameworkTicTacToeData.frameworkIncludeSpeech,
      frameworkIncludeTimer: frameworkTicTacToeData.frameworkIncludeTimer,
      frameworkIncludeScoring: frameworkTicTacToeData.frameworkIncludeScoring,
      frameworkColor: frameworkTicTacToeData.frameworkColor,
      includeConstructs: frameworkTicTacToeData.includeConstructs ,
      markDeleted: frameworkTicTacToeData.markDeleted ,
      createDate:  Date.now(),
      updatedBy: frameworkTicTacToeData.updatedBy ,
      updateDate:  Date.now(),
    };

    let result = await FrameworkTicTacToe.replaceOne({_id: frameworkTicTacToeData._id},updatedFrameworkTicTacToeData)
    let newUsageLogData = {   
      userId: req.profile._id ,
      activity:  "Update" ,
      type: "Framework" ,
      subType:"TicTacToe" ,
      object_id: frameworkTicTacToeData._id ,
      description:  "Update TicTacToe Record" ,
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
      subType:"TicTacToe" ,
      object_id: "",
      description:  "Update TicTacToe Record",
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
  console.log("FrameworkTicTacToe.controller - listByCriteria - Start");
  //for (const key in req.query) {
  //  console.log("req.query - ", key, req.query[key]);
  //}
  const findQuery = createQueryObject(req.query);
  try {

    //let listOfTicTacToe = await FrameworkTicTacToe.find(findQuery).select("topic description owner_id group_id frameworkLayoutFormat frameworkResponseFormat frameworkPresentationMethod frameworkSolutionMethod _id");
    let listOfTicTacToe = await FrameworkTicTacToe.find(findQuery).select("topic description subType difficultyLevel _id owner_id group_id frameworkLayoutFormat frameworkResponseFormat frameworkPresentationMethod markDeleted _id");
    res.json(listOfTicTacToe);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "listByCriteria" ,
      type: "Framework" ,
      subType:"TicTacToe" ,
      object_id: "",
      description:  "listByCriteria TicTacToe Records",
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

const frameworkTicTacToeById = async (req, res, next, id) => {
  console.log("FrameworkTicTacToe.controller - frameworkTicTacToeById - Start");
  try {
    let frameworkTicTacToe = await FrameworkTicTacToe.findById(id);
    if (!frameworkTicTacToe)
      return res.status("400").json({
        error: "frameworkTicTacToe not found",
      });
    req.frameworkTicTacToe = frameworkTicTacToe;
    next();
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "frameworkTicTacToeById" ,
      type: "Framework" ,
      subType:"TicTacToe" ,
      object_id: "",
      description:  "frameworkTicTacToeById TicTacToe Records",
      email: req.profile.email ,
      errorCode: err,
      errorMessage: errorHandler.getErrorMessage(err),
      serverOrClient: "Server",
      dateTimeStamp: Date.now() ,
    };
    createErrorLogEntry(newErrorLogData);
    return res.status("400").json({
      error: "Could not retrieve frameworkTicTacToe",
    });
  }
};

const readById = async (req, res) => {
  console.log("frameworkTicTacToe.controller - readById - Start");
  const id = req.query.id;
  try {
    let frameworkTicTacToe = await FrameworkTicTacToe.findOne({_id: id});
    if (!frameworkTicTacToe)
      return res.status("400").json({
        error: "FrameworkTicTacToe not found",
      });
      return res.json(frameworkTicTacToe);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "readById" ,
      type: "Framework" ,
      subType:"TicTacToe" ,
      object_id: "",
      description:  "readById TicTacToe Records",
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
  console.log("frameworkTicTacToe.controller - listByDifficultyLevelRange - Start");
  console.log("frameworkTicTacToe.controller - listByDifficultyLevelRange - req.query = ",req.query);
  console.log("frameworkTicTacToe.controller - listByDifficultyLevelRange - req.params = ",req.params);
  const minDifficultyLevel = parseInt(req.query.minDifficultyLevel);
  const maxDifficultyLevel = parseInt(req.query.maxDifficultyLevel);
  const subType = req.query.subType;
  console.log("frameworkTicTacToe.controller - listByDifficultyLevelRange - minDifficultyLevel = ",minDifficultyLevel);
  console.log("frameworkTicTacToe.controller - listByDifficultyLevelRange - maxDifficultyLevel = ",maxDifficultyLevel);
  try {
    let frameworkTicTacToe = await FrameworkTicTacToe.aggregate([
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
    if (!frameworkTicTacToe)
      return res.status("400").json({
        error: "FrameworkTicTacToe not found",
      });
      return res.json(frameworkTicTacToe);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "listByDifficultyLevelRange" ,
      type: "Framework" ,
      subType:"TicTacToe" ,
      object_id: "",
      description:  "listByDifficultyLevelRange TicTacToe Records",
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
  req.frameworkTicTacToe.image = undefined;
  return res.json(req.frameworkTicTacToe);
};

const list = async (req, res) => {
  try {
    let frameworkTicTacToes = await FrameworkTicTacToe.find();
    res.json(frameworkTicTacToes);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const newUserWithAccess = async (req, res) => {
  try {
    let usersWithAccess = req.body.usersWithAccess;
    let result = await FrameworkTicTacToe.findByIdAndUpdate(
      req.frameworkTicTacToe._id,
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
    let frameworkTicTacToe = req.frameworkTicTacToe;
    let deleteFrameworkTicTacToe = await frameworkTicTacToe.remove();
    res.json(deleteFrameworkTicTacToe);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const isOwner = (req, res, next) => {
  const isOwner =
    req.frameworkTicTacToe &&
    req.auth &&
    req.frameworkTicTacToe.owner._id == req.auth._id;
  if (!isOwner) {
    return res.status("403").json({
      error: "User is not the Owner",
    });
  }
  next();
};

const listByOwner = async (req, res) => {
  console.log("FrameworkTicTacToe.controller - listByOwner -Start");
  try {
    let frameworkTicTacToes = await FrameworkTicTacToe.find({
      owner_id: req.params.userId,
    });
    res.json(frameworkTicTacToes);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "listByOwner" ,
      type: "Framework" ,
      subType:"TicTacToe" ,
      object_id: "",
      description:  "listByOwner TicTacToe Records",
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
  console.log("FrameworkTicTacToe.controller - getCurrentFrameworkByMaxUpdateDateAndUserId - Start");
  try {
    let currentFrameworkTicTacToe = await FrameworkTicTacToe.findOne({
      owner_id: req.params.userId,
    }).sort({ updateDate: -1 });

    res.json(currentFrameworkTicTacToe);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "getCurrentFrameworkByMaxUpdateDateAndUserId" ,
      type: "Framework" ,
      subType:"TicTacToe" ,
      object_id: "",
      description:  "getCurrentFrameworkByMaxUpdateDateAndUserId TicTacToe Record",
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
  FrameworkTicTacToe.find(
    { approvedPublic: true },
    (err, frameworkTicTacToes) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err),
        });
      }
      res.json(frameworkTicTacToes);
    }
  );
};

const photo = (req, res, next) => {
  if (req.frameworkTicTacToe.image.data) {
    res.set("Content-Type", req.frameworkTicTacToe.image.contentType);
    return res.send(req.frameworkTicTacToe.image.data);
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
  frameworkTicTacToeById,
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




