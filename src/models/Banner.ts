import mongoose, { Schema, Document } from 'mongoose';
import { IBanner } from '@/types';

export interface IBannerDocument extends Omit<IBanner, '_id'>, Document {}

const BannerSchema = new Schema<IBannerDocument>(
  {
    title: { type: String, required: true },
    subtitle: { type: String },
    image_desktop: { type: String, required: true },
    image_mobile: { type: String, required: true },
    cta_text: { type: String },
    cta_link: { type: String },
    order: { type: Number, default: 0 },
    is_active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Banner || mongoose.model<IBannerDocument>('Banner', BannerSchema);
