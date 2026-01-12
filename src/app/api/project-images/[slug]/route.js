import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request, { params }) {
  const { slug } = await params;
  const projectPath = path.join(process.cwd(), 'public', 'projects', slug);

  try {
    const files = fs.readdirSync(projectPath);
    const images = files
      .filter(file => /\.(png|jpg|jpeg|webp|JPG|PNG|JPEG|WEBP)$/i.test(file))
      .sort((a, b) => {
        const numA = parseInt(a.match(/\d+/)?.[0] || '0');
        const numB = parseInt(b.match(/\d+/)?.[0] || '0');
        return numA - numB;
      })
      .map(file => `/projects/${slug}/${file}`);

    return NextResponse.json({ images });
  } catch (error) {
    return NextResponse.json({ images: [] });
  }
}
