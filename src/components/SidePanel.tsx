import React, { useState, useEffect } from 'react';
import { 
  Layout, Type, Square, Image as ImageIcon, 
  Circle, Triangle, Star, Heart, Settings, Layers, Trash2
} from 'lucide-react';

import type { Shape } from '../types';

interface SidePanelProps {
  onAddShape: (type: 'rect' | 'text' | 'circle' | 'star' | 'image' | 'triangle' | 'heart', variant?: string) => void;
  selectedShape?: Shape;
  onUpdateShape?: (id: string, attrs: Partial<Shape>) => void;
  shapes?: Shape[];
  onSelectShape?: (id: string) => void;
  onDeleteShape?: (id: string) => void;
}

export const SidePanel: React.FC<SidePanelProps> = ({ 
  onAddShape, 
  selectedShape, 
  onUpdateShape,
  shapes = [],
  onSelectShape,
  onDeleteShape
}) => {
  const [activeTab, setActiveTab] = useState<'elements' | 'text' | 'uploads' | 'edit' | 'layers'>('elements');
  const [uploadedAssets, setUploadedAssets] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('x-ide-uploads');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to load uploads:', e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('x-ide-uploads', JSON.stringify(uploadedAssets));
    } catch (error) {
      console.error('Storage quota exceeded:', error);
      alert('Storage full! Some uploads may not be saved permanently. Try deleting old uploads.');
    }
  }, [uploadedAssets]);

  // Auto-switch to edit tab when shape is selected
  useEffect(() => {
    if (selectedShape) {
        setActiveTab('edit');
    }
  }, [selectedShape?.id]);

  return (
    <div className="flex h-full">
      {/* --- Narrow Rail --- */}
      <div className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 gap-4 z-20">
        <TabButton 
            active={activeTab === 'elements'} 
            onClick={() => setActiveTab('elements')} 
            icon={<Layout size={20} />} 
            label="Elements" 
        />
        <TabButton 
            active={activeTab === 'text'} 
            onClick={() => setActiveTab('text')} 
            icon={<Type size={20} />} 
            label="Text" 
        />
        <TabButton 
            active={activeTab === 'uploads'} 
            onClick={() => setActiveTab('uploads')} 
            icon={<ImageIcon size={20} />} 
            label="Uploads" 
        />
        <TabButton 
            active={activeTab === 'layers'} 
            onClick={() => setActiveTab('layers')} 
            icon={<Layers size={20} />} 
            label="Layers" 
        />
        {selectedShape && (
            <TabButton 
                active={activeTab === 'edit'} 
                onClick={() => setActiveTab('edit')} 
                icon={<Settings size={20} />} 
                label="Edit" 
            />
        )}
      </div>

      {/* --- Drawer Content --- */}
      <div className="w-72 bg-gray-50 border-r border-gray-200 flex flex-col overflow-y-auto transition-all duration-300">
        
        {/* Layers Tab */}
        {activeTab === 'layers' && (
            <div className="p-4">
                <h3 className="font-bold text-gray-800 mb-4">Layers</h3>
                <div className="space-y-2">
                    {[...shapes].reverse().map((shape, index) => (
                        <div 
                            key={shape.id}
                            className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                                selectedShape?.id === shape.id 
                                    ? 'bg-blue-50 border-blue-200' 
                                    : 'bg-white border-gray-200 hover:bg-gray-50'
                            }`}
                            onClick={() => onSelectShape && onSelectShape(shape.id)}
                        >
                            <div className="flex items-center gap-3 overflow-hidden">
                                <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center flex-none text-gray-500">
                                    {shape.type === 'text' && <Type size={16} />}
                                    {shape.type === 'image' && <ImageIcon size={16} />}
                                    {shape.type === 'rect' && <Square size={16} />}
                                    {shape.type === 'circle' && <Circle size={16} />}
                                    {shape.type === 'triangle' && <Triangle size={16} />}
                                    {shape.type === 'star' && <Star size={16} />}
                                    {shape.type === 'heart' && <Heart size={16} />}
                                </div>
                                <div className="truncate">
                                    <div className="text-sm font-medium text-gray-700 truncate">
                                        {shape.type === 'text' ? (shape.text || 'Text') : shape.type}
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        Layer {shapes.length - index}
                                    </div>
                                </div>
                            </div>
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDeleteShape && onDeleteShape(shape.id);
                                }}
                                className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                    {shapes.length === 0 && (
                        <div className="text-center py-8 text-gray-400 text-sm">
                            No layers yet
                        </div>
                    )}
                </div>
            </div>
        )}

        {/* Edit Tab */}
        {activeTab === 'edit' && selectedShape && onUpdateShape && (
            <div className="p-4 space-y-4">
                <h3 className="font-bold text-gray-800 mb-4">Properties</h3>
                
                {/* Common Properties */}
                <div className="space-y-3">
                    <div>
                        <label className="text-xs text-gray-500 block mb-1">X Position</label>
                        <input 
                            type="number" 
                            value={Math.round(selectedShape.x)} 
                            onChange={(e) => onUpdateShape(selectedShape.id, { x: Number(e.target.value) })}
                            className="w-full p-2 border rounded text-sm"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-gray-500 block mb-1">Y Position</label>
                        <input 
                            type="number" 
                            value={Math.round(selectedShape.y)} 
                            onChange={(e) => onUpdateShape(selectedShape.id, { y: Number(e.target.value) })}
                            className="w-full p-2 border rounded text-sm"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-gray-500 block mb-1">Width</label>
                        <input 
                            type="number" 
                            value={Math.round(selectedShape.width || 0)} 
                            onChange={(e) => onUpdateShape(selectedShape.id, { width: Number(e.target.value) })}
                            className="w-full p-2 border rounded text-sm"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-gray-500 block mb-1">Height</label>
                        <input 
                            type="number" 
                            value={Math.round(selectedShape.height || 0)} 
                            onChange={(e) => onUpdateShape(selectedShape.id, { height: Number(e.target.value) })}
                            className="w-full p-2 border rounded text-sm"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-gray-500 block mb-1">Rotation</label>
                        <input 
                            type="number" 
                            value={Math.round(selectedShape.rotation || 0)} 
                            onChange={(e) => onUpdateShape(selectedShape.id, { rotation: Number(e.target.value) })}
                            className="w-full p-2 border rounded text-sm"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-gray-500 block mb-1">Opacity</label>
                        <input 
                            type="range" 
                            min="0" max="1" step="0.1"
                            value={selectedShape.opacity ?? 1} 
                            onChange={(e) => onUpdateShape(selectedShape.id, { opacity: Number(e.target.value) })}
                            className="w-full"
                        />
                    </div>
                </div>

                {/* Fill & Gradient Controls */}
                <div className="pt-4 border-t border-gray-200">
                    <label className="text-xs text-gray-500 block mb-1">Fill Type</label>
                    <select 
                        value={selectedShape.fillType || 'solid'} 
                        onChange={(e) => onUpdateShape(selectedShape.id, { fillType: e.target.value as any })}
                        className="w-full p-2 border rounded text-sm mb-2"
                    >
                        <option value="solid">Solid Color</option>
                        <option value="gradient">Gradient</option>
                    </select>

                    {selectedShape.fillType === 'gradient' ? (
                        <div className="space-y-2">
                            <div>
                                <label className="text-xs text-gray-500 block mb-1">Start Color</label>
                                <div className="flex items-center gap-2">
                                    <input 
                                        type="color" 
                                        value={selectedShape.gradientStart || '#3b82f6'} 
                                        onChange={(e) => onUpdateShape(selectedShape.id, { gradientStart: e.target.value })}
                                        className="w-8 h-8 p-0 border-0 rounded cursor-pointer"
                                    />
                                    <input 
                                        type="text" 
                                        value={selectedShape.gradientStart || '#3b82f6'} 
                                        onChange={(e) => onUpdateShape(selectedShape.id, { gradientStart: e.target.value })}
                                        className="flex-1 p-1 border rounded text-xs"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 block mb-1">End Color</label>
                                <div className="flex items-center gap-2">
                                    <input 
                                        type="color" 
                                        value={selectedShape.gradientEnd || '#60a5fa'} 
                                        onChange={(e) => onUpdateShape(selectedShape.id, { gradientEnd: e.target.value })}
                                        className="w-8 h-8 p-0 border-0 rounded cursor-pointer"
                                    />
                                    <input 
                                        type="text" 
                                        value={selectedShape.gradientEnd || '#60a5fa'} 
                                        onChange={(e) => onUpdateShape(selectedShape.id, { gradientEnd: e.target.value })}
                                        className="flex-1 p-1 border rounded text-xs"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 block mb-1">Direction</label>
                                <select 
                                    value={selectedShape.gradientAngle || 'horizontal'} 
                                    onChange={(e) => onUpdateShape(selectedShape.id, { gradientAngle: e.target.value as any })}
                                    className="w-full p-2 border rounded text-sm"
                                >
                                    <option value="horizontal">Horizontal</option>
                                    <option value="vertical">Vertical</option>
                                    <option value="diagonal">Diagonal</option>
                                    <option value="radial">Radial</option>
                                </select>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <label className="text-xs text-gray-500 block mb-1">Color</label>
                            <div className="flex items-center gap-2">
                                <input 
                                    type="color" 
                                    value={selectedShape.fill || '#3b82f6'} 
                                    onChange={(e) => onUpdateShape(selectedShape.id, { fill: e.target.value })}
                                    className="w-8 h-8 p-0 border-0 rounded cursor-pointer"
                                />
                                <input 
                                    type="text" 
                                    value={selectedShape.fill || '#3b82f6'} 
                                    onChange={(e) => onUpdateShape(selectedShape.id, { fill: e.target.value })}
                                    className="flex-1 p-1 border rounded text-xs"
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Text Specific */}
                {selectedShape.type === 'text' && (
                    <div className="pt-4 border-t border-gray-200 space-y-3">
                        <h4 className="font-semibold text-gray-700 text-xs uppercase tracking-wider">Typography</h4>
                        
                        <div>
                            <label className="text-xs text-gray-500 block mb-1">Content</label>
                            <textarea 
                                value={selectedShape.text} 
                                onChange={(e) => onUpdateShape(selectedShape.id, { text: e.target.value })}
                                className="w-full p-2 border rounded text-sm"
                                rows={3}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="text-xs text-gray-500 block mb-1">Font Family</label>
                                <select 
                                    value={selectedShape.fontFamily || 'Inter'} 
                                    onChange={(e) => onUpdateShape(selectedShape.id, { fontFamily: e.target.value })}
                                    className="w-full p-2 border rounded text-sm"
                                >
                                    <option value="Inter">Inter</option>
                                    <option value="Arial">Arial</option>
                                    <option value="Helvetica">Helvetica</option>
                                    <option value="Times New Roman">Times New Roman</option>
                                    <option value="Courier New">Courier New</option>
                                    <option value="Georgia">Georgia</option>
                                    <option value="Verdana">Verdana</option>
                                    <option value="Impact">Impact</option>
                                    <option value="Comic Sans MS">Comic Sans MS</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 block mb-1">Font Size</label>
                                <input 
                                    type="number" 
                                    value={selectedShape.fontSize || 16} 
                                    onChange={(e) => onUpdateShape(selectedShape.id, { fontSize: Number(e.target.value) })}
                                    className="w-full p-2 border rounded text-sm"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="text-xs text-gray-500 block mb-1">Letter Spacing</label>
                                <input 
                                    type="number" 
                                    step="0.5"
                                    value={selectedShape.letterSpacing || 0} 
                                    onChange={(e) => onUpdateShape(selectedShape.id, { letterSpacing: Number(e.target.value) })}
                                    className="w-full p-2 border rounded text-sm"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 block mb-1">Line Height</label>
                                <input 
                                    type="number" 
                                    step="0.1"
                                    value={selectedShape.lineHeight || 1} 
                                    onChange={(e) => onUpdateShape(selectedShape.id, { lineHeight: Number(e.target.value) })}
                                    className="w-full p-2 border rounded text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs text-gray-500 block mb-1">Style</label>
                            <div className="flex gap-2">
                                <button 
                                    className={`p-2 border rounded ${selectedShape.fontStyle?.includes('bold') ? 'bg-blue-100 border-blue-500' : 'bg-white'}`}
                                    onClick={() => {
                                        const currentStyle = selectedShape.fontStyle || '';
                                        const isBold = currentStyle.includes('bold');
                                        const newStyle = isBold ? currentStyle.replace('bold', '').trim() : currentStyle + ' bold';
                                        onUpdateShape(selectedShape.id, { fontStyle: newStyle.trim() });
                                    }}
                                >
                                    <span className="font-bold">B</span>
                                </button>
                                <button 
                                    className={`p-2 border rounded ${selectedShape.fontStyle?.includes('italic') ? 'bg-blue-100 border-blue-500' : 'bg-white'}`}
                                    onClick={() => {
                                        const currentStyle = selectedShape.fontStyle || '';
                                        const isItalic = currentStyle.includes('italic');
                                        const newStyle = isItalic ? currentStyle.replace('italic', '').trim() : currentStyle + ' italic';
                                        onUpdateShape(selectedShape.id, { fontStyle: newStyle.trim() });
                                    }}
                                >
                                    <span className="italic">I</span>
                                </button>
                                <button 
                                    className={`p-2 border rounded ${selectedShape.textDecoration === 'underline' ? 'bg-blue-100 border-blue-500' : 'bg-white'}`}
                                    onClick={() => onUpdateShape(selectedShape.id, { textDecoration: selectedShape.textDecoration === 'underline' ? '' : 'underline' })}
                                >
                                    <span className="underline">U</span>
                                </button>
                                <button 
                                    className={`p-2 border rounded ${selectedShape.textDecoration === 'line-through' ? 'bg-blue-100 border-blue-500' : 'bg-white'}`}
                                    onClick={() => onUpdateShape(selectedShape.id, { textDecoration: selectedShape.textDecoration === 'line-through' ? '' : 'line-through' })}
                                >
                                    <span className="line-through">S</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Effects Section (Stroke, Shadow, Radius) */}
                <div className="pt-4 border-t border-gray-200 space-y-3">
                    <h4 className="font-semibold text-gray-700 text-xs uppercase tracking-wider">Effects</h4>
                    
                    {/* Stroke */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-xs text-gray-500">Border / Outline</label>
                            <input 
                                type="checkbox" 
                                checked={!!selectedShape.stroke} 
                                onChange={(e) => onUpdateShape(selectedShape.id, { stroke: e.target.checked ? '#000000' : '', strokeWidth: e.target.checked ? 2 : 0 })}
                            />
                        </div>
                        {selectedShape.stroke && (
                            <div className="pl-2 border-l-2 border-gray-200 space-y-2">
                                <div className="flex items-center gap-2">
                                    <input 
                                        type="color" 
                                        value={selectedShape.stroke} 
                                        onChange={(e) => onUpdateShape(selectedShape.id, { stroke: e.target.value })}
                                        className="w-6 h-6 p-0 border-0 rounded cursor-pointer"
                                    />
                                    <input 
                                        type="number" 
                                        value={selectedShape.strokeWidth || 0} 
                                        onChange={(e) => onUpdateShape(selectedShape.id, { strokeWidth: Number(e.target.value) })}
                                        className="flex-1 p-1 border rounded text-xs"
                                        placeholder="Width"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Shadow */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-xs text-gray-500">Shadow</label>
                            <input 
                                type="checkbox" 
                                checked={!!selectedShape.shadowColor} 
                                onChange={(e) => onUpdateShape(selectedShape.id, { 
                                    shadowColor: e.target.checked ? '#000000' : '', 
                                    shadowBlur: 10, 
                                    shadowOpacity: 0.5,
                                    shadowOffsetX: 5,
                                    shadowOffsetY: 5
                                })}
                            />
                        </div>
                        {selectedShape.shadowColor && (
                            <div className="pl-2 border-l-2 border-gray-200 space-y-2">
                                <div className="flex items-center gap-2">
                                    <label className="text-[10px] w-10">Color</label>
                                    <input 
                                        type="color" 
                                        value={selectedShape.shadowColor} 
                                        onChange={(e) => onUpdateShape(selectedShape.id, { shadowColor: e.target.value })}
                                        className="w-6 h-6 p-0 border-0 rounded cursor-pointer"
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <label className="text-[10px] w-10">Blur</label>
                                    <input 
                                        type="range" 
                                        min="0" max="50"
                                        value={selectedShape.shadowBlur || 0} 
                                        onChange={(e) => onUpdateShape(selectedShape.id, { shadowBlur: Number(e.target.value) })}
                                        className="flex-1"
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <label className="text-[10px] w-10">Offset X</label>
                                    <input 
                                        type="range" 
                                        min="-50" max="50"
                                        value={selectedShape.shadowOffsetX || 0} 
                                        onChange={(e) => onUpdateShape(selectedShape.id, { shadowOffsetX: Number(e.target.value) })}
                                        className="flex-1"
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <label className="text-[10px] w-10">Offset Y</label>
                                    <input 
                                        type="range" 
                                        min="-50" max="50"
                                        value={selectedShape.shadowOffsetY || 0} 
                                        onChange={(e) => onUpdateShape(selectedShape.id, { shadowOffsetY: Number(e.target.value) })}
                                        className="flex-1"
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <label className="text-[10px] w-10">Opacity</label>
                                    <input 
                                        type="range" 
                                        min="0" max="1" step="0.1"
                                        value={selectedShape.shadowOpacity || 0.5} 
                                        onChange={(e) => onUpdateShape(selectedShape.id, { shadowOpacity: Number(e.target.value) })}
                                        className="flex-1"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Corner Radius (Rect only) */}
                    {selectedShape.type === 'rect' && (
                        <div>
                            <label className="text-xs text-gray-500 block mb-1">Corner Radius</label>
                            <input 
                                type="range" 
                                min="0" max="100"
                                value={selectedShape.cornerRadius || 0} 
                                onChange={(e) => onUpdateShape(selectedShape.id, { cornerRadius: Number(e.target.value) })}
                                className="w-full"
                            />
                        </div>
                    )}
                </div>
            </div>
        )}

        {/* Elements Tab */}
        {activeTab === 'elements' && (
            <div className="p-4">
                <h3 className="font-bold text-gray-800 mb-4">Shapes</h3>
                <div className="grid grid-cols-3 gap-3">
                    <ShapeButton 
                        onClick={() => onAddShape('rect')} 
                        onDragStart={(e: React.DragEvent) => e.dataTransfer.setData('type', 'rect')}
                        icon={<Square size={24} />} 
                        label="Square" 
                    />
                    <ShapeButton 
                        onClick={() => onAddShape('circle')} 
                        onDragStart={(e: React.DragEvent) => e.dataTransfer.setData('type', 'circle')}
                        icon={<Circle size={24} />} 
                        label="Circle" 
                    />
                    <ShapeButton 
                        onClick={() => onAddShape('triangle')} 
                        onDragStart={(e: React.DragEvent) => e.dataTransfer.setData('type', 'triangle')}
                        icon={<Triangle size={24} />} 
                        label="Triangle" 
                    />
                    <ShapeButton 
                        onClick={() => onAddShape('star')} 
                        onDragStart={(e: React.DragEvent) => e.dataTransfer.setData('type', 'star')}
                        icon={<Star size={24} />} 
                        label="Star" 
                    />
                    <ShapeButton 
                        onClick={() => onAddShape('heart')} 
                        onDragStart={(e: React.DragEvent) => e.dataTransfer.setData('type', 'heart')}
                        icon={<Heart size={24} />} 
                        label="Heart" 
                    />
                </div>
            </div>
        )}

        {/* Text Tab */}
        {activeTab === 'text' && (
            <div className="p-4 space-y-4">
                <h3 className="font-bold text-gray-800">Typography</h3>
                
                <button 
                    onClick={() => onAddShape('text', 'heading')}
                    draggable
                    onDragStart={(e) => {
                        e.dataTransfer.setData('type', 'text');
                        e.dataTransfer.setData('variant', 'heading');
                    }}
                    className="w-full p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:border-blue-400 transition-all text-left group cursor-grab active:cursor-grabbing"
                >
                    <h1 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600">Add a heading</h1>
                </button>

                <button 
                    onClick={() => onAddShape('text', 'subheading')}
                    draggable
                    onDragStart={(e) => {
                        e.dataTransfer.setData('type', 'text');
                        e.dataTransfer.setData('variant', 'subheading');
                    }}
                    className="w-full p-3 bg-white rounded-lg shadow-sm border border-gray-200 hover:border-blue-400 transition-all text-left group cursor-grab active:cursor-grabbing"
                >
                    <h2 className="text-lg font-semibold text-gray-700 group-hover:text-blue-600">Add a subheading</h2>
                </button>

                <button 
                    onClick={() => onAddShape('text', 'body')}
                    draggable
                    onDragStart={(e) => {
                        e.dataTransfer.setData('type', 'text');
                        e.dataTransfer.setData('variant', 'body');
                    }}
                    className="w-full p-3 bg-white rounded-lg shadow-sm border border-gray-200 hover:border-blue-400 transition-all text-left group cursor-grab active:cursor-grabbing"
                >
                    <p className="text-sm text-gray-600 group-hover:text-blue-600">Add a little bit of body text</p>
                </button>
            </div>
        )}

        {/* Uploads Tab */}
        {activeTab === 'uploads' && (
            <div className="p-4">
                <h3 className="font-bold text-gray-800 mb-4">Uploads</h3>
                
                <div className="mt-4 mb-6">
                    <label className="w-full flex flex-col items-center justify-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition-colors">
                        <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c5 .38 2 .83 2 1.1z" />
                        </svg>
                        <span className="mt-2 text-base leading-normal">Upload Media</span>
                        <input type='file' className="hidden" accept="image/*" onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                if (file.size > 1024 * 1024 * 5) { // 5MB limit
                                    alert('Image is too large. Please upload an image smaller than 5MB.');
                                    return;
                                }
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                    if (event.target?.result) {
                                        const result = event.target.result as string;
                                        setUploadedAssets(prev => [result, ...prev]);
                                    }
                                };
                                reader.readAsDataURL(file);
                            }
                        }} />
                    </label>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    {uploadedAssets.map((src, i) => (
                        <div 
                            key={i} 
                            className="aspect-square bg-gray-100 rounded overflow-hidden cursor-grab active:cursor-grabbing hover:opacity-80 relative group" 
                            onClick={() => onAddShape('image', src)}
                            draggable
                            onDragStart={(e) => {
                                e.dataTransfer.setData('type', 'image');
                                e.dataTransfer.setData('src', src);
                            }}
                        >
                            <img src={src} alt="Upload" className="w-full h-full object-cover pointer-events-none" />
                            <button 
                                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setUploadedAssets(prev => prev.filter((_, index) => index !== i));
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>
                    ))}
                    {uploadedAssets.length === 0 && (
                        <div className="col-span-2 text-center text-gray-400 text-sm py-8">
                            No uploads yet
                        </div>
                    )}
                </div>
            </div>
        )}

      </div>
    </div>
  );
};

const TabButton = ({ active, onClick, icon, label }: any) => (
    <button 
        onClick={onClick}
        className={`flex flex-col items-center gap-1 p-2 w-full transition-colors ${active ? 'text-blue-600' : 'text-gray-500 hover:text-gray-800'}`}
    >
        {icon}
        <span className="text-[10px] font-medium">{label}</span>
    </button>
);

const ShapeButton = ({ onClick, icon, label, onDragStart }: any) => (
    <button 
        onClick={onClick}
        draggable={!!onDragStart}
        onDragStart={onDragStart}
        className="aspect-square bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 hover:border-blue-300 transition-all text-gray-600 cursor-grab active:cursor-grabbing"
    >
        {icon}
        <span className="text-[10px]">{label}</span>
    </button>
);
