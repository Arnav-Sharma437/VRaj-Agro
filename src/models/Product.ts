import mongoose, { Schema, Document } from 'mongoose';
import { IProduct } from '@/types';

export interface IProductDocument extends Omit<IProduct, '_id' | 'category'>, Document {
  category: mongoose.Types.ObjectId;
}

const ProductSchema = new Schema<IProductDocument>(
  {
    name: { type: String, required: true },
    slug: { type: String, default: '' },
    images: { type: [String], default: [] },
    short_description: { type: String, default: '' },
    full_description: { type: String, default: '' },
    specifications: { type: Map, of: String, default: {} },
    features: { type: [String], default: [] },
    applications: { type: [String], default: [] },
    category: { type: Schema.Types.ObjectId, ref: 'Category', default: null },
    is_featured: { type: Boolean, default: false },
    is_active: { type: Boolean, default: true },
    price: { type: Number, default: 0 },
    discount_percent: { type: Number, default: 0 },
    show_price: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model<IProductDocument>('Product', ProductSchema);
