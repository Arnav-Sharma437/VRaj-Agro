import { NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

export async function GET() {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    })

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME
    const apiKey = process.env.CLOUDINARY_API_KEY
    const apiSecret = process.env.CLOUDINARY_API_SECRET

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json({ error: 'Cloudinary not configured' }, { status: 500 })
    }

    const timestamp = Math.round(Date.now() / 1000)
    const paramsToSign = { folder: 'vraj-agro', timestamp }

    const signature = cloudinary.utils.api_sign_request(paramsToSign, apiSecret)

    return NextResponse.json({
      signature,
      timestamp,
      apiKey,
      cloudName,
      folder: 'vraj-agro',
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to generate signature'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
