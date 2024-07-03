'use server'

import { PrismaClient } from '@prisma/client'
import axios from 'axios'
import { Video } from '../types/Video'

const prisma = new PrismaClient()

export async function getVideos(): Promise<Video[]> {
    return await prisma.video.findMany({
      orderBy: { createdAt: 'desc' }
    })
}

export async function addVideo(formData: FormData) {
    const url = formData.get('url') as string
    const notes = formData.get('notes') as string
    const category = formData.get('category') as string

  try {
    const videoId = new URL(url).searchParams.get('v')
    if (!videoId) throw new Error('Invalid YouTube URL')

    console.log('Fetching video data for ID:', videoId)  // Log the video ID

    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${process.env.YOUTUBE_API_KEY}`
    console.log('API URL:', apiUrl)  // Log the API URL (remove this in production)

    const response = await axios.get(apiUrl)
    console.log('API Response:', response.data)  // Log the API response

    if (!response.data.items || response.data.items.length === 0) {
      throw new Error('No video found with the given ID')
    }

    const videoData = response.data.items[0].snippet

    const video = await prisma.video.create({
      data: {
        url,
        title: videoData.title,
        thumbnail: videoData.thumbnails.default.url,
        notes,
        category,
      },
    })

    return video
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data)  // Log the error response
    } else {
      console.error('Error:', error)
    }
    throw new Error('Failed to save video')
  }
}

export async function deleteVideo(id: number) {
    try {
      await prisma.video.delete({
        where: { id },
      })
      return { success: true }
    } catch (error) {
      console.error('Failed to delete video:', error)
      return { success: false }
    }
  }