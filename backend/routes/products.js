import express from 'express';
import { canUserReview, 
         createProductReview, 
         deleteProduct, 
         deleteProductImage, 
         deleteReview, 
         getAdminProducts, 
         getProductDetails, 
         getProductReviews, 
         getProducts, 
         newProduct, 
         updateProduct, 
         uploadProductImages} from '../controllers/productControllers.js';
import { authorizeRoles, isAuthenticatedUser } from '../middleware/auth.js';

const router = express.Router();

router.route("/products").get(getProducts);
router.route("/admin/products").post(isAuthenticatedUser, authorizeRoles('admin'), newProduct);

router.route("/admin/products").get(isAuthenticatedUser, authorizeRoles('admin'), getAdminProducts);

router.route("/admin/products/:id/upload_images").put(isAuthenticatedUser, authorizeRoles('admin'), uploadProductImages);

router.route("/admin/products/:id/delete_image").put(isAuthenticatedUser, authorizeRoles('admin'), deleteProductImage);

// Get Product Details
router.route("/products/:id").get(getProductDetails);

// Update Product Deatils
router.route("/admin/products/:id").put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct);

// Delete Product
router.route("/admin/products/:id").delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);

router
.route("/reviews")
.get(isAuthenticatedUser, getProductReviews)
.put(isAuthenticatedUser, createProductReview);

router
.route("/admin/reviews")
.delete(isAuthenticatedUser, authorizeRoles('admin'), deleteReview)

router
.route("/can_review")
.get(isAuthenticatedUser, canUserReview)

export default router;