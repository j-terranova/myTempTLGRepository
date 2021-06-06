import mongoose from "mongoose";

const GroupAccessSchema = new mongoose.Schema({
  owner_id: { type: mongoose.Schema.ObjectId},
  groupName: { 
    type: String,
    required: "Group Name Required" },
  groupDescription: { type: String },
  groupFunction:  { 
    type: String,
    required: "Group Function Required" },
  role:  { //SuperUser, Admin/Owner, Contributor, User/Student, Public 
    type: String,
    trim: true,
    default: "Public" },
  userList: {
    type: [{type: mongoose.Schema.ObjectId, ref: 'User'}]
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

export default mongoose.model("GroupAccess", GroupAccessSchema);

