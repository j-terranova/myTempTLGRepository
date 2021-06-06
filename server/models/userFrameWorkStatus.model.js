import mongoose from "mongoose";

const FrameworkLessonSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: "Title is required",
  },
  description: {
    type: String,
    trim: true,
    required: "Description is required",
  },
  topic: {
    type: String,
    trim: true,
    required: "Topic is required",
  },
  myClass: {
    type: String,
    trim: true,
    required: "myClass is required",
  },
  category: {
    type: String,
    trim: true,
    required: "Category is required",
  },
  subject: {
    type: String,
    trim: true,
    required: "Subject is required",
  },
  type: {
    type: String,
    trim: true,
    default: "Framework",
    required: "Type is required",
  },
  subType: {
    type: String,
    trim: true,
    default: "Lesson",
    required: "Subtype is required",
  },
  difficultyLevel: {
    type: String,
    trim: true,
    required: "Difficulty level is required",
  },
  ageRange: {
    type: String,
    trim: true,
    required: "Age Range is required",
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  owner_id: {
    type: mongoose.Schema.ObjectId,
    required: "owner id is required",
  },
  groupsWithAccess: [statementGroupAccessSchema],
  allowFriendsReadAccess: {
    type: Boolean,
    default: false,
  },
  allowPublicReadAccess: {
    type: Boolean,
    default: false,
  },
  approvedPublicReadAccess: {
    type: Boolean,
    default: false,
  },
  frameworkLayoutFormat: {
    type: String,
    trim: true,
    required: "Layout Format is required",
  },
  frameworkResponseFormat: {
    type: String,
    trim: true,
    required: "Response Format is required",
  },
  frameworkPresentationMethod: {
    type: String,
    trim: true,
    required: "Presentation Method is required",
  },
  frameworkSolutionMethod: {
    type: String,
    trim: true,
    required: "Solution Method is required",
  },
  frameworkIncludeSpeech: {
    type: Boolean,
    default: false,
  },
  frameworkIncludeTimer: {
    type: Boolean,
    default: false,
  },
  frameworkIncludeScoring: {
    type: Boolean,
    default: false,
  },
  frameworkColor: {
    type: String,
    trim: true,
  },
  includeConstructs:[
    {
      sequenceNo: {
        type: Number,
      },
      constructDetail: {
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
      constructPrimaryColumn: {
        type: String,
        trim: true,
        required: "Premier Column is required",
      },
      constructOptionsSource: {
        type: String,
        trim: true,
        required: "Options Source is required",
      },
      constructNumberOfOptions: {
        type: Number,
        required: "Number of Options is required",
      },
      constructResponseFormat: {
        type: String,
        required: "Response Format is required",
      },
      constructColor: {
        type: String
      },
      constructId: {
        type: mongoose.Schema.ObjectId,
      },
    }],
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
});

export default mongoose.model("FrameworkLesson", FrameworkLessonSchema);

