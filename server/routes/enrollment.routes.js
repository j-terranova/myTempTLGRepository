import express from 'express'
import enrollmentCtrl from '../controllers/enrollment.controller'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'
import courseCtrl from '../controllers/course.controller'

const router = express.Router()


router
.route("/api/enrollments/inprogress/by/:userId")
.get(
  authCtrl.requireSignin,
  authCtrl.hasAuthorization,
  enrollmentCtrl.listEnrolledCoursesInProgress
);
router
  .route("/api/enrollments/by/:userId")
  .post(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    enrollmentCtrl.create
  )
  .put(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    enrollmentCtrl.update
  )
  .get(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    enrollmentCtrl.readById
  );

router.route('/api/enrollment/enrolled')
  .get(authCtrl.requireSignin, enrollmentCtrl.listEnrolled)

router.route('/api/enrollment/new/:courseId')
  .post(authCtrl.requireSignin, enrollmentCtrl.findEnrollment, enrollmentCtrl.create)  

router.route('/api/enrollment/stats/:courseId')
  .get(enrollmentCtrl.enrollmentStats)

router.route('/api/enrollment/complete/:enrollmentId')
  .put(authCtrl.requireSignin, enrollmentCtrl.isStudent, enrollmentCtrl.complete) 

router.route('/api/enrollment/:enrollmentId')
  .get(authCtrl.requireSignin, enrollmentCtrl.isStudent, enrollmentCtrl.read)
  .delete(authCtrl.requireSignin, enrollmentCtrl.isStudent, enrollmentCtrl.remove)

router.param('courseId', courseCtrl.courseByID)
router.param('enrollmentId', enrollmentCtrl.enrollmentByID)
router.param("userId", userCtrl.userById);
export default router
