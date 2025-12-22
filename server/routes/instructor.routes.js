import {Router } from "express";
import isLoggedIn, { isAdmin, isAdminOrInstructor, isInstructor } from "../middlewares/auth.user.js";
import {
  createInstructorProfile,getMyInstructorProfile,updateInstructorProfile,getPublicInstructorProfile,
  getInstructorDashboardStats,getInstructorPerformance,getEarningsOverview,setupPayoutMethod,
  requestPayout,updateTaxInfo,getVerificationStatus,
  getRatingsBreakdown,getAllInstructors,searchInstructors,
  adminVerifyInstructor,toggleFeaturedInstructor,suspendInstructor,unsuspendInstructor,
} from "../controller/instructor.controller.js";

const istRoutes = Router();

istRoutes.post("/",isLoggedIn,isAdmin,createInstructorProfile);
istRoutes.get("/",isLoggedIn,isAdminOrInstructor,getMyInstructorProfile);
istRoutes.put("/me",isLoggedIn,isAdminOrInstructor,updateInstructorProfile);
istRoutes.get("/dashboard",isLoggedIn,isAdminOrInstructor,getInstructorDashboardStats);
istRoutes.get("/:id",isLoggedIn,getPublicInstructorProfile);
istRoutes.get("/performance",isLoggedIn,isAdminOrInstructor,getInstructorPerformance);
istRoutes.get("/earnings",isLoggedIn,getEarningsOverview);
istRoutes.post("/payout-method",isLoggedIn,isAdminOrInstructor,setupPayoutMethod);
istRoutes.post("/request-payout",isLoggedIn,isAdminOrInstructor,requestPayout);
istRoutes.put("/tax-info",isLoggedIn,isAdminOrInstructor,updateTaxInfo);
istRoutes.get("/verification-status",isLoggedIn,isAdminOrInstructor,getVerificationStatus);
istRoutes.get("/ratings",isLoggedIn,getRatingsBreakdown);
istRoutes.get("/",getAllInstructors);
istRoutes.get("/search/query",searchInstructors);
istRoutes.patch("/admin/:id/verify",isLoggedIn, isAdmin,adminVerifyInstructor);
istRoutes.patch("/admin/:id/feature",isLoggedIn,isAdmin,toggleFeaturedInstructor);
istRoutes.patch("/admin/:id/suspend",isLoggedIn,isAdmin,suspendInstructor);
istRoutes.patch("/admin/:id/unsuspend",isLoggedIn,isAdmin,unsuspendInstructor);

export default istRoutes;
