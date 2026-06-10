import mongoose, { Schema, Document } from 'mongoose';
import { IContactInfo } from '@/types';

export interface IContactInfoDocument extends Omit<IContactInfo, '_id'>, Document {}

const ContactInfoSchema = new Schema<IContactInfoDocument>(
  {
    business_name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    whatsapp: { type: String, required: true },
    email: { type: String, required: true },
    map_embed_url: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.ContactInfo || mongoose.model<IContactInfoDocument>('ContactInfo', ContactInfoSchema);
