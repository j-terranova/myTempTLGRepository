import ConstructAssociation from "../models/constructAssociation.model";
import fs from "fs";
import readline   from 'readline';

import errorHandler from "./../helpers/dbErrorHandler";
import createUsageLogEntry from "./../helpers/usageLogHandler";
import createErrorLogEntry from "./../helpers/errorLogHandler";
import defaultImage from "./../../client/assets/images/default.png";

//const path = require("path");
//const rootPath = path.normalize(__dirname + "/../../");

const create = async (req, res) => {
  console.log("ConstructAssociation.controller - Create -Start");
  try {
    const constructAssociationData = new ConstructAssociation(req.body)
    let result = await constructAssociationData.save()

    let newUsageLogData = {   
      userId: req.profile._id ,
      activity:  "Create" ,
      type: "Component" ,
      subType:"Association" ,
      object_id: constructAssociationData._id ,
      description:  "Create new Association Record" ,
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
      subType:"Association" ,
      object_id: "",
      description:  "Create new Association Record" ,
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
  console.log("ConstructAssociation.controller - Update - Start " );
  try {
    const constructAssociationData = ConstructAssociation(req.body)
    let updatedConstructAssociationData = {   
      topic: constructAssociationData.topic ,
      description:  constructAssociationData.description ,
      myClass: constructAssociationData.myClass ,
      category:constructAssociationData.category ,
      subject: constructAssociationData.subject ,
      type: constructAssociationData.type ,
      subType: constructAssociationData.subType ,
      difficultyLevel: constructAssociationData.difficultyLevel ,
      ageRange: constructAssociationData.ageRange ,
      image_id: constructAssociationData.image_id ,
      imageFileName: constructAssociationData.imageFileName ,
      owner_id: constructAssociationData.owner_id ,
      group_id: constructAssociationData.group_id ,
      keepPrivate: constructAssociationData.keepPrivate ,
      approvedForPublicUse: constructAssociationData.approvedForPublicUse ,
      constructAssociation: constructAssociationData.constructAssociation ,
      markDeleted: constructAssociationData.markDeleted ,
      createDate:  Date.now(),
      updatedBy: constructAssociationData.updatedBy ,
      updateDate:  Date.now(),
    };

    let result = await ConstructAssociation.replaceOne({_id: constructAssociationData._id},updatedConstructAssociationData)
    let newUsageLogData = {   
      userId: req.profile._id ,
      activity:  "Update" ,
      type: "Component" ,
      subType:"Association" ,
      object_id: constructAssociationData._id ,
      description:  "Update Association Record" ,
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
      subType:"Association" ,
      object_id: "",
      description:  "Update new Association Record" ,
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
  console.log("ConstructAssociation.controller - listByCriteria - Start");
  for (const key in req.query) {
    console.log("req.query - ", key, req.query[key]);
  }
  const findQuery = createQueryObject(req.query);
  console.log("ConstructAssociation.controller - listByCriteria - findQuery = ", findQuery);
  const userId = req.query.userId;
  try {
    //let listOfAssociations = await ConstructAssociation.find(findQuery).select("topic description owner_id group_id constructAssociation markDeleted _id");
    let listOfAssociations = await ConstructAssociation.find(findQuery).select("topic description owner_id group_id markDeleted _id");
    res.json(listOfAssociations);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "listByCriteria" ,
      type: "Component" ,
      subType:"Association" ,
      object_id: "",
      description:  "listByCriteria Association Records" ,
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

const constructAssociationById = async (req, res, next, id) => {
  console.log("ConstructAssociation.controller - constructAssociationById - Start");
  try {
    let constructAssociation = await ConstructAssociation.findById(id);
    if (!constructAssociation)
      return res.status("400").json({
        error: "ConstructAssociation not found",
      });
    req.constructAssociation = constructAssociation;
    next();
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "constructAssociationById" ,
      type: "Component" ,
      subType:"Association" ,
      object_id: "",
      description:  "get constructAssociationById Record" ,
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
  console.log("ConstructAssociation.controller - readById - Start");
  const id = req.query.id;
  try {
    let constructAssociation = await ConstructAssociation.findOne({_id: id});
    return res.json(constructAssociation);
} catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "readById" ,
      type: "Component" ,
      subType:"Association" ,
      object_id: "",
      description:  "get readById Association Record" ,
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
  req.constructAssociation.image = undefined;
  return res.json(req.constructAssociation);
};

const list = async (req, res) => {
  try {
    let constructAssociations = await ConstructAssociation.find();
    res.json(constructAssociations);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const newUserWithAccess = async (req, res) => {
  try {
    let usersWithAccess = req.body.usersWithAccess;
    let result = await ConstructAssociation.findByIdAndUpdate(
      req.constructAssociation._id,
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
    let constructAssociation = req.constructAssociation;
    let deleteConstructAssociation = await constructAssociation.remove();
    res.json(deleteConstructAssociation);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const isOwner = (req, res, next) => {
  const isOwner =
    req.constructAssociation &&
    req.auth &&
    req.constructAssociation.owner._id == req.auth._id;
  if (!isOwner) {
    return res.status("403").json({
      error: "User is not the Owner",
    });
  }
  next();
};

const listByOwner = async (req, res) => {
  console.log("constructAssociation.controller - listByOwner - Start");
  try {
    let constructAssociations = await ConstructAssociation.find({
      owner_id: req.params.userId,
    });
    res.json(constructAssociations);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "listByOwner" ,
      type: "Component" ,
      subType:"Association" ,
      object_id: "",
      description:  "listByOwner Association Records" ,
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
  console.log("ConstructAssociation.controller - getCurrentConstructByMaxUpdateDateAndUserId - Start");
  try {
    let currentConstructAssociation = await ConstructAssociation.findOne({
      owner_id: req.params.userId,
    }).sort({ updateDate: -1 });
    res.json(currentConstructAssociation);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "getCurrentConstructByMaxUpdateDateAndUserId" ,
      type: "Component" ,
      subType:"Association" ,
      object_id: "",
      description:  "getCurrentConstructByMaxUpdateDateAndUserId Association Record" ,
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


const getAntonymRandomOptions = async (req, res) => {
  console.log("ConstructAssociation.controller - getAntonymRandomOptions - Start");
 
  try {
    let associationList = await ConstructAssociation.aggregate([
      { $match:  { difficultyLevel: { $lt: 9 } },  },
      { $match:  { 'constructAssociation.associationType': { $eq: "Antonym" } },  },
      { "$project": {"constructAssociation.wordToAssociate": 1, "constructAssociation.associationType": 1,  "constructAssociation.associatedWords": 1}},
      {$sample: {size: 50}},
    ])
    res.json(associationList);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "getAntonymRandomOptions" ,
      type: "Component" ,
      subType:"Association" ,
      object_id: "",
      description:  "getAntonymRandomOptions Association List" ,
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

const getSynonymRandomOptions = async (req, res) => {
  console.log("ConstructAssociation.controller - getSynonymRandomOptions - Start");
  
  try {
    let associationList = await ConstructAssociation.aggregate([
      { $match:  { difficultyLevel: { $lt: 9 } },  },
      { $match:  { 'constructAssociation.associationType': { $eq: "Synonym" } },  },
      { "$project": {"constructAssociation.wordToAssociate": 1, "constructAssociation.associationType": 1,  "constructAssociation.associatedWords": 1}},
      {$sample: {size: 50}},
    ])
    res.json(associationList);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "getAntonymRandomOptions" ,
      type: "Component" ,
      subType:"Association" ,
      object_id: "",
      description:  "getAntonymRandomOptions Association List" ,
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
  ConstructAssociation.find(
    { approvedPublic: true },
    (err, constructAssociations) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err),
        });
      }
      res.json(constructAssociations);
    }
  );
};

const photo = (req, res, next) => {
  if (req.constructAssociation.image.data) {
    res.set("Content-Type", req.constructAssociation.image.contentType);
    return res.send(req.constructAssociation.image.data);
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

function loadGutenbergAssociationData(req, res) {
  // This version allows the keyword to appear one time with
  // each keyword having a different matching word.
    console.log("Load GutenbergAssociation Data - started");
    const userId=req.body.params.userId;
    const skeletonAssociation = req.body.params.skeletonAssociation;
    const lookupFilePath =
    "C:\\TeachLearnGame\\SourceFiles\\K-12WordList.csv";
    let lookupWordArray = loadArrayOfLookupData(lookupFilePath);

    const filePath =
    "C:\\TeachLearnGame\\Associations\\GutenbergAssociationsKeyOnly.csv";
   
    console.log("Load GutenbergAssociation Data - userId = ", userId);
    console.log("Load GutenbergAssociation Data - fileName = ", filePath);
    console.log("Load GutenbergAssociation Data - req.body = ", req.body);
    console.log("Load GutenbergAssociation Data - req.body.params = ", req.body.params);
    console.log("Load GutenbergAssociation Data - req.body.params.skeletonAssociation = ", req.body.params.skeletonAssociation);
  
    console.log("Load GutenbergAssociation Data - Reading File = " + filePath);
  
    var lineReader = readline.createInterface({
      input: fs.createReadStream(filePath)
    });
    
    let constructAssociation = {};
    let wordToAssociate = "";
    let associationType = "";
    let associatedWords = [];
    
    let criteria = {};
    var totalCnt = 0;
    var cnt = 0;
    let wordArray = [];

    lineReader.on('line', function (line) {
      cnt = cnt+1
      totalCnt = totalCnt + 1;
      associationType = "";
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
          associationType = "Antonym";
          wordArray = line.substring(4).trim().split(",");
          associatedWords = [];
        } else if (line.substring(0,4) == "SYN:")
        {
          associationType = "Synonym";
          wordArray = line.substring(4).trim().split(",");
          associatedWords = [];
        }  else
        {
          associationType = "";
          wordArray = [];
          associatedWords = [];
        }
        if (associationType != "" && wordArray.length > 1)
        {
          criteria = searchForWord(wordArray[0], lookupWordArray)
          for (let i = 1; i < wordArray.length; i++)
          {   
            if (wordArray[i].trim().length > 0)
            {
              associatedWords.push(wordArray[i]);
            }
          }
          constructAssociation = {
            wordToAssociate: wordArray[0],
            associationType: associationType,
            associatedWords: associatedWords
          }
          insertGutenbergAssociationData(userId, skeletonAssociation,constructAssociation,criteria)
        } 
      //}
    });
  }

  const insertGutenbergAssociationData = async (userId, skeletonAssociation,constructAssociationDetails,criteria) => {
    if (constructAssociationDetails && constructAssociationDetails.wordToAssociate) 
    {
      //console.log( "insertGutenbergAssociationData -  inside the if statement creating a new Association");
      const newConstructAssociation = new ConstructAssociation({
        topic: constructAssociationDetails.wordToAssociate,
        description:  constructAssociationDetails.associationType + " : " +
                      constructAssociationDetails.associatedWords[0] + " - " +
                      constructAssociationDetails.wordToAssociate,                 
        myClass: skeletonAssociation.myClass,
        category: skeletonAssociation.category,
        subject: (criteria && criteria.subject)? criteria.subject: skeletonAssociation.subject,
        type: skeletonAssociation.type,
        subType: skeletonAssociation.subType,
        difficultyLevel: (criteria && criteria.difficultyLevel)? criteria.difficultyLevel: skeletonAssociation.difficultyLevel,
        ageRange: (criteria && criteria.ageRange)? criteria.ageRange: skeletonAssociation.ageRange,
        image_id: skeletonAssociation.image_id ,
        imageFileName: skeletonAssociation.imageFileName ,
        owner_id: skeletonAssociation.owner_id ,
        group_id: skeletonAssociation.group_id ,
        groupName: skeletonAssociation.groupName ,
        keepPrivate: skeletonAssociation.keepPrivate ,
        approvedForPublicUse: skeletonAssociation.approvedForPublicUse ,
        constructAssociation: constructAssociationDetails,
        markDeleted: skeletonAssociation.markDeleted ,
        createDate:  skeletonAssociation.createDate,
        updatedBy: skeletonAssociation.updatedBy ,
        updateDate:  skeletonAssociation.updateDate,
    
      });
      try {
        let result = await newConstructAssociation.save();

      } catch (err) {
        let newErrorLogData = {   
          userId: req.profile._id ,
          activity:  "insertGutenbergAssociationData" ,
          type: "Component" ,
          subType:"Association" ,
          object_id: "",
          description:  "Bulk load Association Records" ,
          email: req.profile.email ,
          errorCode: err,
          errorMessage: errorHandler.getErrorMessage(err),
          serverOrClient: "Server",
          dateTimeStamp: Date.now() ,
        };
        createErrorLogEntry(newErrorLogData);  
        if (err.toString().indexOf("E11000") > -1) {
          const error = new Error("Duplicate GutenbergAssociation Data");
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
      console.log("Problem with the data - constructAssociationDetails = ", constructAssociationDetails )
    }

  };

export default {
  create,
  constructAssociationById,
  readById,
  readAll,
  list,
  getCurrentConstructByMaxUpdateDateAndUserId,
  getAntonymRandomOptions,
  getSynonymRandomOptions,
  listByCriteria,
  remove,
  update,
  isOwner,
  listByOwner,
  photo,
  defaultPhoto,
  newUserWithAccess,
  listApprovedPublic,
  loadGutenbergAssociationData,
};




