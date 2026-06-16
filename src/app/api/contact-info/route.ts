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
        address: '123 Agri Business Park, Gujarat, India',
        phone: '+91-8871822944',
        whatsapp: '918871822944',
        email: 'vrajagrobilaspurcg@gmail.com',
        map_embed_url: 'https://www.google.com/maps/embed?pb=placeholder',
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
