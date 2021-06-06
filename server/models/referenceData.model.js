import mongoose from "mongoose";

const referenceDataSchema = new mongoose.Schema({
  tag: { type: String },
  tagValue: { type: String },
  dependency: { type: String },
  dependencyValue: { type: String },
  active: { type: String },
});
const ReferenceData = mongoose.model("ReferenceData", referenceDataSchema);

//function createDefaultReferenceData() {
//    ReferenceData.find({}).exec(function(err, collection) {
//        if(collection.length === 0) {
//            ReferenceData.create({ tag: 'Subject',
//                 tagValue: 'Reading',
//                 dependency: 'Training',
//                 dependencyValue: 'Finance',
//                 active: 'Academic'
//            });
//        }
//    })
//}

export default mongoose.model("ReferenceData", referenceDataSchema);
