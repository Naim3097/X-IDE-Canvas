import React, { useEffect, useRef } from 'react';
import { Trash2, Copy, BringToFront, SendToBack, ArrowUp, ArrowDown } from 'lucide-react';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onLayer: (action: 'front' | 'back' | 'forward' | 'backward') => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, onClose, onDelete, onDuplicate, onLayer }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div 
        ref={menuRef}
        className="fixed bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-50 min-w-[200px]"
        style={{ top: y, left: x }}
    >
        <button onClick={() => { onDuplicate(); onClose(); }} className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-gray-700">
            <Copy size={16} /> Duplicate
        </button>
        <div className="h-px bg-gray-100 my-1" />
        <button onClick={() => { onLayer('front'); onClose(); }} className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-gray-700">
            <BringToFront size={16} /> Bring to Front
        </button>
        <button onClick={() => { onLayer('forward'); onClose(); }} className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-gray-700">
            <ArrowUp size={16} /> Bring Forward
        </button>
        <button onClick={() => { onLayer('backward'); onClose(); }} className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-gray-700">
            <ArrowDown size={16} /> Send Backward
        </button>
        <button onClick={() => { onLayer('back'); onClose(); }} className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-gray-700">
            <SendToBack size={16} /> Send to Back
        </button>
        <div className="h-px bg-gray-100 my-1" />
        <button onClick={() => { onDelete(); onClose(); }} className="w-full px-4 py-2 text-left text-sm hover:bg-red-50 flex items-center gap-2 text-red-600">
            <Trash2 size={16} /> Delete
        </button>
    </div>
  );
};
