import LearnerLesson from "../models/frameworkLesson.model";
import fs from "fs";
import errorHandler from "./../helpers/dbErrorHandler";
import createUsageLogEntry from "./../helpers/usageLogHandler";
import createErrorLogEntry from "./../helpers/errorLogHandler";
import defaultImage from "./../../client/assets/images/default.png";

//const path = require("path");
//const rootPath = path.normalize(__dirname + "/../../");

const create = async (req, res) => {
  console.log("Server Side - learnerLesson.controller - Create - Save");
  try {
    const learnerLessonData = new LearnerLesson(req.body)  
    let result = await learnerLessonData.save()    
    let newUsageLogData = {   
      userId: req.profile._id ,
      activity:  "Create" ,
      type: "Learner" ,
      subType:"Lesson" ,
      object_id: learnerLessonData._id ,
      description:  "Create new Learner Lesson Record" ,
      email: req.profile.email ,
      dateTimeStamp: Date.now() ,
    };
    createUsageLogEntry(newUsageLogData);

    res.json(result)

  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "Create" ,
      type: "Learner" ,
      subType:"Lesson" ,
      object_id: "",
      description:  "Create new Lesson Record" ,
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
  console.log("LearnerLesson.controller - Update - Start");
  try {
    const learnerLessonData = LearnerLesson(req.body)
    let updatedLearnerLessonData = {   
      topic: learnerLessonData.topic ,
      description:  learnerLessonData.description ,
      myClass: learnerLessonData.myClass ,
      category:learnerLessonData.category ,
      subject: learnerLessonData.subject ,
      type: learnerLessonData.type ,
      subType: learnerLessonData.subType ,
      difficultyLevel: learnerLessonData.difficultyLevel ,
      ageRange: learnerLessonData.ageRange ,
      image_id: learnerLessonData.image_id ,
      imageFileName: learnerLessonData.imageFileName ,
      owner_id: learnerLessonData.owner_id ,
      group_id: learnerLessonData.group_id ,
      groupName: learnerLessonData.groupName ,
      keepPrivate: learnerLessonData.keepPrivate ,
      approvedForPublicUse: learnerLessonData.approvedForPublicUse ,
      frameworkLayoutFormat: learnerLessonData.frameworkLayoutFormat,
      frameworkResponseFormat: learnerLessonData.frameworkResponseFormat,
      frameworkPresentationMethod: learnerLessonData.frameworkPresentationMethod,
      frameworkSolutionMethod: learnerLessonData.frameworkSolutionMethod,
      frameworkIncludeSpeech: learnerLessonData.frameworkIncludeSpeech,
      frameworkIncludeTimer: learnerLessonData.frameworkIncludeTimer,
      frameworkIncludeScoring: learnerLessonData.frameworkIncludeScoring,
      frameworkColor: learnerLessonData.frameworkColor,
      includeConstructs: learnerLessonData.includeConstructs,
      markDeleted: learnerLessonData.markDeleted ,
      createDate:  Date.now(),
      updatedBy: learnerLessonData.updatedBy ,
      updateDate:  Date.now(),
    };
    let result = await LearnerLesson.replaceOne({_id: learnerLessonData._id},updatedLearnerLessonData)
    let newUsageLogData = {   
      userId: req.profile._id ,
      activity:  "Update" ,
      type: "Learner" ,
      subType:"Lesson" ,
      object_id: learnerLessonData._id ,
      description:  "Update Learner Lesson Record" ,
      email: req.profile.email ,
      dateTimeStamp: Date.now() ,
    };
    createUsageLogEntry(newUsageLogData);

    res.json(result)
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "Update" ,
      type: "Learner" ,
      subType:"Lesson" ,
      object_id: "",
      description:  "Update Lesson Record" ,
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
  console.log("LearnerLesson.controller - listByCriteria - Start");
  //for (const key in req.query) {
  //  console.log("req.query - ", key, req.query[key]);
  //}
  const findQuery = createQueryObject(req.query);
  try {
    let listOfLessons = await LearnerLesson.find(findQuery).select("topic description subType difficultyLevel owner_id group_id markDeleted _id");

    res.json(listOfLessons);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "listByCriteria" ,
      type: "Learner" ,
      subType:"Lesson" ,
      object_id: "",
      description:  "listByCriteria Lesson Record" ,
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

const learnerLessonById = async (req, res, next, id) => {
  console.log("LearnerLesson.controller - learnerLessonById - Start");
  try {
    let learnerLesson = await LearnerLesson.findById(id);
    if (!learnerLesson)
      return res.status("400").json({
        error: "LearnerLesson not found",
      });
    req.learnerLesson = learnerLesson;
    next();
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "learnerLessonById" ,
      type: "Learner" ,
      subType:"Lesson" ,
      object_id: "",
      description:  "learnerLessonById Lesson Record" ,
      email: req.profile.email ,
      errorCode: err,
      errorMessage: errorHandler.getErrorMessage(err),
      serverOrClient: "Server",
      dateTimeStamp: Date.now() ,
    };
    createErrorLogEntry(newErrorLogData);
    return res.status("400").json({
      error: "Could not retrieve learnerLesson",
    });
  }
};

const readById = async (req, res) => {
  console.log("learnerLesson.controller - readById - Start");
  const id = req.query.id;
  try {
    let learnerLesson = await LearnerLesson.findOne({_id: id});
    if (!learnerLesson)
      return res.status("400").json({
        error: "LearnerLesson not found",
      });
      return res.json(learnerLesson);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "readById" ,
      type: "Learner" ,
      subType:"Lesson" ,
      object_id: "",
      description:  "get readById Lesson Record" ,
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
  req.learnerLesson.image = undefined;
  return res.json(req.learnerLesson);
};

const list = async (req, res) => {
  try {
    let learnerLessons = await LearnerLesson.find();
    res.json(learnerLessons);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const newUserWithAccess = async (req, res) => {
  try {
    let usersWithAccess = req.body.usersWithAccess;
    let result = await LearnerLesson.findByIdAndUpdate(
      req.learnerLesson._id,
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
    let learnerLesson = req.learnerLesson;
    let deleteLearnerLesson = await learnerLesson.remove();
    res.json(deleteLearnerLesson);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const isOwner = (req, res, next) => {
  const isOwner =
    req.learnerLesson &&
    req.auth &&
    req.learnerLesson.owner._id == req.auth._id;
  if (!isOwner) {
    return res.status("403").json({
      error: "User is not the Owner",
    });
  }
  next();
};

const listByOwner = async (req, res) => {
  console.log("learnerLesson.controller - listByOwner - Start"
  );
  try {
    let learnerLessons = await LearnerLesson.find({
      owner_id: req.params.userId,
    });
    res.json(learnerLessons);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "listByOwner" ,
      type: "Learner" ,
      subType:"Lesson" ,
      object_id: "",
      description:  "listByOwner Lesson Record" ,
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

const getCurrentLearnerByMaxUpdateDateAndUserId = async (req, res) => {
  console.log("LearnerLesson.controller - getCurrentLearnerByMaxUpdateDateAndUserId - Start");
  try {
    let currentLearnerLesson = await LearnerLesson.findOne({
      owner_id: req.params.userId,
    }).sort({ updateDate: -1 });

    res.json(currentLearnerLesson);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "getCurrentLearnerByMaxUpdateDateAndUserId" ,
      type: "Learner" ,
      subType:"Lesson" ,
      object_id: "",
      description:  "getCurrentLearnerByMaxUpdateDateAndUserId Lesson Record" ,
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
  LearnerLesson.find(
    { approvedPublic: true },
    (err, learnerLessons) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err),
        });
      }
      res.json(learnerLessons);
    }
  );
};

const photo = (req, res, next) => {
  if (req.learnerLesson.image.data) {
    res.set("Content-Type", req.learnerLesson.image.contentType);
    return res.send(req.learnerLesson.image.data);
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
  readById,
  learnerLessonById,
  readAll,
  list,
  getCurrentLearnerByMaxUpdateDateAndUserId,
  remove,
  isOwner,
  listByOwner,
  photo,
  defaultPhoto,
  newUserWithAccess,
  listApprovedPublic,
};