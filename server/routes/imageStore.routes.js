import express from "express";
import imageStoreCtrl from "../controllers/imageStore.controller";
import userCtrl from "../controllers/user.controller";
import authCtrl from "../controllers/auth.controller";

const router = express.Router();
router
  .route("/api/imageStores/by/:userId")
  .post(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    imageStoreCtrl.create
  )
  .put(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    imageStoreCtrl.update
  )
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    imageStoreCtrl.listByOwner
  );

router
.route("/api/imageStores/byId/:userId")
.get(
  authCtrl.requireSignin,
  authCtrl.hasAuthorization,
  imageStoreCtrl.readById)

  router
  .route("/api/imageStores/byMaxUpdateDate/:userId")
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    imageStoreCtrl.getCurrentImageByMaxUpdateDateAndUserId
  );

router
  .route("/api/imageStores/byCriteria/:userId")
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    imageStoreCtrl.listByCriteria
  );

router
  .route("/api/imageStores/photo/:imageStoreId")
  .get(imageStoreCtrl.photo, imageStoreCtrl.defaultPhoto);

router
  .route("/api/imageStores/defaultphoto")
  .get(imageStoreCtrl.defaultPhoto);

router
  .route("/api/imageStores/:imageStoreId")
  .get(
    authCtrl.requireSignin,
    //authCtrl.hasAuthorization,
    imageStoreCtrl.readById)

router.param(
  "imageStoreId",
  imageStoreCtrl.imageStoreById
);
router.param("userId", userCtrl.userById);

export default router;
