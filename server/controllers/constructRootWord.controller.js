import ConstructRootWord from "../models/constructRootWord.model";
import fs from "fs";
import readline   from 'readline';

import errorHandler from "./../helpers/dbErrorHandler";
import createUsageLogEntry from "./../helpers/usageLogHandler";
import createErrorLogEntry from "./../helpers/errorLogHandler";
import defaultImage from "./../../client/assets/images/default.png";

//const path = require("path");
//const rootPath = path.normalize(__dirname + "/../../");

const create = async (req, res) => {
  console.log("ConstructRootWord.controller - Create -Start");
  try {
    const constructRootWordData = new ConstructRootWord(req.body)
    let result = await constructRootWordData.save()

    let newUsageLogData = {   
      userId: req.profile._id ,
      activity:  "Create" ,
      type: "Component" ,
      subType:"RootWord" ,
      object_id: constructRootWordData._id ,
      description:  "Create new RootWord Record" ,
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
      subType:"RootWord" ,
      object_id: "",
      description:  "Create new RootWord Record" ,
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
  console.log("ConstructRootWord.controller - Update - Start " );
  try {
    const constructRootWordData = ConstructRootWord(req.body)
    let updatedConstructRootWordData = {   
      topic: constructRootWordData.topic ,
      description:  constructRootWordData.description ,
      myClass: constructRootWordData.myClass ,
      category:constructRootWordData.category ,
      subject: constructRootWordData.subject ,
      type: constructRootWordData.type ,
      subType: constructRootWordData.subType ,
      difficultyLevel: constructRootWordData.difficultyLevel ,
      ageRange: constructRootWordData.ageRange ,
      image_id: constructRootWordData.image_id ,
      imageFileName: constructRootWordData.imageFileName ,
      owner_id: constructRootWordData.owner_id ,
      group_id: constructRootWordData.group_id ,
      keepPrivate: constructRootWordData.keepPrivate ,
      approvedForPublicUse: constructRootWordData.approvedForPublicUse ,
      constructRootWord: constructRootWordData.constructRootWord ,
      markDeleted: constructRootWordData.markDeleted ,
      createDate:  Date.now(),
      updatedBy: constructRootWordData.updatedBy ,
      updateDate:  Date.now(),
    };

    let result = await ConstructRootWord.replaceOne({_id: constructRootWordData._id},updatedConstructRootWordData)
    let newUsageLogData = {   
      userId: req.profile._id ,
      activity:  "Update" ,
      type: "Component" ,
      subType:"RootWord" ,
      object_id: constructRootWordData._id ,
      description:  "Update RootWord Record" ,
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
      subType:"RootWord" ,
      object_id: "",
      description:  "Update new RootWord Record" ,
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
  console.log("ConstructRootWord.controller - listByCriteria - Start");
  for (const key in req.query) {
    console.log("req.query - ", key, req.query[key]);
  }
  const findQuery = createQueryObject(req.query);
  console.log("ConstructRootWord.controller - listByCriteria - findQuery = ", findQuery);
  const userId = req.query.userId;
  try {
    //let listOfRootWords = await ConstructRootWord.find(findQuery).select("topic description owner_id group_id constructRootWord markDeleted _id");
    let listOfRootWords = await ConstructRootWord.find(findQuery).select("topic description owner_id group_id markDeleted _id");
    res.json(listOfRootWords);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "listByCriteria" ,
      type: "Component" ,
      subType:"RootWord" ,
      object_id: "",
      description:  "listByCriteria RootWord Records" ,
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

const constructRootWordById = async (req, res, next, id) => {
  console.log("ConstructRootWord.controller - constructRootWordById - Start");
  try {
    let constructRootWord = await ConstructRootWord.findById(id);
    if (!constructRootWord)
      return res.status("400").json({
        error: "ConstructRootWord not found",
      });
    req.constructRootWord = constructRootWord;
    next();
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "constructRootWordById" ,
      type: "Component" ,
      subType:"RootWord" ,
      object_id: "",
      description:  "get constructRootWordById Record" ,
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
  console.log("ConstructRootWord.controller - readById - Start");
  const id = req.query.id;
  try {
    let constructRootWord = await ConstructRootWord.findOne({_id: id});
    return res.json(constructRootWord);
} catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "readById" ,
      type: "Component" ,
      subType:"RootWord" ,
      object_id: "",
      description:  "get readById RootWord Record" ,
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
  req.constructRootWord.image = undefined;
  return res.json(req.constructRootWord);
};

const list = async (req, res) => {
  try {
    let constructRootWords = await ConstructRootWord.find();
    res.json(constructRootWords);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const newUserWithAccess = async (req, res) => {
  try {
    let usersWithAccess = req.body.usersWithAccess;
    let result = await ConstructRootWord.findByIdAndUpdate(
      req.constructRootWord._id,
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
    let constructRootWord = req.constructRootWord;
    let deleteConstructRootWord = await constructRootWord.remove();
    res.json(deleteConstructRootWord);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const isOwner = (req, res, next) => {
  const isOwner =
    req.constructRootWord &&
    req.auth &&
    req.constructRootWord.owner._id == req.auth._id;
  if (!isOwner) {
    return res.status("403").json({
      error: "User is not the Owner",
    });
  }
  next();
};

const listByOwner = async (req, res) => {
  console.log("constructRootWord.controller - listByOwner - Start");
  try {
    let constructRootWords = await ConstructRootWord.find({
      owner_id: req.params.userId,
    });
    res.json(constructRootWords);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "listByOwner" ,
      type: "Component" ,
      subType:"RootWord" ,
      object_id: "",
      description:  "listByOwner RootWord Records" ,
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
  console.log("ConstructRootWord.controller - getCurrentConstructByMaxUpdateDateAndUserId - Start");
  try {
    let currentConstructRootWord = await ConstructRootWord.findOne({
      owner_id: req.params.userId,
    }).sort({ updateDate: -1 });
    res.json(currentConstructRootWord);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "getCurrentConstructByMaxUpdateDateAndUserId" ,
      type: "Component" ,
      subType:"RootWord" ,
      object_id: "",
      description:  "getCurrentConstructByMaxUpdateDateAndUserId RootWord Record" ,
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
  ConstructRootWord.find(
    { approvedPublic: true },
    (err, constructRootWords) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err),
        });
      }
      res.json(constructRootWords);
    }
  );
};

const photo = (req, res, next) => {
  if (req.constructRootWord.image.data) {
    res.set("Content-Type", req.constructRootWord.image.contentType);
    return res.send(req.constructRootWord.image.data);
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

function loadGutenbergRootWordData(req, res) {
  // This version allows the keyword to appear one time with
  // each keyword having a different matching word.
    console.log("Load GutenbergRootWord Data - started");
    const userId=req.body.params.userId;
    const skeletonRootWord = req.body.params.skeletonRootWord;
    const lookupFilePath =
    "C:\\TeachLearnGame\\SourceFiles\\K-12WordList.csv";
    let lookupWordArray = loadArrayOfLookupData(lookupFilePath);

    const filePath =
    "C:\\TeachLearnGame\\RootWords\\GutenbergRootWordsKeyOnly.csv";
   
    console.log("Load GutenbergRootWord Data - userId = ", userId);
    console.log("Load GutenbergRootWord Data - fileName = ", filePath);
    console.log("Load GutenbergRootWord Data - req.body = ", req.body);
    console.log("Load GutenbergRootWord Data - req.body.params = ", req.body.params);
    console.log("Load GutenbergRootWord Data - req.body.params.skeletonRootWord = ", req.body.params.skeletonRootWord);
  
    console.log("Load GutenbergRootWord Data - Reading File = " + filePath);
  
    var lineReader = readline.createInterface({
      input: fs.createReadStream(filePath)
    });
    
    let constructRootWord = {};
    let rootWord = "";
    let meaning = "";
    let etymology = "";
    let type = "";
    let examples = [];
    
    let criteria = {};
    var totalCnt = 0;
    var cnt = 0;
    let wordArray = [];

    lineReader.on('line', function (line) {
      cnt = cnt+1
      totalCnt = totalCnt + 1;
      meaning = "";
      etymology = "";
      type = "";
      wordArray = [];
      examples = [];
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
          type = "Antonym";
          wordArray = line.substring(4).trim().split(",");
          examples = [];
        } else if (line.substring(0,4) == "SYN:")
        {
          type = "Synonym";
          wordArray = line.substring(4).trim().split(",");
          examples = [];
        }  else
        {
          meaning = "";
          etymology = "";
          type = "";
          wordArray = [];
          examples = [];
        }
        if (type != "" && wordArray.length > 1)
        {
          criteria = searchForWord(wordArray[0], lookupWordArray)
          for (let i = 1; i < wordArray.length; i++)
          {   
            if (wordArray[i].trim().length > 0)
            {
              examples.push(wordArray[i]);
            }
          }
          constructRootWord = {
            rootWord: wordArray[0],
            meaning: meaning,
            etymology: etymology,
            type: type,
            examples: examples
          }
          insertGutenbergRootWordData(userId, skeletonRootWord,constructRootWord,criteria)
        } 
      //}
    });
  }

  const insertGutenbergRootWordData = async (userId, skeletonRootWord,constructRootWordDetails,criteria) => {
    if (constructRootWordDetails && constructRootWordDetails.rootWord) 
    {
      //console.log( "insertGutenbergRootWordData -  inside the if statement creating a new RootWord");
      const newConstructRootWord = new ConstructRootWord({
        topic: constructRootWordDetails.rootWord,
        description:  constructRootWordDetails.type + " : " +
                      constructRootWordDetails.examples[0] + " - " +
                      constructRootWordDetails.rootWord,                 
        myClass: skeletonRootWord.myClass,
        category: skeletonRootWord.category,
        subject: (criteria && criteria.subject)? criteria.subject: skeletonRootWord.subject,
        type: skeletonRootWord.type,
        subType: skeletonRootWord.subType,
        difficultyLevel: (criteria && criteria.difficultyLevel)? criteria.difficultyLevel: skeletonRootWord.difficultyLevel,
        ageRange: (criteria && criteria.ageRange)? criteria.ageRange: skeletonRootWord.ageRange,
        image_id: skeletonRootWord.image_id ,
        imageFileName: skeletonRootWord.imageFileName ,
        owner_id: skeletonRootWord.owner_id ,
        group_id: skeletonRootWord.group_id ,
        groupName: skeletonRootWord.groupName ,
        keepPrivate: skeletonRootWord.keepPrivate ,
        approvedForPublicUse: skeletonRootWord.approvedForPublicUse ,
        constructRootWord: constructRootWordDetails,
        markDeleted: skeletonRootWord.markDeleted ,
        createDate:  skeletonRootWord.createDate,
        updatedBy: skeletonRootWord.updatedBy ,
        updateDate:  skeletonRootWord.updateDate,
    
      });
      try {
        let result = await newConstructRootWord.save();

      } catch (err) {
        let newErrorLogData = {   
          userId: req.profile._id ,
          activity:  "insertGutenbergRootWordData" ,
          type: "Component" ,
          subType:"RootWord" ,
          object_id: "",
          description:  "Bulk load RootWord Records" ,
          email: req.profile.email ,
          errorCode: err,
          errorMessage: errorHandler.getErrorMessage(err),
          serverOrClient: "Server",
          dateTimeStamp: Date.now() ,
        };
        createErrorLogEntry(newErrorLogData);  
        if (err.toString().indexOf("E11000") > -1) {
          const error = new Error("Duplicate GutenbergRootWord Data");
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
      console.log("Problem with the data - constructRootWordDetails = ", constructRootWordDetails )
    }

  };

export default {
  create,
  constructRootWordById,
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
  loadGutenbergRootWordData,
};




