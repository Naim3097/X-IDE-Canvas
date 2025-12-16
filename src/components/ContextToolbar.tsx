import React from 'react';
import { 
  Trash2, Copy, 
  BringToFront, SendToBack, 
  ArrowUp, ArrowDown,
  Bold, Italic, Underline
} from 'lucide-react';
import type { Shape } from '../types';

interface ContextToolbarProps {
  selectedShape: Shape | null;
  onUpdate: (attrs: any) => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onLayer: (action: 'front' | 'back' | 'forward' | 'backward') => void;
}

export const ContextToolbar: React.FC<ContextToolbarProps> = ({
  selectedShape,
  onUpdate,
  onDelete,
  onDuplicate,
  onLayer
}) => {
  if (!selectedShape) {
    return (
      <div className="h-12 border-b border-slate-200 bg-white flex items-center px-4 text-sm text-slate-400 font-sans">
        Select an element to edit
      </div>
    );
  }

  return (
    <div className="h-14 border-b border-slate-200 bg-white flex items-center px-4 gap-4 overflow-x-auto shadow-sm z-20 relative font-sans">
      
      {/* --- Common Actions: Color --- */}
      <div className="flex items-center gap-2 border-r border-slate-200 pr-4">
        <div className="w-8 h-8 relative overflow-hidden rounded border border-slate-300 cursor-pointer">
            <input 
                type="color" 
                value={selectedShape.fill || '#000000'}
                onChange={(e) => onUpdate({ fill: e.target.value })}
                className="absolute inset-0 w-[150%] h-[150%] -top-1/4 -left-1/4 cursor-pointer p-0 border-0"
                title="Color"
            />
        </div>
      </div>

      {/* --- Text Specific Tools --- */}
      {selectedShape.type === 'text' && (
        <div className="flex items-center gap-3 border-r border-gray-200 pr-4">
            {/* Font Family (Simplified) */}
            <select 
                value={selectedShape.fontFamily || 'Inter'}
                onChange={(e) => onUpdate({ fontFamily: e.target.value })}
                className="w-32 text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
                <option value="Inter">Inter</option>
                <option value="Roboto">Roboto</option>
                <option value="Playfair Display">Playfair</option>
                <option value="Montserrat">Montserrat</option>
            </select>

            {/* Font Size */}
            <input 
                type="number" 
                value={selectedShape.fontSize || 16}
                onChange={(e) => onUpdate({ fontSize: Number(e.target.value) })}
                className="w-16 text-sm border-gray-300 rounded-md"
                min={8}
                max={200}
            />

            {/* Formatting */}
            <div className="flex bg-gray-100 rounded-lg p-1 gap-1">
                <button 
                    onClick={() => onUpdate({ fontStyle: selectedShape.fontStyle?.includes('bold') ? 'normal' : 'bold' })}
                    className={`p-1.5 rounded ${selectedShape.fontStyle?.includes('bold') ? 'bg-white shadow text-black' : 'text-gray-500 hover:text-black'}`}
                >
                    <Bold size={14} />
                </button>
                <button 
                    onClick={() => onUpdate({ fontStyle: selectedShape.fontStyle?.includes('italic') ? 'italic' : 'normal' })}
                    className={`p-1.5 rounded ${selectedShape.fontStyle?.includes('italic') ? 'bg-white shadow text-black' : 'text-gray-500 hover:text-black'}`}
                >
                    <Italic size={14} />
                </button>
                <button 
                    onClick={() => onUpdate({ textDecoration: selectedShape.textDecoration === 'underline' ? '' : 'underline' })}
                    className={`p-1.5 rounded ${selectedShape.textDecoration === 'underline' ? 'bg-white shadow text-black' : 'text-gray-500 hover:text-black'}`}
                >
                    <Underline size={14} />
                </button>
            </div>
        </div>
      )}

      {/* --- Layering & Arrangement --- */}
      <div className="flex items-center gap-1 border-r border-gray-200 pr-4">
        <button onClick={() => onLayer('front')} className="p-2 hover:bg-gray-100 rounded text-gray-600" title="Bring to Front">
            <BringToFront size={18} />
        </button>
        <button onClick={() => onLayer('forward')} className="p-2 hover:bg-gray-100 rounded text-gray-600" title="Bring Forward">
            <ArrowUp size={18} />
        </button>
        <button onClick={() => onLayer('backward')} className="p-2 hover:bg-gray-100 rounded text-gray-600" title="Send Backward">
            <ArrowDown size={18} />
        </button>
        <button onClick={() => onLayer('back')} className="p-2 hover:bg-gray-100 rounded text-gray-600" title="Send to Back">
            <SendToBack size={18} />
        </button>
      </div>

      {/* --- Actions --- */}
      <div className="flex items-center gap-2 ml-auto">
        <button 
            onClick={onDuplicate}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
        >
            <Copy size={16} />
            Duplicate
        </button>
        <button 
            onClick={onDelete}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
            title="Delete"
        >
            <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};
