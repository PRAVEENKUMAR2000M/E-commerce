import express from 'express';
import {
  createUser,
  createAdminUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById
} from '../controllers/userController.js';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', createUser);
// router.post('/login', loginUser);
router.post('/auth', loginUser);
router.post('/create-admin', createAdminUser);
router.post('/logout', logoutCurrentUser);

router.route('/')
  .get(authenticate, authorizeAdmin, getAllUsers);

router.route('/profile')
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate, updateCurrentUserProfile);

router.route('/:id')
  .delete(authenticate, authorizeAdmin, deleteUserById)
  .get(authenticate, authorizeAdmin, getUserById)
  .put(authenticate, authorizeAdmin, updateUserById);

export default router;
