import User from '../models/user.model'
import createUsageLogEntry from "./../helpers/usageLogHandler";
import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import config from './../../config/config'
import { ContactsOutlined } from '@material-ui/icons';

const signin = async (req, res) => {
  try {
    let user = await User.findOne({
      "email": req.body.email
    })
    if (!user)
    {
      let newUsageLogData = {   
        userId: "" ,
        activity:  "Attempted SignIn" ,
        type: "unAuthorized" ,
        subType:"Bad User Id" ,
        object_id: "" ,
        description:  "SignIn attempted by: " + req.body.email ,
        email: req.body.email,
        dateTimeStamp: Date.now() ,
      };
      createUsageLogEntry(newUsageLogData);
      return res.status('401').json({
        error: "User not found"
      })
    }

    if (!user.authenticate(req.body.password)) {
      let newUsageLogData = {   
        userId: "" ,
        activity:  "Attempted SignIn" ,
        type: "unAuthorized" ,
        subType:"Bad Password" ,
        object_id: "" ,
        description:  "SignIn attempted by: " + req.body.email ,
        email: req.body.email,
        dateTimeStamp: Date.now() ,
      };
      createUsageLogEntry(newUsageLogData);
      return res.status('401').send({
        error: "Email and password don't match."
      })
    }

    const token = jwt.sign({
      _id: user._id
    }, config.jwtSecret)

    let newUsageLogData = {   
      userId: user._id ,
      activity:  "SignIn" ,
      type: "Authorized" ,
      subType:"Authorized" ,
      object_id: user._id ,
      description:  "SignIn by: " + req.body.email ,
      email: req.body.email ,
      dateTimeStamp: Date.now() ,
    };
    createUsageLogEntry(newUsageLogData);
    res.cookie("t", token, {
      expire: new Date() + 9999
    })

    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        educator: user.educator
      }
    })

  } catch (err) {

    let newUsageLogData = {   
      userId: "" ,
      activity:  "Attempted SignIn" ,
      type: "unAuthorized" ,
      subType:"Error Logging In" ,
      object_id: "" ,
      description:  "SignIn attempted by: " + req.body.email ,
      email: req.body.email,
      dateTimeStamp: Date.now() ,
    };
    createUsageLogEntry(newUsageLogData);

    return res.status('401').json({
      error: "Could not sign in"
    })

  }
}

const signout = (req, res) => {

  res.clearCookie("t")
  return res.status('200').json({
    message: "signed out"
  })
}

const requireSignin = expressJwt({
  secret: config.jwtSecret,
  userProperty: 'auth'
})

const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id
  if (!(authorized)) {
    let newUsageLogData = {   
      userId: "" ,
      activity:  "hasAuthorization" ,
      type: "unAuthorized" ,
      subType:"User is not authorized" ,
      object_id: "" ,
      description:  "hasAuthorization - User is not authorized",
      email: req.body.email,
      dateTimeStamp: Date.now() ,
    };
    createUsageLogEntry(newUsageLogData);
    return res.status('403').json({
      error: "User is not authorized"
    })
  }
  next()
}

export default {
  signin,
  signout,
  requireSignin,
  hasAuthorization
}
