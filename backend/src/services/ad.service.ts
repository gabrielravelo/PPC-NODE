import { AdRepository } from '../repositories/ad.repository';
import { Click } from '../models/click.model';
import { config } from '../config/env';

export class AdService {
  private adRepo = new AdRepository();

  async listAds(page: number = 1, limit: number = 5) {
    return this.adRepo.findPaginated(page, limit)
  }

  async createAd(title: string, imageUrl: string, targetUrl: string) {
    return this.adRepo.create({ title, imageUrl, targetUrl, clickCount: 0 });
  }

  async clickAd(adId: string, userId: string) {
    const timeout = config.AD_CLICK_TIMEOUT_SECONDS

    const lastClick = await Click.findOne({ ad: adId, user: userId }).sort({ createdAt: -1 })

    if (lastClick) {
      const secondsSinceLastClick = (Date.now() - lastClick.createdAt.getTime()) / 1000
      if (secondsSinceLastClick < timeout) {
        const remaining = Math.ceil(timeout - secondsSinceLastClick)
        throw new Error(`You must wait ${remaining}s before clicking again.`)
      }
    }

    await Click.create({ ad: adId, user: userId })

    const ad = await this.adRepo.incrementClickCount(adId)
    if (!ad) throw new Error('Ad not found')
    return ad
  }
}
