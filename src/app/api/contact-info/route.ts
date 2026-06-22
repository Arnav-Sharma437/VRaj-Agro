import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import ContactInfo from '@/models/ContactInfo';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    await dbConnect();
    let contactInfo = await ContactInfo.findOne({});
    if (!contactInfo) {
      // Create a default placeholder document if none exists yet
      contactInfo = await ContactInfo.create({
        business_name: 'VRaj Agro',
        address: 'V. Raj Agro Beside New Petrol Pump, Seepat Road Mopka, Bilaspur Chhattisgarh 495001',
        phone: '+91-8871822944',
        whatsapp: '918871822944',
        email: 'vrajagrobilaspurcg@gmail.com',
        map_embed_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3937.279981927464!2d82.21025044745511!3d22.09078131102962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a280aed59ed23cb%3A0x643e19da1de00f90!2sV%20Raj%20Agro!5e1!3m2!1sen!2sin!4v1782127162354!5m2!1sen!2sin',
      });
    }
    return NextResponse.json(contactInfo);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const contactInfo = await ContactInfo.findOneAndUpdate({}, body, {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    });
    return NextResponse.json(contactInfo);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
