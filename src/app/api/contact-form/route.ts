import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import ContactMessage from '@/models/ContactMessage';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { name, phone, email, subject, message } = body;

    // Validate fields
    if (!name || !phone || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const newMessage = await ContactMessage.create({
      name,
      phone,
      email,
      subject,
      message,
    });

    return NextResponse.json({
      success: true,
      message: 'Message saved successfully',
      data: newMessage,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
