import mongoose from "mongoose";

const FrameworkRecentlyViewedSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    required: "User Id is required",
  },
  framework_id: {
    type: mongoose.Schema.ObjectId,
    required: "Framework Id is required",
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
        default: "Construct",
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
      correctResponses:{
        type: [String]
      },
      selectedValues: {
        type: [String]
      },
      responseStatus: {
        type: String,
        trim: true,
      },
      constructId: {
        type: mongoose.Schema.ObjectId,
      },
    }],
  frameworkStatus: {
    type: String,
  },
  numberCorrect: {
    type: Number,
  },  
  numberInTest: {
    type: Number,
  }, 
  scale: {
    type: Number,
  },  
  startDate: {
    type: Date,
    default: Date.now,
  },
  completedDate: {
    type: Date,
    default: Date.now,
  },
  updateDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("FrameworkRecentlyViewed", FrameworkRecentlyViewedSchema);

