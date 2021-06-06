import mongoose from "mongoose";

const GamerResultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    required: "User Id is required",
  },
  framework_id: {
    type: mongoose.Schema.ObjectId,
    required: "Framework Id is required",
  },
  description: {
    type: String,
    trim: true,
    required: "Description is required",
  },
  topic: {
    type: String,
    trim: true,
    required: "Topic is required",
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
    default: "Framework",
    required: "Type is required",
  },
  subType: {
    type: String,
    trim: true,
    default: "TicTacToe",
    required: "Subtype is required",
  },
  playerLevel: {
    type: Number,
    required: "Player Level is required",
  },
  gamerLevel: {
    type: Number,
    required: "Gamer Level is required",
  },
  playTime: {
    type: Number,  //Seconds
  },
  gamerScore: {
    type: Number,
  },
  gamerLevelMaxScore: {
    type: Number,
  }, 
  inCorrectAttempts: {
    type: Number,
  }, 
  numberCorrect: {
    type: Number,
  },
  gamerStatus: {
    type: String,
  },
  opponent: {
    type: String,
  },
  winLossDraw: {
    type: String,
  },
  includeConstructs:[
    {
      sequenceNo: {
        type: Number,
      },
      constructPrimaryColumn: {
        type: String,
        trim: true,
        required: "Primary Column is required",
      },
      correctResponses:{
        type: [String]
      },
      selectedValues: {
        type: [String]
      },
      responseStatus: {
        type: String,
        trim: true,
      },
      constructId: {
        type: mongoose.Schema.ObjectId,
      },
    }], 
  startDate: {
    type: Date,
  },
  completedDate: {
    type: Date,
  },
  updateDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("GamerResult", GamerResultSchema);

