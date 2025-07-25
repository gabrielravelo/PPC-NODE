import { Ad, IAd } from '../models/ad.model';

export class AdRepository {
  async findAll(): Promise<IAd[]> {
    return Ad.find().sort({ createdAt: -1 });
  }

  async findPaginated(page: number, limit: number): Promise<{
    data: IAd[];
    total: number;
    totalPages: number;
    page: number;
    limit: number;
  }> {
    const skip = (page - 1) * limit;

    const [ads, total] = await Promise.all([
      Ad.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      Ad.countDocuments(),
    ]);

    return {
      data: ads,
      total,
      totalPages: Math.ceil(total / limit),
      page,
      limit,
    };
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
