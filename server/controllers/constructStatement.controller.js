import ConstructStatement from "../models/constructStatement.model";
import fs from "fs";

import errorHandler from "./../helpers/dbErrorHandler";
import createUsageLogEntry from "./../helpers/usageLogHandler";
import createErrorLogEntry from "./../helpers/errorLogHandler";
import defaultImage from "./../../client/assets/images/default.png";

//const path = require("path");
//const rootPath = path.normalize(__dirname + "/../../");

const create = async (req, res) => {
  console.log("Server Side - constructStatement.controller - Create - Start");
  try {
    const constructStatementData = new ConstructStatement(req.body)
    let result = await constructStatementData.save()

    let newUsageLogData = {   
      userId: req.profile._id ,
      activity:  "Create" ,
      type: "Component" ,
      subType:"Statement" ,
      object_id: constructStatementData._id ,
      description:  "Create new Statement Record" ,
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
      subType:"Statement" ,
      object_id: "",
      description:  "Create new Statement Record" ,
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
  console.log("ConstructStatement.controller - Update - Start");
  try {
    const constructStatementData = ConstructStatement(req.body)
    let updatedConstructStatementData = {   
      topic: constructStatementData.topic ,
      description:  constructStatementData.description ,
      myClass: constructStatementData.myClass ,
      category:constructStatementData.category ,
      subject: constructStatementData.subject ,
      type: constructStatementData.type ,
      subType: constructStatementData.subType ,
      difficultyLevel: constructStatementData.difficultyLevel ,
      ageRange: constructStatementData.ageRange ,
      image_id: constructStatementData.image_id ,
      imageFileName: constructStatementData.imageFileName ,
      owner_id: constructStatementData.owner_id ,
      group_id: constructStatementData.group_id ,
      groupName: constructStatementData.groupName ,
      keepPrivate: constructStatementData.keepPrivate ,
      approvedForPublicUse: constructStatementData.approvedForPublicUse ,
      constructStatement: constructStatementData.constructStatement ,
      markDeleted: constructStatementData.markDeleted ,
      createDate:  constructStatementData.createDate,
      updatedBy: constructStatementData.updatedBy ,
      updateDate:  constructStatementData.updateDate,
    };

    let result = await ConstructStatement.replaceOne({_id: constructStatementData._id},updatedConstructStatementData)   
    let newUsageLogData = {   
      userId: req.profile._id ,
      activity:  "Update" ,
      type: "Component" ,
      subType:"Statement" ,
      object_id: constructStatementData._id ,
      description:  "Update Statement Record" ,
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
      subType:"Statement" ,
      object_id: "",
      description:  "Update Statement Record" ,
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
  console.log("ConstructStatement.controller - listByCriteria - Start");
  //for (const key in req.query) {
  //  console.log("req.query - ", key, req.query[key]);
  //}
  const findQuery = createQueryObject(req.query);
  //const userId = req.query.userId;
  try {
    let listOfStatements = await ConstructStatement.find(findQuery).select("topic description owner_id group_id markDeleted _id");
    res.json(listOfStatements);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "listByCriteria" ,
      type: "Component" ,
      subType:"Statement" ,
      object_id: "",
      description:  "listByCriteria Statement Record" ,
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

const constructStatementById = async (req, res, next, id) => {
  try {
    let constructStatement = await ConstructStatement.findById(id);
    if (!constructStatement)
      return res.status("400").json({
        error: "ConstructStatement not found",
      });
    req.constructStatement = constructStatement;
    next();
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "constructStatementById" ,
      type: "Component" ,
      subType:"Statement" ,
      object_id: "",
      description:  "get constructStatementById Statement Record" ,
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
  const id = req.query.id;
  try {
    let constructStatement = await ConstructStatement.findOne({_id: id});
    return res.json(constructStatement);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "readById" ,
      type: "Component" ,
      subType:"Statement" ,
      object_id: "",
      description:  "get readById Statement Record" ,
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
  req.constructStatement.image = undefined;
  return res.json(req.constructStatement);
};

const list = async (req, res) => {
  try {
    let constructStatements = await ConstructStatement.find();
    res.json(constructStatements);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const newUserWithAccess = async (req, res) => {
  try {
    let usersWithAccess = req.body.usersWithAccess;
    let result = await ConstructStatement.findByIdAndUpdate(
      req.constructStatement._id,
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
    let constructStatement = req.constructStatement;
    let deleteConstructStatement = await constructStatement.remove();
    res.json(deleteConstructStatement);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const isOwner = (req, res, next) => {
  const isOwner =
    req.constructStatement &&
    req.auth &&
    req.constructStatement.owner._id == req.auth._id;
  if (!isOwner) {
    return res.status("403").json({
      error: "User is not the Owner",
    });
  }
  next();
};

const listByOwner = async (req, res) => {
  console.log("ConstructStatement.controller - listByOwner - Start");
  try {
    let constructStatements = await ConstructStatement.find({
      owner_id: req.params.userId,
    });
    res.json(constructStatements);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "listByOwner" ,
      type: "Component" ,
      subType:"Statement" ,
      object_id: "",
      description:  "get listByOwner Statement Record" ,
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
  console.log("ConstructStatement.controller - getCurrentConstructByMaxUpdateDateAndUserId - Start");
  try {
    let currentConstructStatement = await ConstructStatement.findOne({
      owner_id: req.params.userId,
    }).sort({ updateDate: -1 });
    res.json(currentConstructStatement);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "getCurrentConstructByMaxUpdateDateAndUserId" ,
      type: "Component" ,
      subType:"Statement" ,
      object_id: "",
      description:  "getCurrentConstructByMaxUpdateDateAndUserId Statement Record" ,
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
  ConstructStatement.find(
    { approvedPublic: true },
    (err, constructStatements) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err),
        });
      }
      res.json(constructStatements);
    }
  );
};

const photo = (req, res, next) => {
  if (req.constructStatement.image.data) {
    res.set("Content-Type", req.constructStatement.image.contentType);
    return res.send(req.constructStatement.image.data);
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
  constructStatementById,
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



