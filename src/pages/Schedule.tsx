import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function Schedule() {
  const navigate = useNavigate()
  return (
    <div className="p-8">
      <button onClick={() => navigate('/')} className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900">
        <ArrowLeft size={20} /> Back
      </button>
      <h1 className="text-3xl font-bold mb-4">Content Schedule</h1>
      <p>Calendar view coming soon...</p>
    </div>
  )
}
