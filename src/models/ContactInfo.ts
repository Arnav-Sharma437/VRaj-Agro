import mongoose, { Schema, Document } from 'mongoose';
import { IContactInfo } from '@/types';

export interface IContactInfoDocument extends Omit<IContactInfo, '_id'>, Document {}

const ContactInfoSchema = new Schema<IContactInfoDocument>(
  {
    business_name: { type: String, default: '' },
    address: { type: String, default: '' },
    phone: { type: String, default: '' },
    whatsapp: { type: String, default: '' },
    email: { type: String, default: '' },
    map_embed_url: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.ContactInfo || mongoose.model<IContactInfoDocument>('ContactInfo', ContactInfoSchema);
