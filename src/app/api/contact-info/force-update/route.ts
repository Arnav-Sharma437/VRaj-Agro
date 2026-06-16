import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import ContactInfo from '@/models/ContactInfo';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await dbConnect();
    
    const updated = await ContactInfo.findOneAndUpdate(
      {},
      {
        whatsapp: '918871822944',
        phone: '+91-8871822944',
        email: 'vrajagrobilaspurcg@gmail.com',
      },
      { new: true, upsert: true }
    );
    
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
