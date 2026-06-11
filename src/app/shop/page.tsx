import { Metadata } from 'next';
import dbConnect from '@/lib/mongodb';
import Category from '@/models/Category';
import Product from '@/models/Product';
import ShopPageClient from '@/components/main/ShopPageClient';
import { ICategory, IProduct } from '@/types';

export const metadata: Metadata = {
  title: 'Products | V.Raj Agro',
  description: 'Browse our wide range of agricultural and construction machinery',
};

export const dynamic = 'force-dynamic';

export default async function ShopPage() {
  await dbConnect();

  // Fetch active categories sorted by name
  const categoriesLean = await Category.find({ is_active: true }).sort({ name: 1 }).lean();
  const categories = JSON.parse(JSON.stringify(categoriesLean)) as ICategory[];

  // Fetch active products populated with category, sorted by creation date
  const productsLean = await Product.find({ is_active: true })
    .populate('category')
    .sort({ createdAt: -1 })
    .lean();
  const products = JSON.parse(JSON.stringify(productsLean)) as IProduct[];

  return (
    <ShopPageClient initialCategories={categories} initialProducts={products} />
  );
}
