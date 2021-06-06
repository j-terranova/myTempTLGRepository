import mongoose from 'mongoose'
import crypto from 'crypto'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name is required'
  },
  email: {
    type: String,
    trim: true,
    unique: 'Email already exists',
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    required: 'Email is required'
  },
  hashed_password: {
    type: String,
    required: "Password is required"
  },
  salt: String,
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  },
  educator: {
    type: Boolean,
    default: false
  },
  status : {
    type: String,
    default: "Active",  //Inactive
  },
  affiliation_id: {
    type:  mongoose.Schema.ObjectId,
  },
  importLimit: {
    type: Number,
    default: 50
  },
  membershipLevel: {
    type:String,
    default: "Standard"}, //Platinum, Gold, Silver, Bronze, Standard, Public
  lastName: {
    type: String,
    trim: true,
  },
  firstName: {
    type: String,
    trim: true,
  },
  homePhoneNumber: {type:String},
  cellPhonenumber: {type:String}, 
  city:  {type:String},
  state:  {type:String},
  province:  {type:String},
  zip:  {type:String},
  monthOfBirth:  {type:String},
  yearOfBirth:  {type:String},
  highSchoolDiploma:  {type:String},
  collegeDegree1:  {type:String},
  collegeDegree2:  {type:String},
  collegeDegree3:  {type:String},
  verificationQuestion1: {type:String},
  verificationAnswer1: {type:String},
  verificationQuestion2: {type:String},
  verificationAnswer2: {type:String},
  verificationQuestion3: {type:String},
  verificationAnswer3: {type:String},
  okToSendEmailPromos: {type:String},
  okToSendEmailSystemAlerts: {type:String},
  groupsUserOwns: {
    type: [{type: mongoose.Schema.ObjectId, ref: 'GroupAccess'}]
  },
  groupsUserMembership: {
    type: [{type: mongoose.Schema.ObjectId, ref: 'GroupAccess'}]
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
})

UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
  })
  .get(function() {
    return this._password
  })

UserSchema.path('hashed_password').validate(function(v) {
  if (this._password && this._password.length < 6) {
    this.invalidate('password', 'Password must be at least 6 characters.')
  }
  if (this.isNew && !this._password) {
    this.invalidate('password', 'Password is required')
  }
}, null)

UserSchema.methods = {
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password
  },
  encryptPassword: function(password) {
    if (!password) return ''
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex')
    } catch (err) {
      return ''
    }
  },
  makeSalt: function() {
    return Math.round((new Date().valueOf() * Math.random())) + ''
  }
}

export default mongoose.model('User', UserSchema)
