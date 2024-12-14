import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET 获取所有书签
export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM bookmarks ORDER BY created_at DESC');
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch bookmarks' }, { status: 500 });
  }
}

// POST 创建新书签
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, url, description } = body;
    
    const [result] = await pool.query(
      'INSERT INTO bookmarks (title, url, description) VALUES (?, ?, ?)',
      [title, url, description]
    );
    
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create bookmark' }, { status: 500 });
  }
}
