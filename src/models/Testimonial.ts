import mongoose, { Schema, Document } from 'mongoose';
import { ITestimonial } from '@/types';

export interface ITestimonialDocument extends Omit<ITestimonial, '_id'>, Document {}

const TestimonialSchema = new Schema<ITestimonialDocument>(
  {
    customer_name: { type: String, required: true },
    location: { type: String },
    review: { type: String, required: true },
    image: { type: String },
    order: { type: Number, default: 0 },
    is_active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Testimonial || mongoose.model<ITestimonialDocument>('Testimonial', TestimonialSchema);
