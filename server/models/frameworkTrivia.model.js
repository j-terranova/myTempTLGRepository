import mongoose from "mongoose";

function ignoreEmpty (val) {
  if ("" === val) {
    return undefined;
  } else {
    return val
  }
}

const FrameworkTriviaSchema = new mongoose.Schema({
  topic: {
    type: String,
    trim: true,
    required: "Topic is required",
  },
  description: {
    type: String,
    trim: true,
    required: "Description is required",
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
    default: "Statement",
    required: "Subtype is required",
  },
  difficultyLevel: {
    type: Number,
    required: "Difficulty level is required",
  },
  ageRange: {
    type: Number,
    required: "Age Range is required",
  },
  image_id: { type: mongoose.Schema.ObjectId, set: ignoreEmpty },
  imageFileName: {
    type: String,
    trim: true,
  },
  owner_id: {
    type: mongoose.Schema.ObjectId,
    required: "owner id is required",
  },
  group_id:  { type: mongoose.Schema.ObjectId, set: ignoreEmpty },
  keepPrivate: {
    type: Boolean,
    default: false,
  },
  approvedForPublicUse: {
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
      required: "Primary Column is required",
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

export default mongoose.model("FrameworkTrivia", FrameworkTriviaSchema);

