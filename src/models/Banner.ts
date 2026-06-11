import mongoose, { Schema, Document } from 'mongoose';
import { IBanner } from '@/types';

export interface IBannerDocument extends Omit<IBanner, '_id'>, Document {}

const BannerSchema = new Schema<IBannerDocument>(
  {
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    image_desktop: { type: String, default: '' },
    image_mobile: { type: String, default: '' },
    cta_text: { type: String, default: '' },
    cta_link: { type: String, default: '' },
    order: { type: Number, default: 0 },
    is_active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Banner || mongoose.model<IBannerDocument>('Banner', BannerSchema);
