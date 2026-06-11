import { NextResponse } from 'next/server';
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

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const banner = await Banner.create(body);
    return NextResponse.json(banner, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
