import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import ContactInfo from '@/models/ContactInfo';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    await dbConnect();
    
    const updated = await ContactInfo.findOneAndUpdate(
      {},
      {
        $set: {
          address: 'V. Raj Agro Beside New Petrol Pump, Seepat Road Mopka, Bilaspur Chhattisgarh 495001',
          phone: '+91-8871822944',
          whatsapp: '918871822944',
          email: 'vrajagrobilaspurcg@gmail.com',
          map_embed_url: 'https://maps.google.com/maps?q=V.%20Raj%20Agro%20Beside%20New%20Petrol%20Pump,%20Seepat%20Road%20Mopka,%20Bilaspur%20Chhattisgarh%20495001&t=&z=16&ie=UTF8&iwloc=&output=embed',
        }
      },
      { new: true, upsert: true }
    );
    
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
