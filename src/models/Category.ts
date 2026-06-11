import mongoose, { Schema, Document } from 'mongoose';
import { ICategory } from '@/types';

export interface ICategoryDocument extends Omit<ICategory, '_id'>, Document {}

const CategorySchema = new Schema<ICategoryDocument>(
  {
    name: { type: String, default: '' },
    slug: { type: String, unique: true, sparse: true },
    image: { type: String, default: '' },
    description: { type: String, default: '' },
    is_active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Category || mongoose.model<ICategoryDocument>('Category', CategorySchema);
