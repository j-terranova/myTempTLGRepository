import mongoose from "mongoose";

function ignoreEmpty (val) {
  if ("" === val) {
    return undefined;
  } else {
    return val
  }
}

const ConstructPreferenceSchema = new mongoose.Schema({
  user_id: {
      type: mongoose.Schema.ObjectId,
      required: "User Id is required",
    },
    topic: {
    type: String,
    trim: true,
  },
  myClass: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    trim: true,
  },
  subject: {
    type: String,
    trim: true,
  },
  type: {
    type: String,
    trim: true,
  },
  subType: {
    type: String,
    trim: true,
  },
  difficultyLevel: {
    type: Number,
  },
  ageRange: {
    type: Number,
  },
  group_id:  { type: mongoose.Schema.ObjectId, set: ignoreEmpty },

  keepPrivate: {
    type: Boolean,
    default: false,
  },
  rowsPerPage: {
    type: Number,
  },
  themeBrightness: {
    type: String,
    trim: true,
  },
  primaryButtonColor: {
    type: String,
    trim: true,
  },
  primaryBackgroundColor: {
    type: String,
    trim: true,
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
  updatedBy: { type: mongoose.Schema.ObjectId, set: ignoreEmpty },
  updateDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("ConstructPreference", ConstructPreferenceSchema);

