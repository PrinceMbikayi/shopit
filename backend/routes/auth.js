import express from 'express';
import { 
    allUsers, 
    deleteUser, 
    forgotPassword, 
    getUserDetails, 
    getUserProfile, 
    loginUser, 
    logout, 
    registerUser, 
    updatePassword, 
    updateProfile, 
    updateUser, 
    uploadAvatar} from '../controllers/authControllers.js';
    
import { authorizeRoles, isAuthenticatedUser } from '../middleware/auth.js'

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);

router.route("/password/forgot").post(forgotPassword);

router.route("/me").get(isAuthenticatedUser, getUserProfile);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/me/upload_avatar").put(isAuthenticatedUser, uploadAvatar);

router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles('admin'), allUsers);
router
    .route("/admin/users/:id")
    .get(isAuthenticatedUser, authorizeRoles('admin'), getUserDetails)
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateUser)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser);

export default router;