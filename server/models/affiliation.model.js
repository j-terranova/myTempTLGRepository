import mongoose from 'mongoose'
import crypto from 'crypto'

const UserGroupAccessSchema = new mongoose.Schema({
  group_id: { 
    type: mongoose.Schema.ObjectId,
    required: "Group is required"
  },
  groupName: { type: String },
  role: {type: String},
  AccessLevel: {
    type: String,
    trim: true,
    default: "ReadOnly", //ReadWrite
  },
});

const AffiliationSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name is required'
  },
  aliasName: {
    type: String,
    trim: true,
    required: 'Name is required'
  },
  city: {
    type: String,
    trim: true,
    required: 'City is required'
  },
  state: {
    type: String,
    trim: true,
    required: 'State is required'
  },
  zip: {
    type: String,
    trim: true,
    required: 'Zip is required'
  },
  address1: {
    type: String,
    trim: true,
    required: 'Address is required'
  },
  address2: {
    type: String,
    trim: true,
  },
  instructorGroup_id: { 
    type: mongoose.Schema.ObjectId,
  },
  adminGroup_id: { 
    type: mongoose.Schema.ObjectId,
  },
  internalUserGroup_id: { 
    type: mongoose.Schema.ObjectId,
  },
  externalUserGroups: { 
    type: [mongoose.Schema.ObjectId],
  },
})

export default mongoose.model('Affiliation', AffiliationSchema)
