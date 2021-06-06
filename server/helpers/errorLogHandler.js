import ErrorLog from '../models/errorLog.model'
import errorHandler from "./../helpers/dbErrorHandler";

const createErrorLogEntry = async (newErrorLogData) => {
    try {
      const errorLogData = new ErrorLog(newErrorLogData)
      console.log("Server Side - errorLog.controller - Create  before save - errorLogData  = ",errorLogData);
      let result = await errorLogData.save()
      console.log("Server Side - errorLog.controller - Create  after save - result  = ",result);
      console.log("Server Side - errorLog.controller - Create  ErrorLog Created!");
      //res.json(result)
    } catch (err) {
      console.log("Server Side - createErrorLogEntry - errorHandler.getErrorMessage(err) = ",errorHandler.getErrorMessage(err));
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  
  }

  export default createErrorLogEntry;