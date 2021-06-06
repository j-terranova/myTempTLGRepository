import express from "express";
import gamerPreferencesCtrl from "../controllers/gamerPreferences.controller";
import userCtrl from "../controllers/user.controller";
import authCtrl from "../controllers/auth.controller";

const router = express.Router();

router
  .route("/api/games/preferences/by/:userId")
  .post(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    gamerPreferencesCtrl.create
  )
  .put(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    gamerPreferencesCtrl.update
  )
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    gamerPreferencesCtrl.readById
  );

router.param("userId", userCtrl.userById);

export default router;
