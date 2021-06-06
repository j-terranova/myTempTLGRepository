import mongoose from 'mongoose'

const EnrollmentSchema = new mongoose.Schema({
  student: {type: mongoose.Schema.ObjectId, ref: 'User'},
  teacher: {type: mongoose.Schema.ObjectId, ref: 'User'},
  course: {type: mongoose.Schema.ObjectId, ref: 'Course'},
  updated: Date,
  enrolled: {
    type: Date,
    default: Date.now
  },
  assignments:[
    {
      sequenceNo: {
        type: Number,
      },
      topic: {
        type: String
      },
      description: {
        type: String
      },
      type: {
        type: String,
        trim: true,
        default: "Framework",
      },
      subType: {
        type: String,
        trim: true,
      },
      percentComplete: {
        type: Number,
      },
      percentOfGrade: {
        type: Number,
      },
      rawGrade: {
        type: Number,
      },
      scaledGrade: {
        type: Number,
      },
      extraGradeCredit: {
        type: Number,
      },
      firstViewed: {
        type: Date,
        default: Date.now,
      },
      lastViewed: {
        type: Date,
        default: Date.now,
      },
      dateCompleted: {
        type: Date,
        default: Date.now,
      },
      frameworkId: {
        type: mongoose.Schema.ObjectId,
      },
    }],
    percentComplete: {
      type: Number,
    },
    courseStatus: {
      type: String,
    },
    courseGrade: {
      type: Number,
    },
    firstViewed: {
      type: Date,
      default: Date.now,
    },
    lastViewed: {
      type: Date,
      default: Date.now,
    },
    dateCompleted: {
      type: Date,
      default: Date.now,
    },
    markDeleted: {
      type: Boolean,
      default: false,
    },
    createDate: {
      type: Date,
      default: Date.now,
    },
    updatedBy: {
      type: mongoose.Schema.ObjectId,
      required: "updatedBy is required",
    },
    updateDate: {
      type: Date,
      default: Date.now,
    },
  lessonStatus: [{
      lesson: {type: mongoose.Schema.ObjectId, ref: 'Lesson'}, 
      complete: Boolean}],
  completed: Date
})

export default mongoose.model('Enrollment', EnrollmentSchema)
