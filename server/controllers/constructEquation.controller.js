import ConstructEquation from "../models/constructEquation.model";
import fs from "fs";
import readline   from 'readline';

import errorHandler from "./../helpers/dbErrorHandler";
import createUsageLogEntry from "./../helpers/usageLogHandler";
import createErrorLogEntry from "./../helpers/errorLogHandler";
import defaultImage from "./../../client/assets/images/default.png";

//const path = require("path");
//const rootPath = path.normalize(__dirname + "/../../");

const create = async (req, res) => {
  console.log("ConstructEquation.controller - Create -Start");
  try {
    const constructEquationData = new ConstructEquation(req.body)
    let result = await constructEquationData.save()

    let newUsageLogData = {   
      userId: req.profile._id ,
      activity:  "Create" ,
      type: "Component" ,
      subType:"Equation" ,
      object_id: constructEquationData._id ,
      description:  "Create new Equation Record" ,
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
      subType:"Equation" ,
      object_id: "",
      description:  "Create new Equation Record" ,
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
  console.log("ConstructEquation.controller - Update - Start " );
  try {
    const constructEquationData = ConstructEquation(req.body)
    let updatedConstructEquationData = {   
      topic: constructEquationData.topic ,
      description:  constructEquationData.description ,
      myClass: constructEquationData.myClass ,
      category:constructEquationData.category ,
      subject: constructEquationData.subject ,
      type: constructEquationData.type ,
      subType: constructEquationData.subType ,
      difficultyLevel: constructEquationData.difficultyLevel ,
      ageRange: constructEquationData.ageRange ,
      image_id: constructEquationData.image_id ,
      imageFileName: constructEquationData.imageFileName ,
      owner_id: constructEquationData.owner_id ,
      group_id: constructEquationData.group_id ,
      keepPrivate: constructEquationData.keepPrivate ,
      approvedForPublicUse: constructEquationData.approvedForPublicUse ,
      constructEquation: constructEquationData.constructEquation ,
      markDeleted: constructEquationData.markDeleted ,
      createDate:  Date.now(),
      updatedBy: constructEquationData.updatedBy ,
      updateDate:  Date.now(),
    };

    let result = await ConstructEquation.replaceOne({_id: constructEquationData._id},updatedConstructEquationData)
    let newUsageLogData = {   
      userId: req.profile._id ,
      activity:  "Update" ,
      type: "Component" ,
      subType:"Equation" ,
      object_id: constructEquationData._id ,
      description:  "Update Equation Record" ,
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
      subType:"Equation" ,
      object_id: "",
      description:  "Update new Equation Record" ,
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
  console.log("ConstructEquation.controller - listByCriteria - Start");
  for (const key in req.query) {
    console.log("req.query - ", key, req.query[key]);
  }
  const findQuery = createQueryObject(req.query);
  console.log("ConstructEquation.controller - listByCriteria - findQuery = ", findQuery);
  const userId = req.query.userId;
  try {
    //let listOfEquations = await ConstructEquation.find(findQuery).select("topic description owner_id group_id constructEquation markDeleted _id");
    let listOfEquations = await ConstructEquation.find(findQuery).select("topic description owner_id group_id markDeleted _id");
    res.json(listOfEquations);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "listByCriteria" ,
      type: "Component" ,
      subType:"Equation" ,
      object_id: "",
      description:  "listByCriteria Equation Records" ,
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

const constructEquationById = async (req, res, next, id) => {
  console.log("ConstructEquation.controller - constructEquationById - Start");
  try {
    let constructEquation = await ConstructEquation.findById(id);
    if (!constructEquation)
      return res.status("400").json({
        error: "ConstructEquation not found",
      });
    req.constructEquation = constructEquation;
    next();
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "constructEquationById" ,
      type: "Component" ,
      subType:"Equation" ,
      object_id: "",
      description:  "get constructEquationById Record" ,
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
  console.log("ConstructEquation.controller - readById - Start");
  const id = req.query.id;
  try {
    let constructEquation = await ConstructEquation.findOne({_id: id});
    return res.json(constructEquation);
} catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "readById" ,
      type: "Component" ,
      subType:"Equation" ,
      object_id: "",
      description:  "get readById Equation Record" ,
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
  req.constructEquation.image = undefined;
  return res.json(req.constructEquation);
};

const list = async (req, res) => {
  try {
    let constructEquations = await ConstructEquation.find();
    res.json(constructEquations);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const newUserWithAccess = async (req, res) => {
  try {
    let usersWithAccess = req.body.usersWithAccess;
    let result = await ConstructEquation.findByIdAndUpdate(
      req.constructEquation._id,
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
    let constructEquation = req.constructEquation;
    let deleteConstructEquation = await constructEquation.remove();
    res.json(deleteConstructEquation);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const isOwner = (req, res, next) => {
  const isOwner =
    req.constructEquation &&
    req.auth &&
    req.constructEquation.owner._id == req.auth._id;
  if (!isOwner) {
    return res.status("403").json({
      error: "User is not the Owner",
    });
  }
  next();
};

const listByOwner = async (req, res) => {
  console.log("constructEquation.controller - listByOwner - Start");
  try {
    let constructEquations = await ConstructEquation.find({
      owner_id: req.params.userId,
    });
    res.json(constructEquations);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "listByOwner" ,
      type: "Component" ,
      subType:"Equation" ,
      object_id: "",
      description:  "listByOwner Equation Records" ,
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
  console.log("ConstructEquation.controller - getCurrentConstructByMaxUpdateDateAndUserId - Start");
  try {
    let currentConstructEquation = await ConstructEquation.findOne({
      owner_id: req.params.userId,
    }).sort({ updateDate: -1 });
    res.json(currentConstructEquation);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "getCurrentConstructByMaxUpdateDateAndUserId" ,
      type: "Component" ,
      subType:"Equation" ,
      object_id: "",
      description:  "getCurrentConstructByMaxUpdateDateAndUserId Equation Record" ,
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
  ConstructEquation.find(
    { approvedPublic: true },
    (err, constructEquations) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err),
        });
      }
      res.json(constructEquations);
    }
  );
};

const photo = (req, res, next) => {
  if (req.constructEquation.image.data) {
    res.set("Content-Type", req.constructEquation.image.contentType);
    return res.send(req.constructEquation.image.data);
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

function searchForWord(wordToMatch, lookupArray){
  for (var i=0; i < lookupArray.length; i++) {
      if (lookupArray[i].wordToDefine === wordToMatch) {
          return lookupArray[i];
      }
  }
  return null;
}

function loadArrayOfLookupData(filePath) {
  console.log("Load loadArrayOfLookup Data - started");
  let lookupArray = [];
  // Read .txt file that must be comma delimited
  const data = fs.readFileSync(filePath, { encoding: "utf-8" });
  // Split on row
  const dataSplit = data.split("\n");
  const headers = dataSplit.shift().split(",");
  //console.log("Load loadArrayOfLookup Data - Set Headers ");
  for (
    let L = headers.length;
    L--;
    headers[L] = headers[L].replace(/(\r\n|\n|\r)/gm, "")
  );

  let cnt = 0;
  dataSplit.forEach(function (d) {
    for (let K = d.length; K--; d[K] == d[K].replace(/(\r\n|\n|\r)/gm, ""));
    d = d.replace(/(\r\n|\n|\r)/gm, "");

    // Loop through each row
    cnt = cnt + 1;
    var tmp = {};
    var row = d.split(",");
    for (let L = row.length; L--; L >= 0) {
      row[L] == row[L].replace(/(\r\n|\n|\r)/gm, "");
    }

    for (let i = 0; i < headers.length; i++) {
      tmp[headers[i]] = row[i];
    }
    lookupArray.push(tmp);
  });
  console.log("Load loadArrayOfLookup Data - completed");
  return lookupArray;
}

function loadGutenbergEquationData(req, res) {
  // This version allows the keyword to appear one time with
  // each keyword having a different matching word.
    console.log("Load GutenbergEquation Data - started");
    const userId=req.body.params.userId;
    const skeletonEquation = req.body.params.skeletonEquation;
    const lookupFilePath =
    "C:\\TeachLearnGame\\SourceFiles\\K-12WordList.csv";
    let lookupWordArray = loadArrayOfLookupData(lookupFilePath);

    const filePath =
    "C:\\TeachLearnGame\\Equations\\GutenbergEquationsKeyOnly.csv";
   
    console.log("Load GutenbergEquation Data - userId = ", userId);
    console.log("Load GutenbergEquation Data - fileName = ", filePath);
    console.log("Load GutenbergEquation Data - req.body = ", req.body);
    console.log("Load GutenbergEquation Data - req.body.params = ", req.body.params);
    console.log("Load GutenbergEquation Data - req.body.params.skeletonEquation = ", req.body.params.skeletonEquation);
  
    console.log("Load GutenbergEquation Data - Reading File = " + filePath);
  
    var lineReader = readline.createInterface({
      input: fs.createReadStream(filePath)
    });
    
    let constructEquation = {};
    let wordToAssociate = "";
    let equationType = "";
    let associatedWords = [];
    
    let criteria = {};
    var totalCnt = 0;
    var cnt = 0;
    let wordArray = [];

    lineReader.on('line', function (line) {
      cnt = cnt+1
      totalCnt = totalCnt + 1;
      equationType = "";
      wordArray = [];
      associatedWords = [];
      if (cnt >= 500)
      {
        console.log("Total Count Processed : ", totalCnt );
        lineReader.pause();
        setTimeout(_ => {
          //console.log(line);
          cnt=0;
          lineReader.resume();
      }, 30000);
      }
      totalCnt = totalCnt + 1;
      //if (totalCnt > 44115)
      //{
        //console.log("first 4 chars = ", line.substring(0,4))
        if (line.substring(0,4) == "ANT:")
        {
          equationType = "Antonym";
          wordArray = line.substring(4).trim().split(",");
          associatedWords = [];
        } else if (line.substring(0,4) == "SYN:")
        {
          equationType = "Synonym";
          wordArray = line.substring(4).trim().split(",");
          associatedWords = [];
        }  else
        {
          equationType = "";
          wordArray = [];
          associatedWords = [];
        }
        if (equationType != "" && wordArray.length > 1)
        {
          criteria = searchForWord(wordArray[0], lookupWordArray)
          for (let i = 1; i < wordArray.length; i++)
          {   
            if (wordArray[i].trim().length > 0)
            {
              associatedWords.push(wordArray[i]);
            }
          }
          constructEquation = {
            wordToAssociate: wordArray[0],
            equationType: equationType,
            associatedWords: associatedWords
          }
          insertGutenbergEquationData(userId, skeletonEquation,constructEquation,criteria)
        } 
      //}
    });
  }

  const insertGutenbergEquationData = async (userId, skeletonEquation,constructEquationDetails,criteria) => {
    if (constructEquationDetails && constructEquationDetails.wordToAssociate) 
    {
      //console.log( "insertGutenbergEquationData -  inside the if statement creating a new Equation");
      const newConstructEquation = new ConstructEquation({
        topic: constructEquationDetails.wordToAssociate,
        description:  constructEquationDetails.equationType + " : " +
                      constructEquationDetails.associatedWords[0] + " - " +
                      constructEquationDetails.wordToAssociate,                 
        myClass: skeletonEquation.myClass,
        category: skeletonEquation.category,
        subject: (criteria && criteria.subject)? criteria.subject: skeletonEquation.subject,
        type: skeletonEquation.type,
        subType: skeletonEquation.subType,
        difficultyLevel: (criteria && criteria.difficultyLevel)? criteria.difficultyLevel: skeletonEquation.difficultyLevel,
        ageRange: (criteria && criteria.ageRange)? criteria.ageRange: skeletonEquation.ageRange,
        image_id: skeletonEquation.image_id ,
        imageFileName: skeletonEquation.imageFileName ,
        owner_id: skeletonEquation.owner_id ,
        group_id: skeletonEquation.group_id ,
        groupName: skeletonEquation.groupName ,
        keepPrivate: skeletonEquation.keepPrivate ,
        approvedForPublicUse: skeletonEquation.approvedForPublicUse ,
        constructEquation: constructEquationDetails,
        markDeleted: skeletonEquation.markDeleted ,
        createDate:  skeletonEquation.createDate,
        updatedBy: skeletonEquation.updatedBy ,
        updateDate:  skeletonEquation.updateDate,
    
      });
      try {
        let result = await newConstructEquation.save();

      } catch (err) {
        let newErrorLogData = {   
          userId: req.profile._id ,
          activity:  "insertGutenbergEquationData" ,
          type: "Component" ,
          subType:"Equation" ,
          object_id: "",
          description:  "Bulk load Equation Records" ,
          email: req.profile.email ,
          errorCode: err,
          errorMessage: errorHandler.getErrorMessage(err),
          serverOrClient: "Server",
          dateTimeStamp: Date.now() ,
        };
        createErrorLogEntry(newErrorLogData);  
        if (err.toString().indexOf("E11000") > -1) {
          const error = new Error("Duplicate GutenbergEquation Data");
          console.log(error);
          return;
        } else
        {
          const error = errorHandler.getErrorMessage(err)
          console.log(error);
          return;
        }
        
      }
    } else
    {
      console.log("Problem with the data - constructEquationDetails = ", constructEquationDetails )
    }

  };

export default {
  create,
  constructEquationById,
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
  loadGutenbergEquationData,
};




