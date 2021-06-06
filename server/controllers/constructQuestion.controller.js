import ConstructQuestion from "../models/constructQuestion.model";
import fs from "fs";
import errorHandler from "./../helpers/dbErrorHandler";
import createUsageLogEntry from "./../helpers/usageLogHandler";
import createErrorLogEntry from "./../helpers/errorLogHandler";
import defaultImage from "./../../client/assets/images/default.png";

//const path = require("path");
//const rootPath = path.normalize(__dirname + "/../../");

const create = async (req, res) => {
  console.log("Server Side - constructQuestion.controller - Create  - Start");
  try {
    const constructQuestionData = new ConstructQuestion(req.body)   
    let result = await constructQuestionData.save()

    let newUsageLogData = {   
      userId: req.profile._id ,
      activity:  "Create" ,
      type: "Component" ,
      subType:"Question" ,
      object_id: constructQuestionData._id ,
      description:  "Create new Question Record" ,
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
      subType:"Question" ,
      object_id: "",
      description:  "Create new Question Record" ,
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
  console.log("ConstructQuestion.controller - Update - Start");
  try {
    const constructQuestionData = ConstructQuestion(req.body)
    let updatedConstructQuestionData = {   
      topic: constructQuestionData.topic ,
      description:  constructQuestionData.description ,
      myClass: constructQuestionData.myClass ,
      category:constructQuestionData.category ,
      subject: constructQuestionData.subject ,
      type: constructQuestionData.type ,
      subType: constructQuestionData.subType ,
      difficultyLevel: constructQuestionData.difficultyLevel ,
      ageRange: constructQuestionData.ageRange ,
      image_id: constructQuestionData.image_id ,
      imageFileName: constructQuestionData.imageFileName ,
      owner_id: constructQuestionData.owner_id ,
      group_id: constructQuestionData.group_id ,
      groupName: constructQuestionData.groupName ,
      keepPrivate: constructQuestionData.keepPrivate ,
      approvedForPublicUse: constructQuestionData.approvedForPublicUse ,
      constructQuestion: constructQuestionData.constructQuestion ,
      markDeleted: constructQuestionData.markDeleted ,
      createDate:  Date.now(),
      updatedBy: constructQuestionData.updatedBy ,
      updateDate:  Date.now(),
    };

    let result = await ConstructQuestion.replaceOne({_id: constructQuestionData._id},updatedConstructQuestionData)
    let newUsageLogData = {   
      userId: req.profile._id ,
      activity:  "Update" ,
      type: "Component" ,
      subType:"Question" ,
      object_id: constructQuestionData._id ,
      description:  "Update Question Record" ,
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
      subType:"Question" ,
      object_id: "",
      description:  "Update new Question Record" ,
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
  console.log("ConstructQuestion.controller - listByCriteria - Start");
  //for (const key in req.query) {
  //  console.log("req.query - ", key, req.query[key]);
  //}
  const findQuery = createQueryObject(req.query);
  //const userId = req.query.userId;
  try {
    let listOfQuestions = await ConstructQuestion.find(findQuery).select("topic description owner_id group_id markDeleted _id");
    res.json(listOfQuestions);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "listByCriteria" ,
      type: "Component" ,
      subType:"Question" ,
      object_id: "",
      description:  "listByCriteria Question Records" ,
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

const constructQuestionById = async (req, res, next, id) => {
  console.log("ConstructQuestion.controller - constructQuestionById - Start");
  try {
    let constructQuestion = await ConstructQuestion.findById(id);
    if (!constructQuestion)
      return res.status("400").json({
        error: "ConstructQuestion not found",
      });
    req.constructQuestion = constructQuestion;
    next();
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "constructQuestionById" ,
      type: "Component" ,
      subType:"Question" ,
      object_id: "",
      description:  "constructQuestionById Question Record" ,
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
  console.log("ConstructQuestion.controller - readById -  Start");
  const id = req.query.id;
  try {
    let constructQuestion = await ConstructQuestion.findOne({_id: id});
    return res.json(constructQuestion);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "readById" ,
      type: "Component" ,
      subType:"Question" ,
      object_id: "",
      description:  "get readById Question Record" ,
      email: req.profile.email ,
      errorCode: err,
      errorMessage: errorHandler.getErrorMessage(err),
      serverOrClient: "Server",
      dateTimeStamp: Date.now() ,
    };
    createErrorLogEntry(newErrorLogData);
    return res.status("400").json({
      error: "Could not retrieve constructQuestion",
    });
  }
}

const readAll = (req, res) => {
  req.constructQuestion.image = undefined;
  return res.json(req.constructQuestion);
};

const list = async (req, res) => {
  try {
    let constructQuestions = await ConstructQuestion.find();
    res.json(constructQuestions);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const newUserWithAccess = async (req, res) => {
  try {
    let usersWithAccess = req.body.usersWithAccess;
    let result = await ConstructQuestion.findByIdAndUpdate(
      req.constructQuestion._id,
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
    let constructQuestion = req.constructQuestion;
    let deleteConstructQuestion = await constructQuestion.remove();
    res.json(deleteConstructQuestion);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const isOwner = (req, res, next) => {
  const isOwner =
    req.constructQuestion &&
    req.auth &&
    req.constructQuestion.owner._id == req.auth._id;
  if (!isOwner) {
    return res.status("403").json({
      error: "User is not the Owner",
    });
  }
  next();
};

const listByOwner = async (req, res) => {
  console.log("ConstructQuestion.controller - listByOwner - Start");
  try {
    let constructQuestions = await ConstructQuestion.find({
      owner_id: req.params.userId,
    });

    res.json(constructQuestions);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "listByOwner" ,
      type: "Component" ,
      subType:"Question" ,
      object_id: "",
      description:  "listByOwner Question Record" ,
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
  console.log("ConstructQuestion.controller - getCurrentConstructByMaxUpdateDateAndUserId - Start");
  try {
    let currentConstructQuestion = await ConstructQuestion.findOne({
      owner_id: req.params.userId,
    }).sort({ updateDate: -1 });
    res.json(currentConstructQuestion);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "getCurrentConstructByMaxUpdateDateAndUserId" ,
      type: "Component" ,
      subType:"Question" ,
      object_id: "",
      description:  "getCurrentConstructByMaxUpdateDateAndUserId Question Record" ,
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

const getRandomOptions = async (req, res) => {
  console.log("ConstructQuestion.controller - getRandomOptions - Start");
   
  try {
    let questionList = await ConstructQuestion.aggregate([
      { $match:  { difficultyLevel: { $lt: 9 } },  },
      { "$project": {"constructQuestion.questionPosed": 1, "constructQuestion.correctResponses": 1, "constructQuestion.inCorrectResponses": 1}},
      {$sample: {size: 50}},
      ])
    res.json(questionList);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "getRandomOptions" ,
      type: "Component" ,
      subType:"Question" ,
      object_id: "",
      description:  "getRandomOptions Question List" ,
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
  ConstructQuestion.find(
    { approvedPublic: true },
    (err, constructQuestions) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err),
        });
      }
      res.json(constructQuestions);
    }
  );
};

const photo = (req, res, next) => {
  if (req.constructQuestion.image.data) {
    res.set("Content-Type", req.constructQuestion.image.contentType);
    return res.send(req.constructQuestion.image.data);
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
  constructQuestionById,
  readById,
  readAll,
  list,
  getCurrentConstructByMaxUpdateDateAndUserId,
  getRandomOptions,
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




