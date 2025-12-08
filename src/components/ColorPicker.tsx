import React from 'react';
import { Plus } from 'lucide-react';

interface ColorPickerProps {
  label?: string;
  value?: string;
  onChange: (color: string) => void;
}

const PRESET_COLORS = [
  '#000000', '#9CA3AF', '#FFFFFF', 
  '#EF4444', '#F97316', '#F59E0B', 
  '#10B981', '#3B82F6', '#6366F1', 
  '#8B5CF6', '#EC4899', '#F43F5E'
];

export const ColorPicker: React.FC<ColorPickerProps> = ({ label, value = '#000000', onChange }) => {
  return (
    <div className="space-y-2">
      {label && <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</label>}
      
      <div className="flex items-center gap-2 p-2 border border-gray-200 rounded-lg bg-white">
        <div className="relative w-8 h-8 rounded-md overflow-hidden border border-gray-200 shadow-sm shrink-0">
            <input 
                type="color" 
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] p-0 border-0 cursor-pointer"
            />
        </div>
        <div className="flex-1">
            <input 
                type="text" 
                value={value.toUpperCase()}
                onChange={(e) => onChange(e.target.value)}
                className="w-full text-xs font-mono text-gray-600 outline-none uppercase"
                placeholder="#000000"
            />
        </div>
      </div>

      <div className="grid grid-cols-6 gap-2">
        {/* Rainbow / Custom Trigger */}
        <div className="relative w-full pt-[100%] rounded-md overflow-hidden cursor-pointer group border border-gray-200">
             <div className="absolute inset-0 bg-gradient-to-br from-red-500 via-green-500 to-blue-500 opacity-80 group-hover:opacity-100 transition-opacity" />
             <div className="absolute inset-0 flex items-center justify-center">
                <Plus className="text-white drop-shadow-md" size={14} />
             </div>
             <input 
                type="color" 
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                title="Custom Color"
            />
        </div>

        {PRESET_COLORS.map((color) => (
            <button
                key={color}
                onClick={() => onChange(color)}
                className={`relative w-full pt-[100%] rounded-md overflow-hidden border border-gray-100 shadow-sm transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${value.toLowerCase() === color.toLowerCase() ? 'ring-2 ring-blue-500 ring-offset-1' : ''}`}
                style={{ backgroundColor: color }}
                title={color}
            />
        ))}
      </div>
    </div>
  );
};
