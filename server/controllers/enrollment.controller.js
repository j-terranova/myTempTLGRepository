import Enrollment from '../models/enrollment.model'
import errorHandler from './../helpers/dbErrorHandler'
import createUsageLogEntry from "./../helpers/usageLogHandler";

const create = async (req, res) => {
  console.log("Enrollment.controller - Create -Start");
  let newEnrollment = {
    course: req.course,
    student: req.auth,
  }
  newEnrollment.lessonStatus = req.course.lessons.map((lesson)=>{
    return {lesson: lesson, complete:false}
  })
  const enrollment = new Enrollment(newEnrollment)
  try {
    let result = await enrollment.save()

    let newUsageLogData = {   
      userId: req.profile._id ,
      activity:  "Create" ,
      type: "Framework" ,
      subType:"Enrollment" ,
      object_id: enrollment._id ,
      description:  "Create new Enrollment Record" ,
      email: req.profile.email ,
      dateTimeStamp: Date.now() ,
    };
    createUsageLogEntry(newUsageLogData);

    return res.status(200).json(result)
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "Create" ,
      type: "Component" ,
      subType:"Enrollment" ,
      object_id: "",
      description:  "Create new Enrollment Record" ,
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
  console.log("Enrollment.controller - Update start ");
  const enrollment = new Enrollment(req.body);
    const newFrameworkRecentlyViewed = new Enrollment({
      userId: enrollment.userId,
      framework_id: enrollment.framework_id,
      title: enrollment.title,
      description: enrollment.description,
      topic: enrollment.topic,
      myClass: enrollment.myClass,
      category:enrollment.category,
      subject: enrollment.subject,
      type: enrollment.type,
      subType: enrollment.subtype,
      includeConstructs: enrollment.includeConstructs,
      frameworkStatus: enrollment.frameworkStatus,
      numberCorrect: enrollment.numberCorrect,
      numberInTest: enrollment.numberInTest,
      scale: enrollment.scale,
      startDate: enrollment.startDate,
      completedDate: enrollment.completedDate,
      updateDate: enrollment.updateDate,
      //_id:enrollment._id
    });

    try {
      const filter = { _id: enrollment._id };
      let result = await Enrollment.findByIdAndUpdate(
        {_id: enrollment._id },
        {$set: enrollment});
      let newUsageLogData = {   
        userId: req.profile._id ,
        activity:  "Update" ,
        type: "Framework" ,
        subType:"Enrollment" ,
        object_id: enrollment._id ,
        description:  "Update Enrollment Record" ,
        email: req.profile.email ,
        dateTimeStamp: Date.now() ,
      };
      createUsageLogEntry(newUsageLogData);

      res.json(result);

    } catch (err) {
      let newErrorLogData = {   
        userId: req.profile._id ,
        activity:  "Update" ,
        type: "Component" ,
        subType:"Enrollment" ,
        object_id: "",
        description:  "Update Enrollment Record" ,
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
  console.log("Enrollment.controller - readById -Start");
  const id = req.query.id;
  try {
    let learnerLesson = await Enrollment.findOne({_id: id});
    if (!learnerLesson)
      return res.status("400").json({
        error: "Enrollment not found",
      });
      return res.json(learnerLesson);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "readById" ,
      type: "Component" ,
      subType:"Enrollment" ,
      object_id: "",
      description:  "get readById Enrollment Record" ,
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

const listEnrolledCoursesInProgress = async (req, res) => {
  console.log("Enrollment.controller - listEnrolledCoursesInProgress -Start");
  //for (const key in req.query) {
  //  console.log("req.query - ", key, req.query[key]);
  //}
  const findQuery = createQueryObject(req.query);
  try {
    let response = await Enrollment.find(findQuery).select("topic description subType student course lastViewed markDeleted _id");
    res.json(response);
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "listEnrolledCoursesInProgress" ,
      type: "Component" ,
      subType:"Enrollment" ,
      object_id: "",
      description:  "listEnrolledCoursesInProgress Enrollment Record" ,
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

const enrollmentByID = async (req, res, next, id) => {
  console.log("Enrollment.controller - enrollmentByID -Start");
  try {
    let enrollment = await Enrollment.findById(id)
                                    .populate({path: 'course', populate:{ path: 'instructor'}})
                                    .populate('student', '_id name')
    if (!enrollment)
      return res.status('400').json({
        error: "Enrollment not found"
      })
    req.enrollment = enrollment
    next()
  } catch (err) {
    let newErrorLogData = {   
      userId: req.profile._id ,
      activity:  "enrollmentByID" ,
      type: "Component" ,
      subType:"Enrollment" ,
      object_id: "",
      description:  "enrollmentByID Enrollment Record" ,
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

const read = (req, res) => {
  return res.json(req.enrollment)
}

const complete = async (req, res) => {
  let updatedData = {}
  updatedData['lessonStatus.$.complete']= req.body.complete 
  updatedData.updated = Date.now()
  if(req.body.courseCompleted)
    updatedData.completed = req.body.courseCompleted

    try {
      let enrollment = await Enrollment.updateOne({'lessonStatus._id':req.body.lessonStatusId}, {'$set': updatedData})
      res.json(enrollment)
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
}

const remove = async (req, res) => {
  try {
    let enrollment = req.enrollment
    let deletedEnrollment = await enrollment.remove()
    res.json(deletedEnrollment)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const isStudent = (req, res, next) => {
  const isStudent = req.auth && req.auth._id == req.enrollment.student._id
  if (!isStudent) {
    return res.status('403').json({
      error: "User is not enrolled"
    })
  }
  next()
}

const listEnrolled = async (req, res) => {
  try {
    let enrollments = await Enrollment.find({student: req.auth._id}).sort({'completed': 1}).populate('course', '_id name category')
    res.json(enrollments)
  } catch (err) {
    console.log(err)
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const findEnrollment = async (req, res, next) => {
  try {
    let enrollments = await Enrollment.find({course:req.course._id, student: req.auth._id})
    if(enrollments.length == 0){
      next()
    }else{
      res.json(enrollments[0])
    }
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const enrollmentStats = async (req, res) => {
  try {
    let stats = {}
    stats.totalEnrolled = await Enrollment.find({course:req.course._id}).countDocuments()
    stats.totalCompleted = await Enrollment.find({course:req.course._id}).exists('completed', true).countDocuments()
      res.json(stats)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
} 

export default {
  create,
  update,
  readById,
  listEnrolledCoursesInProgress,
  enrollmentByID,
  read,
  remove,
  complete,
  isStudent,
  listEnrolled,
  findEnrollment,
  enrollmentStats
}
