import express from "express";
import referenceDataCtrl from "../controllers/referenceData.controller";
import userCtrl from "../controllers/user.controller";
import authCtrl from "../controllers/auth.controller";

const router = express.Router();

router
  .route("/api/lookupOptions/by/:tag")
  .get(authCtrl.requireSignin, referenceDataCtrl.readByTag);

  export default router;
