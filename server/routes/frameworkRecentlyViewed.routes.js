import express from "express";
import frameworkRecentlyViewedCtrl from "../controllers/frameworkRecentlyViewed.controller";
import userCtrl from "../controllers/user.controller";
import authCtrl from "../controllers/auth.controller";

const router = express.Router();

router
.route("/api/frameworks/recentlyviewed/lessons/by/:userId")
.get(
  authCtrl.requireSignin,
  authCtrl.hasAuthorization,
  frameworkRecentlyViewedCtrl.listRecentlyViewed
);
router
.route("/api/frameworks/recentlyviewed/lessons/bySubType/:userId")
.get(
  authCtrl.requireSignin,
  authCtrl.hasAuthorization,
  frameworkRecentlyViewedCtrl.readRecentlyViewedBySubType
);
router
  .route("/api/frameworks/recentlyviewed/by/:userId")
  .post(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    frameworkRecentlyViewedCtrl.create
  )
  .put(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    frameworkRecentlyViewedCtrl.update
  )
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    frameworkRecentlyViewedCtrl.readById
  );

router.param("userId", userCtrl.userById);

export default router;
