'use client'

import { useEffect, useState } from 'react'
import { getVideos, deleteVideo } from '../app/actions'
import { Video } from '../types/Video'

export default function VideoList() {
  const [videos, setVideos] = useState<Video[]>([])

  useEffect(() => {
    fetchVideos()
  }, [])

  async function fetchVideos() {
    const fetchedVideos = await getVideos()
    setVideos(fetchedVideos)
  }

  async function handleDelete(id: number) {
    const result = await deleteVideo(id)
    if (result.success) {
      setVideos(videos.filter(video => video.id !== id))
    } else {
      alert('Failed to delete video. Please try again.')
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Saved Videos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div key={video.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2 text-gray-800 truncate">{video.title}</h3>
              <p className="mb-2 text-sm text-gray-600"><strong>Category:</strong> {video.category}</p>
              <p className="mb-4 text-sm text-gray-700 h-20 overflow-y-auto">{video.notes}</p>
              <div className="flex justify-between items-center">
                <a 
                  href={video.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-500 hover:text-blue-600 text-sm font-medium"
                >
                  Watch Video
                </a>
                <button
                  onClick={() => handleDelete(video.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-200 ease-in-out"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}