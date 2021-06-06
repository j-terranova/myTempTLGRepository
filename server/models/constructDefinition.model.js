import mongoose from "mongoose";

function ignoreEmpty (val) {
  if ("" === val) {
    return undefined;
  } else {
    return val
  }
}

const ConstructDefinitionSchema = new mongoose.Schema({
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
    default: "Component",
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
  constructDefinition:{  
    wordToDefine: {
      type: String,
      required: "Word to define is required"
    },
    soundOut:  {
      type: String,
      default: ""
    },
    partOfSpeech:  {
      type: String,
      default: ""
    },
    etymology:  {
      type: String,
      default: ""
    },
    classification:  {
      type: String,
      default: ""
    },
    pluralForm:  {
      type: String,
      default: ""
    },
    wordUseExample: {
      type: String,
      default: ""
    },
    wordDefinitions: {
      type: [String]
    },
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
});

export default mongoose.model("ConstructDefinition", ConstructDefinitionSchema);

