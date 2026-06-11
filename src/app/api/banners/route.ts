import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Banner from '@/models/Banner';

export async function GET() {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    const query = session ? {} : { is_active: true };

    const banners = await Banner.find(query).sort({ order: 1 });
    return NextResponse.json(banners);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    
    const banner = await Banner.create({
      title: body.title || '',
      subtitle: body.subtitle || '',
      image_desktop: body.image_desktop || '',
      image_mobile: body.image_mobile || '',
      cta_text: body.cta_text || '',
      cta_link: body.cta_link || '',
      order: body.order || 0,
      is_active: body.is_active ?? true,
    });
    
    return NextResponse.json(banner, { status: 201 });
  } catch (error: unknown) {
    console.error('Banner create error:', error);
    const message = error instanceof Error ? error.message : 'Failed to create banner';
    return NextResponse.json({ 
      error: message
    }, { status: 500 });
  }
}
