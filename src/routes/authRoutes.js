import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  loginUser,
  logoutUser,
  registerUser,
  refreshUserSession,
  requestResetEmail,
  resetPassword,
} from '../controllers/authController.js';
import {
  loginUserSchema,
  registerUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validations/authValidation.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.post(
  '/register',
  celebrate(registerUserSchema),
  ctrlWrapper(registerUser),
);
router.post('/login', celebrate(loginUserSchema), ctrlWrapper(loginUser));
router.post('/refresh', ctrlWrapper(refreshUserSession));
router.post('/logout', ctrlWrapper(logoutUser));
router.post(
  '/request-reset-email',
  celebrate(requestResetEmailSchema),
  ctrlWrapper(requestResetEmail),
);
router.post(
  '/reset-password',
  celebrate(resetPasswordSchema),
  ctrlWrapper(resetPassword),
);

export default router;
