import express from "express";
import constructPreferencesCtrl from "../controllers/constructPreferences.controller";
import userCtrl from "../controllers/user.controller";
import authCtrl from "../controllers/auth.controller";

const router = express.Router();

router
  .route("/api/constructs/preferences/by/:userId")
  .post(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructPreferencesCtrl.create
  )
  .put(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructPreferencesCtrl.update
  )
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    constructPreferencesCtrl.readById
  );

router.param("userId", userCtrl.userById);

export default router;
