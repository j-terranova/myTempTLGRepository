import mongoose from "mongoose";

function ignoreEmpty (val) {
  if ("" === val) {
    return undefined;
  } else {
    return val
  }
}

const ImageStoreSchema = new mongoose.Schema({
  fileNameInternal: {
    type: String,
    trim: true,
  },
  fileNameExternal: {
    type: String,
    trim: true,
  },
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
  difficultyLevel: {
    type: Number,
    required: "Difficulty level is required",
  },
  ageRange: {
    type: Number,
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
  group_id:  { type: mongoose.Schema.ObjectId, set: ignoreEmpty },
  keepPrivate: {
    type: Boolean,
    default: false,
  },
  approvedForPublicUse: {
    type: Boolean,
    default: false,
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

ImageStoreSchema.methods.toJSON = function () {
  const result = this.toObject();
  delete result.image;
  return result;
};

export default mongoose.model("ImageStore", ImageStoreSchema);

