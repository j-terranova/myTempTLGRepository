import FrameworkLesson from "../models/frameworkLesson.model";
import fs from "fs";

import errorHandler from "./../helpers/dbErrorHandler";
import createUsageLogEntry from "./../helpers/usageLogHandler";
import createErrorLogEntry from "./../helpers/errorLogHandler";
import defaultImage from "./../../client/assets/images/default.png";

//const path = require("path");
//const rootPath = path.normalize(__dirname + "/../../");

const create = async (req, res) => {
  console.log("FrameworkLesson.controller - Create - Start");
  try {
    const frameworkLessonData = new FrameworkLesson(req.body)  
    let result = await frameworkLessonData.save()
    
    let newUsageLogData = {   
      userId: req.profile._id ,
      activity:  "Create" ,
      type: "Framework" ,
      subType:"Lessons" ,
      object_id: frameworkLessonData._id ,
      description:  "Create new Lesson Record" ,
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
      subType:"Lessons" ,
      object_id: "",
      description:  "Create new Lesson Record",
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
  console.log("FrameworkLesson.controller - Update - Start");
  try {
    const frameworkLessonData = FrameworkLesson(req.body)
    let updatedFrameworkLessonData = {   
      topic: frameworkLessonData.topic ,
      description:  frameworkLessonData.description ,
      myClass: frameworkLessonData.myClass ,
      category:frameworkLessonData.category ,
      subject: frameworkLessonData.subject ,
      type: frameworkLessonData.type ,
      subType: frameworkLessonData.subType ,
      difficultyLevel: frameworkLessonData.difficultyLevel ,
      ageRange: frameworkLessonData.ageRange ,
      image_id: frameworkLessonData.image_id ,
      imageFileName: frameworkLessonData.imageFileName ,
      owner_id: frameworkLessonData.owner_id ,
      group_id: frameworkLessonData.group_id ,
      groupName: frameworkLessonData.groupName ,
      keepPrivate: frameworkLessonData.keepPrivate ,
      approvedForPublicUse: frameworkLessonData.approvedForPublicUse ,
      frameworkLayoutFormat: frameworkLessonData.frameworkLayoutFormat,
      frameworkResponseFormat: frameworkLessonData.frameworkResponseFormat,
      frameworkPresentationMethod:  frameworkLessonData.frameworkPresentationMethod,
      frameworkSolutionMethod:  frameworkLessonData.frameworkSolutionMethod,
      frameworkIncludeSpeech:  frameworkLessonData.frameworkIncludeSpeech,
      frameworkIncludeTimer:  frameworkLessonData.frameworkIncludeTimer,
      frameworkIncludeScoring:  frameworkLessonData.frameworkIncludeScoring,
      frameworkColor: frameworkLessonData.frameworkColor,
      includeConstructs: frameworkLessonData.includeConstructs ,
      markDeleted: frameworkLessonData.markDeleted ,
      createDate:  Date.now(),
      updatedBy: frameworkLessonData.updatedBy ,
      updateDate:  Date.now(),
    };

    let result = await FrameworkLesson.replaceOne({_id: frameworkLessonData._id},updatedFrameworkLessonData)
    let newUsageLogData = {   
      userId: req.profile._id ,
      activity:  "Update" ,
      type: "Framework" ,
      subType:"Lesson" ,
      object_id: frameworkLessonData._id ,
      description:  "Update Lesson Record" ,
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
      subType:"Lessons" ,
      object_id: "",
      description:  "Update Lesson Record",
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
  console.log("FrameworkLesson.controller - listByCriteria - Start");
  //for (const key in req.query) {
  //  console.log("req.query - ", key, req.query[key]);
  //}
  const findQuery = createQueryObject(req.query);
  try {

    let listOfLessons = await FrameworkLesson.find(findQuery).select("topic description owner_id group_id frameworkLayoutFormat frameworkResponseFormat frameworkPresentationMethod frameworkSolutionMethod markDeleted _id");
    res.json(listOfLessons);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "listByCriteria" ,
      type: "Framework" ,
      subType:"Lessons" ,
      object_id: "",
      description:  "listByCriteria Lesson Records",
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

const frameworkLessonById = async (req, res, next, id) => {
  console.log("FrameworkLesson.controller - frameworkLessonById - Start");
  try {
    let frameworkLesson = await FrameworkLesson.findById(id);
    if (!frameworkLesson)
      return res.status("400").json({
        error: "frameworkLesson not found",
      });
    req.frameworkLesson = frameworkLesson;
    next();
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "frameworkLessonById" ,
      type: "Framework" ,
      subType:"Lessons" ,
      object_id: "",
      description:  "frameworkLessonById Lesson Records",
      email: req.profile.email ,
      errorCode: err,
      errorMessage: errorHandler.getErrorMessage(err),
      serverOrClient: "Server",
      dateTimeStamp: Date.now() ,
    };
    createErrorLogEntry(newErrorLogData);
    return res.status("400").json({
      error: "Could not retrieve frameworkLesson",
    });
  }
};

const readById = async (req, res) => {
  console.log("frameworkLesson.controller - readById - Start");
  const id = req.query.id;
  try {
    let frameworkLesson = await FrameworkLesson.findOne({_id: id});
    if (!frameworkLesson)
      return res.status("400").json({
        error: "FrameworkLesson not found",
      });
      return res.json(frameworkLesson);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "readById" ,
      type: "Framework" ,
      subType:"Lessons" ,
      object_id: "",
      description:  "readById Lesson Records",
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
  req.frameworkLesson.image = undefined;
  return res.json(req.frameworkLesson);
};

const list = async (req, res) => {
  try {
    let frameworkLessons = await FrameworkLesson.find();
    res.json(frameworkLessons);
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
      req.frameworkLesson._id,
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
    let frameworkLesson = req.frameworkLesson;
    let deleteFrameworkLesson = await frameworkLesson.remove();
    res.json(deleteFrameworkLesson);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const isOwner = (req, res, next) => {
  const isOwner =
    req.frameworkLesson &&
    req.auth &&
    req.frameworkLesson.owner._id == req.auth._id;
  if (!isOwner) {
    return res.status("403").json({
      error: "User is not the Owner",
    });
  }
  next();
};

const listByOwner = async (req, res) => {
  console.log("FrameworkLesson.controller - listByOwner -Start");
  try {
    let frameworkLessons = await FrameworkLesson.find({
      owner_id: req.params.userId,
    });
    res.json(frameworkLessons);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "listByOwner" ,
      type: "Framework" ,
      subType:"Lessons" ,
      object_id: "",
      description:  "listByOwner Lesson Records",
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
  console.log("FrameworkLesson.controller - getCurrentFrameworkByMaxUpdateDateAndUserId - Start");
  try {
    let currentFrameworkLesson = await FrameworkLesson.findOne({
      owner_id: req.params.userId,
    }).sort({ updateDate: -1 });

    res.json(currentFrameworkLesson);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "getCurrentFrameworkByMaxUpdateDateAndUserId" ,
      type: "Framework" ,
      subType:"Lessons" ,
      object_id: "",
      description:  "getCurrentFrameworkByMaxUpdateDateAndUserId Lesson Record",
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
    (err, frameworkLessons) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err),
        });
      }
      res.json(frameworkLessons);
    }
  );
};

const photo = (req, res, next) => {
  if (req.frameworkLesson.image.data) {
    res.set("Content-Type", req.frameworkLesson.image.contentType);
    return res.send(req.frameworkLesson.image.data);
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
  frameworkLessonById,
  readById,
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




