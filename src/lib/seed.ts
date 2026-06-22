import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import ContactInfo from '../models/ContactInfo';

// Load env variables from .env.local
try {
  const envPath = path.resolve(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const envFileContent = fs.readFileSync(envPath, 'utf8');
    envFileContent.split('\n').forEach((line) => {
      const parts = line.split('=');
      if (parts.length >= 2) {
        const key = parts[0].trim();
        const value = parts.slice(1).join('=').trim().replace(/^["']|["']$/g, '');
        if (key && !process.env[key]) {
          process.env[key] = value;
        }
      }
    });
  }
} catch (e) {
  console.error('Failed to load env variables from .env.local', e);
}

let MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI || MONGODB_URI === 'your_mongodb_uri') {
  MONGODB_URI = 'mongodb://127.0.0.1:27017/vraj-agro';
}

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI!);
    console.log('Connected.');

    console.log('Seeding contact info...');
    // Upsert the contact info document
    await ContactInfo.findOneAndUpdate(
      {},
      {
        business_name: "V.Raj Agro",
        address: "V. Raj Agro Beside New Petrol Pump, Seepat Road Mopka, Bilaspur Chhattisgarh 495001",
        phone: "+91-8871822944",
        whatsapp: "918871822944",
        email: "vrajagrobilaspurcg@gmail.com",
        map_embed_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.326795400262!2d82.17726597597116!3d22.091723550290074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a280b1e4f4fb35b%3A0x67396602058ee9e5!2sSeepat%20Rd%2C%20Mopka%2C%20Chhattisgarh%20495006!5e0!3m2!1sen!2sin!4v1719053000000!5m2!1sen!2sin",
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    console.log('Contact info seeded successfully.');

    await mongoose.disconnect();
    console.log('Disconnected.');
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed();
