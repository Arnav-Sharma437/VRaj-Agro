import mongoose, { Schema, Document } from 'mongoose';
import { IProduct } from '@/types';

export interface IProductDocument extends Omit<IProduct, '_id' | 'category'>, Document {
  category: mongoose.Types.ObjectId;
}

const ProductSchema = new Schema<IProductDocument>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    images: { type: [String], required: true, default: [] },
    short_description: { type: String, required: true },
    full_description: { type: String },
    specifications: { type: Map, of: String, default: {} },
    features: { type: [String], default: [] },
    applications: { type: [String], default: [] },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    is_featured: { type: Boolean, default: false },
    is_active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model<IProductDocument>('Product', ProductSchema);
