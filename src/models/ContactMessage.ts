import mongoose, { Schema, Document } from 'mongoose';
import { IContactMessage } from '@/types';

export interface IContactMessageDocument extends Omit<IContactMessage, '_id'>, Document {}

const ContactMessageSchema = new Schema<IContactMessageDocument>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.ContactMessage || mongoose.model<IContactMessageDocument>('ContactMessage', ContactMessageSchema);
