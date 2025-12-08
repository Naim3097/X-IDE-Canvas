import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Layout, Image, Smartphone, Monitor, Video, Square, Clock, ArrowRight } from 'lucide-react'
import { SOCIAL_FORMATS } from '../config/social-formats'

export default function Dashboard() {
  const navigate = useNavigate()
  const [selectedPlatform, setSelectedPlatform] = useState<string>('All')

  const platforms = ['All', 'Instagram', 'Facebook', 'TikTok', 'YouTube', 'Twitter', 'LinkedIn', 'Pinterest']

  const filteredFormats = selectedPlatform === 'All' 
    ? SOCIAL_FORMATS 
    : SOCIAL_FORMATS.filter(f => f.platform === selectedPlatform)

  const getIcon = (name: string) => {
    switch (name) {
      case 'smartphone': return <Smartphone size={24} />
      case 'monitor': return <Monitor size={24} />
      case 'video': return <Video size={24} />
      case 'square': return <Square size={24} />
      case 'image': return <Image size={24} />
      default: return <Layout size={24} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-12">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Welcome to <span className="text-blue-600">X-IDE Lite</span>
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl">
              Create stunning social media content in seconds. Select a format below to get started.
            </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Platform Filter */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Layout className="text-blue-600" size={24} />
                Start a New Design
            </h2>
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar mask-linear-fade">
                {platforms.map(p => (
                    <button
                        key={p}
                        onClick={() => setSelectedPlatform(p)}
                        className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                            selectedPlatform === p 
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 scale-105' 
                                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 hover:border-gray-300'
                        }`}
                    >
                        {p}
                    </button>
                ))}
            </div>
        </div>

        {/* Format List (Horizontal Scroll) */}
        <div className="flex overflow-x-auto gap-6 pb-8 mb-8 -mx-8 px-8 no-scrollbar snap-x">
          <button
             onClick={() => navigate('/editor')}
             className="flex-none w-64 flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-dashed border-gray-300 group min-h-[240px] snap-start"
          >
             <div className="bg-blue-50 text-blue-600 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                <Plus size={32} />
             </div>
             <h3 className="font-bold text-gray-900 text-center text-lg">Custom Size</h3>
             <p className="text-gray-500 text-sm mt-1">Create from scratch</p>
          </button>

          {filteredFormats.map((format) => (
            <button
              key={format.id}
              onClick={() => navigate(`/editor?format=${format.id}`)}
              className="flex-none w-64 flex flex-col items-start p-6 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 group relative overflow-hidden min-h-[240px] snap-start"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                 {getIcon(format.icon)}
              </div>
              
              <div className="bg-gray-50 text-gray-700 p-3 rounded-xl mb-4 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                {getIcon(format.icon)}
              </div>
              
              <div className="mt-auto w-full">
                  <h3 className="font-bold text-gray-900 text-left text-lg leading-tight mb-1">{format.name}</h3>
                  <div className="flex items-center justify-between w-full">
                    <p className="text-gray-400 text-xs font-mono">{format.width} x {format.height}</p>
                    {selectedPlatform === 'All' && (
                        <span className="text-[10px] uppercase tracking-wider text-blue-600 font-bold bg-blue-50 px-2 py-1 rounded-md">
                            {format.platform}
                        </span>
                    )}
                  </div>
              </div>
            </button>
          ))}
        </div>

        {/* Recent Designs Section (Placeholder for now) */}
        <div className="border-t border-gray-200 pt-12">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <Clock className="text-blue-600" size={24} />
                    Recent Designs
                </h2>
                <button className="text-blue-600 text-sm font-medium hover:text-blue-700 flex items-center gap-1">
                    View All <ArrowRight size={16} />
                </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
                <div key={i} className="group cursor-pointer">
                    <div className="aspect-video bg-white rounded-xl shadow-sm border border-gray-200 mb-3 flex items-center justify-center text-gray-300 group-hover:shadow-md transition-all overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 opacity-50" />
                        <Image size={48} className="opacity-20" />
                    </div>
                    <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">Untitled Design {i}</h3>
                    <p className="text-xs text-gray-500">Edited 2 hours ago</p>
                </div>
            ))}
            </div>
        </div>
      </div>
    </div>
  )
}
