import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import Category from '@/models/Category';

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const featured = searchParams.get('featured');
    const categorySlug = searchParams.get('category');
    const search = searchParams.get('search');

    const session = await getServerSession(authOptions);
    const query: {
      is_active?: boolean;
      is_featured?: boolean;
      category?: string | object;
      $or?: Array<object>;
    } = {};

    if (!session) {
      query.is_active = true;
    }

    if (featured === 'true') {
      query.is_featured = true;
    }

    if (categorySlug) {
      const categoryObj = await Category.findOne({ slug: categorySlug });
      if (!categoryObj) {
        return NextResponse.json([]);
      }
      query.category = categoryObj._id;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { short_description: { $regex: search, $options: 'i' } },
      ];
    }

    const products = await Product.find(query).populate('category');
    return NextResponse.json(products);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const product = await Product.create(body);
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
