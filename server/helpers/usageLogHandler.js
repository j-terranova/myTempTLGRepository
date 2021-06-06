import UsageLog from '../models/usageLog.model'
import errorHandler from "./../helpers/dbErrorHandler";

const createUsageLogEntry = async (newUsageLogData) => {
    try {
      const usageLogData = new UsageLog(newUsageLogData)
      console.log("Server Side - usageLog.controller - Create  before save - usageLogData  = ",usageLogData);
      let result = await usageLogData.save()
      console.log("Server Side - usageLog.controller - Create  after save - result  = ",result);
      console.log("Server Side - usageLog.controller - Create  UsageLog Created!");
      //res.json(result)
    } catch (err) {
      console.log("Server Side - createUsageLogEntry - errorHandler.getErrorMessage(err) = ",errorHandler.getErrorMessage(err));
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  
  }

  export default createUsageLogEntry;