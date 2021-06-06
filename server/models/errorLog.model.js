import mongoose from "mongoose";

function ignoreEmpty (val) {
  if ("" === val) {
    return undefined;
  } else {
    return val
  }
}

const ErrorLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, set: ignoreEmpty },
  activity: {
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
  object_id: { type: mongoose.Schema.ObjectId, set: ignoreEmpty },
  description: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  errorCode: {
    type: String,
    trim: true,
  },
  errorMessage: {
    type: String,
    trim: true,
  },
  serverOrClient: {
    type: String,
    trim: true,
  },
  dateTimeStamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("ErrorLog", ErrorLogSchema);

