import mongoose from 'mongoose'

const LessonSchema = new mongoose.Schema({
  title: String,
  content: String,
  resource_url: String
})

function ignoreEmpty (val) {
  if ("" === val) {
    return undefined;
  } else {
    return val
  }
}

const Lesson = mongoose.model('Lesson', LessonSchema)
const CourseSchema = new mongoose.Schema({
  affiliation_id: {
    type: mongoose.Schema.ObjectId,
  },
  name: {
    type: String,
    trim: true,
  },
  title: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
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
    default: "Component",
  },
  subType: {
    type: String,
    trim: true,
    default: "Association",
  },
  difficultyLevel: {
    type: String,
    trim: true,
  },
  ageRange: {
    type: String,
    trim: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  owner_id: {
    type: mongoose.Schema.ObjectId,
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
  },
  updateDate: {
    type: Date,
    default: Date.now,
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  },
  instructor: {type: mongoose.Schema.ObjectId, ref: 'User'},
  published: {
    type: Boolean,
    default: false
  },
  lessons: [LessonSchema]
})

export default mongoose.model('Course', CourseSchema)
