import mongoose, { Schema, Document } from 'mongoose';
import { IVideo } from '@/types';

export interface IVideoDocument extends Omit<IVideo, '_id'>, Document {}

const VideoSchema = new Schema<IVideoDocument>(
  {
    title: { type: String, required: true },
    video_url: { type: String, required: true },
    thumbnail: { type: String },
    order: { type: Number, default: 0 },
    is_active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Video || mongoose.model<IVideoDocument>('Video', VideoSchema);
