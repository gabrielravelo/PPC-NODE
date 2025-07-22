import { Request, Response } from 'express';
import { AdService } from '../services/ad.service';

const adService = new AdService();

export class AdController {
  async listAds(req: Request, res: Response) {
    try {
      const ads = await adService.listAds();
      res.json(ads);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
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
      const { id } = req.params;
      const ad = await adService.clickAd(id);
      res.json(ad);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  }
}
