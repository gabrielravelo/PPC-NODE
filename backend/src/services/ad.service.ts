import { AdRepository } from '../repositories/ad.repository';

export class AdService {
  private adRepo = new AdRepository();

  async listAds() {
    return this.adRepo.findAll();
  }

  async createAd(title: string, imageUrl: string, targetUrl: string) {
    return this.adRepo.create({ title, imageUrl, targetUrl, clickCount: 0 });
  }

  async clickAd(adId: string) {
    const ad = await this.adRepo.incrementClickCount(adId);
    if (!ad) throw new Error('Ad not found');
    return ad;
  }
}
