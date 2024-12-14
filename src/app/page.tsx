'use client';

import { useState, useEffect } from 'react';
import { Bookmark } from '@/types/bookmark';

export default function Home() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    description: ''
  });

  // 获取所有书签
  const fetchBookmarks = async () => {
    const response = await fetch('/api/bookmarks');
    const data = await response.json();
    setBookmarks(data);
  };

  // 添加书签
  const addBookmark = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/bookmarks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    setFormData({ title: '', url: '', description: '' });
    fetchBookmarks();
  };

  // 删除书签
  const deleteBookmark = async (id: number) => {
    await fetch(`/api/bookmarks/${id}`, { method: 'DELETE' });
    fetchBookmarks();
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto p-6 max-w-5xl">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
          书签管理系统
        </h1>
        
        {/* 添加书签表单 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">添加新书签</h2>
          <form onSubmit={addBookmark} className="space-y-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  标题
                </label>

                <input
  type="text"
  placeholder="输入书签标题"
  value={formData.title}
  onChange={(e) => setFormData({...formData, title: e.target.value})}
  className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-gray-50 text-gray-900" // 添加 text-gray-900
  required
/>

              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL
                </label>
                <input
  type="url"
  placeholder="https://example.com"
  value={formData.url}
  onChange={(e) => setFormData({...formData, url: e.target.value})}
  className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-gray-50 text-gray-900" // 添加 text-gray-900
  required
/>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  描述
                </label>
               
<textarea
  placeholder="添加描述信息"
  value={formData.description}
  onChange={(e) => setFormData({...formData, description: e.target.value})}
  className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition h-24 resize-none bg-gray-50 text-gray-900" // 添加 text-gray-900
/>
              </div>
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition duration-200 ease-in-out transform hover:scale-[1.02]"
            >
              添加书签
            </button>
          </form>
        </div>

        {/* 书签列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookmarks.map((bookmark) => (
            <div 
              key={bookmark.id} 
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-200"
            >
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {bookmark.title}
                </h2>
                <button
                  onClick={() => bookmark.id && deleteBookmark(bookmark.id)}
                  className="text-red-500 hover:text-red-600 p-1 rounded-full hover:bg-red-50 transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <a 
                href={bookmark.url} 
                className="text-blue-500 hover:text-blue-600 text-sm block mb-2 truncate"
                target="_blank" 
                rel="noopener noreferrer"
              >
                {bookmark.url}
              </a>
              
              <p className="text-gray-600 text-sm">
                {bookmark.description || '暂无描述'}
              </p>
            </div>
          ))}
        </div>
        
        {bookmarks.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            暂无书签，请添加新的书签
          </div>
        )}
      </div>
    </div>
  );
}