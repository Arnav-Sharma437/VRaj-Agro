import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import Category from '@/models/Category';
import mongoose from 'mongoose';

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    const param = params.id;

    const query: {
      is_active?: boolean;
      slug?: string;
      $or?: Array<object>;
    } = {};
    if (!session) {
      query.is_active = true;
    }

    if (mongoose.Types.ObjectId.isValid(param)) {
      query.$or = [{ _id: param }, { slug: param }];
    } else {
      query.slug = param;
    }

    // Reference Category model to ensure it is registered in Mongoose schema
    if (Category) {
      // no-op
    }

    const product = await Product.findOne(query).populate('category');
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: RouteParams) {
  try {
    await dbConnect();
    const body = await req.json();
    const product = await Product.findByIdAndUpdate(params.id, body, { new: true });
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: RouteParams) {
  try {
    await dbConnect();
    const product = await Product.findByIdAndDelete(params.id);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
