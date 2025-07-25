import { Request, Response } from 'express';
import { AdService } from '../services/ad.service';
import { config } from '../config/env';

const adService = new AdService();

export class AdController {
  async listAds(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 5;

      const { data, total, totalPages, page: currentPage, limit: resultLimit } = await adService.listAds(page, limit);

      res.json({
        data,
        total,
        totalPages,
        page: currentPage,
        limit: resultLimit,
        clickTimeoutSeconds: config.AD_CLICK_TIMEOUT_SECONDS,
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message })
    }
  }

  async createAd(req: Request, res: Response) {
    try {
      const { title, imageUrl, targetUrl } = req.body;
      const ad = await adService.createAd(title, imageUrl, targetUrl);
      res.status(201).json(ad);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async clickAd(req: Request, res: Response) {
    try {
      const { id } = req.params
      const userId = (req as any).user?.id

      if (!userId) return res.status(401).json({ error: 'Unauthorized' })

      const ad = await adService.clickAd(id, userId)
      res.json(ad)
    } catch (err: any) {
      res.status(400).json({ error: err.message })
    }
  }
}
