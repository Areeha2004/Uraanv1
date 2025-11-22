// src/app/api/upload/route.ts
import {  NextResponse } from 'next/server'
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'
import { Readable } from 'stream'

export const config = {
  api: {
    bodyParser: false,
  },
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const fileField = formData.get('file') as File | null

    if (!fileField) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const arrayBuffer = await fileField.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const uploadResult: UploadApiResponse = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'avatars', resource_type: 'image' },
        (err, result) => {
          if (err) reject(err)
          else resolve(result as UploadApiResponse)
        }
      )
      Readable.from(buffer).pipe(stream)
    })

    return NextResponse.json({ url: uploadResult.secure_url }, { status: 200 })
  } catch (err) {
    console.error('Upload error:', err)
    return NextResponse.json(
      { error: 'Cloudinary upload failed' },
      { status: 500 }
    )
  }
}
