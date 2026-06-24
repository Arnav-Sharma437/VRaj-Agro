import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

export async function POST(request: NextRequest) {
  try {
    // Configure fresh on every request
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    })

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME
    const apiKey = process.env.CLOUDINARY_API_KEY
    const apiSecret = process.env.CLOUDINARY_API_SECRET

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json({ 
        error: 'Cloudinary not configured. Missing: ' + 
        (!cloudName ? 'CLOUD_NAME ' : '') +
        (!apiKey ? 'API_KEY ' : '') +
        (!apiSecret ? 'API_SECRET' : '')
      }, { status: 500 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const result = await new Promise((resolve, reject) => {
      // 120 seconds timeout for large file uploads
      const timeoutSec = 120;
      const uploadTimeout = setTimeout(() => {
        reject(new Error(`Upload request timed out after ${timeoutSec} seconds`));
      }, timeoutSec * 1000);

      const stream = cloudinary.uploader.upload_stream(
        { 
          folder: 'vraj-agro',
          resource_type: 'auto',
          chunk_size: 6000000,
          timeout: 120000,
        },
        (error, result) => {
          clearTimeout(uploadTimeout);
          if (error) reject(error);
          else resolve(result);
        }
      );
      
      stream.end(buffer);
    }) as unknown as { secure_url: string }

    return NextResponse.json({ url: result.secure_url })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Upload failed'
    return NextResponse.json({ 
      error: message
    }, { status: 500 })
  }
}

// NOTE: Exporting config is deprecated in Next.js App Router API Route Handlers.
// Next.js App Router parses request bodies as streams dynamically by default,
// making bodyParser: false the default behavior.
// If you uncomment this, Next.js will throw a fatal build error.
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// }

