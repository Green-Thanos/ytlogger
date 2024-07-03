import VideoForm from '../components/VideoForm'
import VideoList from '../components/VideoList'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">YouTube Video Saver</h1>
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <VideoForm />
        </div>
        <VideoList />
      </div>
    </div>
  )
}