import { Router } from 'express';
import { AdController } from '../controllers/ad.controller';
import { authenticateJWT, authorizeAdmin } from '../middlewares/auth.middleware';

const router = Router();
const adController = new AdController();

// List ads for any authenticated user
router.get('/', authenticateJWT, adController.listAds.bind(adController));

// Create ad only for admin
router.post('/', authenticateJWT, authorizeAdmin, adController.createAd.bind(adController));

// Increment click count (any authenticated user)
router.post('/:id/click', authenticateJWT, adController.clickAd.bind(adController));

export default router;
