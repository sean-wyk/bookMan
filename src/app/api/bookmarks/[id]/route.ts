import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// DELETE 删除书签
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await pool.query('DELETE FROM bookmarks WHERE id = ?', [params.id]);
    return NextResponse.json({ message: 'Bookmark deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete bookmark' }, { status: 500 });
  }
}

// PUT 更新书签
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { title, url, description } = body;
    
    await pool.query(
      'UPDATE bookmarks SET title = ?, url = ?, description = ? WHERE id = ?',
      [title, url, description, params.id]
    );
    
    return NextResponse.json({ message: 'Bookmark updated' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update bookmark' }, { status: 500 });
  }
}
