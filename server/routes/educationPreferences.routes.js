import express from "express";
import educationPreferencesCtrl from "../controllers/educationPreferences.controller";
import userCtrl from "../controllers/user.controller";
import authCtrl from "../controllers/auth.controller";

const router = express.Router();

router
  .route("/api/educations/preferences/by/:userId")
  .post(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    educationPreferencesCtrl.create
  )
  .put(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    educationPreferencesCtrl.update
  )
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    educationPreferencesCtrl.readById
  );

router.param("userId", userCtrl.userById);

export default router;
