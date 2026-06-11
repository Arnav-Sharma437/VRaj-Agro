import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Video from '@/models/Video';

export async function GET() {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    const query = session ? {} : { is_active: true };

    const videos = await Video.find(query).sort({ order: 1 });
    return NextResponse.json(videos);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const video = await Video.create(body);
    return NextResponse.json(video, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
