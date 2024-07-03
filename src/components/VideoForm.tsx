'use client'

import { useState } from 'react'
import { addVideo } from '../app/actions'

const CATEGORIES = ['Business', 'Philosophy', 'Tech', 'Other']

export default function VideoForm() {
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    try {
      await addVideo(formData)
    } catch (error) {
      console.error('Error adding video:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form action={handleSubmit} className="mb-8">
      <input
        type="url"
        name="url"
        placeholder="YouTube URL"
        required
        className="w-full p-2 mb-4 border rounded"
      />
      <textarea
        name="notes"
        placeholder="Notes/Insights"
        required
        className="w-full p-2 mb-4 border rounded"
      />
      <select
        name="category"
        required
        className="w-full p-2 mb-4 border rounded"
      >
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <button 
        type="submit" 
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        disabled={isLoading}
      >
        {isLoading ? 'Saving...' : 'Save Video'}
      </button>
    </form>
  )
}