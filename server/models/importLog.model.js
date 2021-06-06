import mongoose from "mongoose";

const ImportLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    required: "updatedBy is required",
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
    default: "UNKNOWN",
    required: "Subtype is required",
  },
  importDateNumber: {
    type: Number,
    required: "ImportDateNumber is required",
  },
  fileName: {
    type: String,
    trim: true,
    required: "FileName is required",
  },
  importCount: {
    type: Number,
    default: 50,
  },
  importDateTime: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("ImportLog", ImportLogSchema);

