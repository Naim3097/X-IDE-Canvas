import React from 'react';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

export const FONT_FAMILIES = [
  'Inter',
  'Roboto',
  'Open Sans',
  'Lato',
  'Montserrat',
  'Poppins',
  'Playfair Display',
  'Arial',
  'Times New Roman',
  'Courier New'
];

interface FontPickerProps {
  fontFamily: string;
  fontSize: number;
  fontStyle: string; // 'normal' | 'italic' | 'bold' | 'bold italic'
  textDecoration: string; // '' | 'underline' | 'line-through'
  align: string; // 'left' | 'center' | 'right'
  onChange: (updates: Partial<{
    fontFamily: string;
    fontSize: number;
    fontStyle: string;
    textDecoration: string;
    align: string;
  }>) => void;
}

export const FontPicker: React.FC<FontPickerProps> = ({
  fontFamily,
  fontSize,
  fontStyle,
  textDecoration,
  align,
  onChange
}) => {
  
  const isBold = fontStyle.includes('bold');
  const isItalic = fontStyle.includes('italic');
  const isUnderline = textDecoration.includes('underline');

  const toggleBold = () => {
    let newStyle = fontStyle;
    if (isBold) {
      newStyle = newStyle.replace('bold', '').trim();
    } else {
      newStyle = `${newStyle} bold`.trim();
    }
    onChange({ fontStyle: newStyle || 'normal' });
  };

  const toggleItalic = () => {
    let newStyle = fontStyle;
    if (isItalic) {
      newStyle = newStyle.replace('italic', '').trim();
    } else {
      newStyle = `${newStyle} italic`.trim();
    }
    onChange({ fontStyle: newStyle || 'normal' });
  };

  const toggleUnderline = () => {
    onChange({ textDecoration: isUnderline ? '' : 'underline' });
  };

  return (
    <div className="space-y-3">
      {/* Font Family */}
      <div>
        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Font Family</label>
        <select 
          value={fontFamily} 
          onChange={(e) => onChange({ fontFamily: e.target.value })}
          className="w-full p-2 border rounded text-sm bg-white"
        >
          {FONT_FAMILIES.map(font => (
            <option key={font} value={font} style={{ fontFamily: font }}>{font}</option>
          ))}
        </select>
      </div>

      {/* Size & Style Row */}
      <div className="flex gap-2">
        <div className="flex-1">
             <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Size</label>
             <input 
                type="number" 
                value={fontSize} 
                onChange={(e) => onChange({ fontSize: Number(e.target.value) })}
                className="w-full p-2 border rounded text-sm"
             />
        </div>
      </div>

      {/* Formatting Toolbar */}
      <div className="flex gap-1 p-1 bg-gray-50 rounded border border-gray-200">
        <button 
            onClick={toggleBold}
            className={`p-1.5 rounded hover:bg-gray-200 ${isBold ? 'bg-gray-200 text-blue-600' : 'text-gray-600'}`}
            title="Bold"
        >
            <Bold size={16} />
        </button>
        <button 
            onClick={toggleItalic}
            className={`p-1.5 rounded hover:bg-gray-200 ${isItalic ? 'bg-gray-200 text-blue-600' : 'text-gray-600'}`}
            title="Italic"
        >
            <Italic size={16} />
        </button>
        <button 
            onClick={toggleUnderline}
            className={`p-1.5 rounded hover:bg-gray-200 ${isUnderline ? 'bg-gray-200 text-blue-600' : 'text-gray-600'}`}
            title="Underline"
        >
            <Underline size={16} />
        </button>
        <div className="w-px bg-gray-300 mx-1 my-1"></div>
        <button 
            onClick={() => onChange({ align: 'left' })}
            className={`p-1.5 rounded hover:bg-gray-200 ${align === 'left' ? 'bg-gray-200 text-blue-600' : 'text-gray-600'}`}
            title="Align Left"
        >
            <AlignLeft size={16} />
        </button>
        <button 
            onClick={() => onChange({ align: 'center' })}
            className={`p-1.5 rounded hover:bg-gray-200 ${align === 'center' ? 'bg-gray-200 text-blue-600' : 'text-gray-600'}`}
            title="Align Center"
        >
            <AlignCenter size={16} />
        </button>
        <button 
            onClick={() => onChange({ align: 'right' })}
            className={`p-1.5 rounded hover:bg-gray-200 ${align === 'right' ? 'bg-gray-200 text-blue-600' : 'text-gray-600'}`}
            title="Align Right"
        >
            <AlignRight size={16} />
        </button>
      </div>
    </div>
  );
};
