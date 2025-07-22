import { Ad, IAd } from '../models/ad.model';

export class AdRepository {
  async findAll(): Promise<IAd[]> {
    return Ad.find().sort({ createdAt: -1 });
  }

  async findById(id: string): Promise<IAd | null> {
    return Ad.findById(id);
  }

  async create(adData: Partial<IAd>): Promise<IAd> {
    const ad = new Ad(adData);
    return ad.save();
  }

  async incrementClickCount(adId: string): Promise<IAd | null> {
    return Ad.findByIdAndUpdate(adId, { $inc: { clickCount: 1 } }, { new: true });
  }
}
