import React, { useState } from 'react';
import { ColorPicker } from './ColorPicker';
import { ArrowRight, ArrowDown, ArrowDownRight } from 'lucide-react';

export interface FillState {
  type: 'solid' | 'gradient';
  color: string;
  gradient: {
    start: string;
    end: string;
    angle: 'horizontal' | 'vertical' | 'diagonal';
  };
}

interface FillPanelProps {
  fill: FillState;
  onChange: (fill: FillState) => void;
}

export const FillPanel: React.FC<FillPanelProps> = ({ fill, onChange }) => {
  const [activeTab, setActiveTab] = useState<'solid' | 'gradient'>(fill.type);

  const handleTabChange = (type: 'solid' | 'gradient') => {
    setActiveTab(type);
    onChange({ ...fill, type });
  };

  return (
    <div className="space-y-3">
      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Fill</label>
      
      {/* Tabs */}
      <div className="flex bg-gray-100 p-1 rounded-lg">
        <button
            className={`flex-1 py-1 text-xs font-medium rounded-md transition-colors ${activeTab === 'solid' ? 'bg-white shadow text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => handleTabChange('solid')}
        >
            Solid
        </button>
        <button
            className={`flex-1 py-1 text-xs font-medium rounded-md transition-colors ${activeTab === 'gradient' ? 'bg-white shadow text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => handleTabChange('gradient')}
        >
            Gradient
        </button>
      </div>

      {/* Content */}
      {activeTab === 'solid' ? (
        <ColorPicker 
            value={fill.color} 
            onChange={(color) => onChange({ ...fill, color })} 
        />
      ) : (
        <div className="space-y-4">
            <div className="flex gap-2">
                <div className="flex-1">
                    <label className="text-[10px] text-gray-400 uppercase mb-1 block">Start</label>
                    <ColorPicker 
                        value={fill.gradient.start} 
                        onChange={(color) => onChange({ ...fill, gradient: { ...fill.gradient, start: color } })} 
                    />
                </div>
                <div className="flex-1">
                    <label className="text-[10px] text-gray-400 uppercase mb-1 block">End</label>
                    <ColorPicker 
                        value={fill.gradient.end} 
                        onChange={(color) => onChange({ ...fill, gradient: { ...fill.gradient, end: color } })} 
                    />
                </div>
            </div>

            <div>
                <label className="text-[10px] text-gray-400 uppercase mb-1 block">Direction</label>
                <div className="flex gap-2">
                    <button 
                        onClick={() => onChange({ ...fill, gradient: { ...fill.gradient, angle: 'horizontal' } })}
                        className={`flex-1 p-2 rounded border flex justify-center ${fill.gradient.angle === 'horizontal' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-gray-200 text-gray-500'}`}
                        title="Horizontal"
                    >
                        <ArrowRight size={16} />
                    </button>
                    <button 
                        onClick={() => onChange({ ...fill, gradient: { ...fill.gradient, angle: 'vertical' } })}
                        className={`flex-1 p-2 rounded border flex justify-center ${fill.gradient.angle === 'vertical' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-gray-200 text-gray-500'}`}
                        title="Vertical"
                    >
                        <ArrowDown size={16} />
                    </button>
                    <button 
                        onClick={() => onChange({ ...fill, gradient: { ...fill.gradient, angle: 'diagonal' } })}
                        className={`flex-1 p-2 rounded border flex justify-center ${fill.gradient.angle === 'diagonal' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-gray-200 text-gray-500'}`}
                        title="Diagonal"
                    >
                        <ArrowDownRight size={16} />
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};
