import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validateRequest';

const router = Router();
const authController = new AuthController();

// router.post('/register', authController.register.bind(authController));
// router.post('/login', authController.login.bind(authController));

// POST /auth/register
router.post(
  '/register',
  [
    body('username').isString().isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    body('password').isString().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    validateRequest,
  ],
  authController.register
)

// POST /auth/login
router.post(
  '/login',
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
    validateRequest,
  ],
  authController.login
)

export default router;
