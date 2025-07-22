import mongoose, { Document, Schema } from 'mongoose';

export interface IAd extends Document {
  title: string;
  imageUrl: string;
  targetUrl: string;
  clickCount: number;
  createdAt: Date;
}

const adSchema = new Schema<IAd>({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  targetUrl: { type: String, required: true },
  clickCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export const Ad = mongoose.model<IAd>('Ad', adSchema);
