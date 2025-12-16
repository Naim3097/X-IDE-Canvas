import React, { useState } from 'react';
import { X, Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Music2, Share2 } from 'lucide-react';
import type { SocialFormat } from '../config/social-formats';

interface SocialPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  format: SocialFormat;
}

export const SocialPreview: React.FC<SocialPreviewProps> = ({ isOpen, onClose, imageSrc, format }) => {
  const [caption, setCaption] = useState('Just created this amazing design with X-IDE! 🎨✨ #design #creative');

  if (!isOpen) return null;

  const renderInstagramPost = () => (
    <div className="bg-white w-[375px] h-[812px] rounded-[40px] border-8 border-slate-900 overflow-hidden flex flex-col shadow-2xl relative font-sans">
      {/* Status Bar */}
      <div className="h-12 bg-white flex justify-between items-center px-6 text-xs font-bold text-slate-900">
        <span>9:41</span>
        <div className="flex gap-1">
          <div className="w-4 h-4 bg-slate-900 rounded-full opacity-20"></div>
          <div className="w-4 h-4 bg-slate-900 rounded-full opacity-20"></div>
        </div>
      </div>

      {/* Header */}
      <div className="h-14 border-b border-slate-100 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-gradient-to-tr from-yellow-400 to-purple-600 rounded-full p-[2px]">
              <div className="w-full h-full bg-white rounded-full p-[2px]">
                 <div className="w-full h-full bg-slate-200 rounded-full" />
              </div>
           </div>
           <span className="text-sm font-semibold text-slate-900">your_username</span>
        </div>
        <MoreHorizontal size={20} className="text-slate-900" />
      </div>

      {/* Content */}
      <div className="bg-slate-100 relative" style={{ aspectRatio: format.width / format.height }}>
        <img src={imageSrc} className="w-full h-full object-cover" alt="Preview" />
      </div>

      {/* Actions */}
      <div className="p-4">
        <div className="flex justify-between mb-3">
          <div className="flex gap-4">
            <Heart size={24} />
            <MessageCircle size={24} />
            <Send size={24} />
          </div>
          <Bookmark size={24} />
        </div>
        <div className="text-sm font-semibold mb-1">1,234 likes</div>
        <div className="text-sm">
          <span className="font-semibold mr-2">your_username</span>
          {caption}
        </div>
      </div>
    </div>
  );

  const renderInstagramStory = () => (
    <div className="bg-black w-[375px] h-[812px] rounded-[40px] border-8 border-gray-900 overflow-hidden flex flex-col shadow-2xl relative">
      {/* Content Background */}
      <div className="absolute inset-0">
        <img src={imageSrc} className="w-full h-full object-cover" alt="Preview" />
      </div>

      {/* UI Overlay */}
      <div className="relative z-10 flex flex-col h-full p-4">
        {/* Progress Bars */}
        <div className="flex gap-1 mb-4">
          <div className="h-1 flex-1 bg-white/40 rounded-full overflow-hidden">
             <div className="h-full w-1/2 bg-white"></div>
          </div>
          <div className="h-1 flex-1 bg-white/40 rounded-full"></div>
        </div>

        {/* Header */}
        <div className="flex justify-between items-center mb-auto">
           <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full border border-white/20" />
              <span className="text-white text-sm font-semibold">your_username</span>
              <span className="text-white/60 text-sm">2h</span>
           </div>
           <MoreHorizontal className="text-white" />
        </div>

        {/* Footer */}
        <div className="flex items-center gap-4 mt-auto">
           <div className="flex-1 h-11 rounded-full border border-white/30 flex items-center px-4">
              <span className="text-white/80 text-sm">Send message...</span>
           </div>
           <Heart className="text-white" size={24} />
           <Send className="text-white" size={24} />
        </div>
      </div>
    </div>
  );

  const renderTikTok = () => (
    <div className="bg-black w-[375px] h-[812px] rounded-[40px] border-8 border-gray-900 overflow-hidden flex flex-col shadow-2xl relative">
      <img src={imageSrc} className="absolute inset-0 w-full h-full object-cover" alt="Preview" />
      
      {/* Right Sidebar */}
      <div className="absolute right-2 bottom-20 flex flex-col items-center gap-6 z-20">
         <div className="w-12 h-12 bg-gray-200 rounded-full border-2 border-white mb-2" />
         <div className="flex flex-col items-center gap-1">
            <Heart className="text-white fill-white" size={32} />
            <span className="text-white text-xs font-bold">82.4K</span>
         </div>
         <div className="flex flex-col items-center gap-1">
            <MessageCircle className="text-white fill-white" size={32} />
            <span className="text-white text-xs font-bold">1024</span>
         </div>
         <div className="flex flex-col items-center gap-1">
            <Bookmark className="text-white fill-white" size={32} />
            <span className="text-white text-xs font-bold">405</span>
         </div>
         <div className="flex flex-col items-center gap-1">
            <Share2 className="text-white fill-white" size={32} />
            <span className="text-white text-xs font-bold">Share</span>
         </div>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 pb-8 bg-gradient-to-t from-black/60 to-transparent z-10">
         <div className="mb-2">
            <h3 className="text-white font-bold mb-1">@your_username</h3>
            <p className="text-white/90 text-sm">{caption}</p>
         </div>
         <div className="flex items-center gap-2">
            <Music2 size={16} className="text-white" />
            <span className="text-white text-sm">Original Sound - your_username</span>
         </div>
      </div>
    </div>
  );

  const renderYouTube = () => (
    <div className="bg-white w-[800px] rounded-xl overflow-hidden shadow-2xl flex flex-col">
       <div className="bg-[#0f0f0f] p-4 flex items-center justify-between">
          <div className="flex gap-4">
             <div className="w-8 h-8 bg-white/10 rounded-full" />
             <div className="w-32 h-8 bg-white/10 rounded-full" />
          </div>
       </div>
       <div className="p-6 bg-[#0f0f0f] grid grid-cols-3 gap-4">
          <div className="col-span-1">
             <div className="aspect-video bg-gray-800 rounded-xl overflow-hidden relative group">
                <img src={imageSrc} className="w-full h-full object-cover" alt="Preview" />
                <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">12:45</div>
             </div>
             <div className="flex gap-3 mt-3">
                <div className="w-9 h-9 bg-gray-500 rounded-full flex-none" />
                <div>
                   <h3 className="text-white font-semibold text-sm line-clamp-2 leading-tight mb-1">
                      {caption.length > 50 ? caption.substring(0, 50) + '...' : caption}
                   </h3>
                   <div className="text-[#aaa] text-xs">Channel Name</div>
                   <div className="text-[#aaa] text-xs">12K views • 2 hours ago</div>
                </div>
             </div>
          </div>
          {/* Mock other videos */}
          {[1, 2].map(i => (
             <div key={i} className="col-span-1 opacity-30">
                <div className="aspect-video bg-gray-800 rounded-xl mb-3" />
                <div className="flex gap-3">
                   <div className="w-9 h-9 bg-gray-700 rounded-full flex-none" />
                   <div className="flex-1">
                      <div className="h-4 bg-gray-700 rounded w-full mb-2" />
                      <div className="h-3 bg-gray-700 rounded w-2/3" />
                   </div>
                </div>
             </div>
          ))}
       </div>
    </div>
  );

  const getPreviewContent = () => {
    if (format.platform === 'Instagram') {
        return format.id.includes('story') ? renderInstagramStory() : renderInstagramPost();
    }
    if (format.platform === 'TikTok') return renderTikTok();
    if (format.platform === 'YouTube') return renderYouTube();
    
    // Default fallback
    return (
        <div className="bg-white p-4 rounded-xl shadow-xl max-w-2xl">
            <img src={imageSrc} className="max-w-full h-auto rounded-lg border border-gray-200" alt="Preview" />
            <div className="mt-4">
                <p className="text-gray-600">{caption}</p>
            </div>
        </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative flex flex-col items-center max-h-screen">
        <button 
            onClick={onClose}
            className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
        >
            <X size={32} />
        </button>
        
        <div className="flex gap-8 items-start">
            {/* Preview Device */}
            <div className="scale-[0.85] origin-top">
                {getPreviewContent()}
            </div>

            {/* Controls */}
            <div className="w-80 bg-white rounded-xl p-6 mt-8 hidden lg:block">
                <h3 className="font-bold text-lg mb-4">Preview Settings</h3>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mock Caption</label>
                    <textarea 
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none h-32"
                        placeholder="Write a caption..."
                    />
                </div>
                <p className="text-xs text-gray-500">
                    This preview shows how your design might look on the platform. Actual appearance may vary by device.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};
