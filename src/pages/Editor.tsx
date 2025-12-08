import { Stage, Layer, Rect, Transformer, Group } from 'react-konva';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Download, Save, ChevronDown, Eye, Play, Trash2 } from 'lucide-react';
import { SOCIAL_FORMATS } from '../config/social-formats';
import { useState, useRef, useEffect } from 'react';
import Konva from 'konva';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { SidePanel } from '../components/SidePanel';
import { ContextToolbar } from '../components/ContextToolbar';
import { ContextMenu } from '../components/ContextMenu';
import { SocialPreview } from '../components/SocialPreview';
import { SafeZoneOverlay } from '../components/SafeZoneOverlay';
import type { Shape } from '../types';
import { ShapeItem } from '../components/ShapeItem';

export default function Editor() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const formatId = searchParams.get('format');
  const format = SOCIAL_FORMATS.find(f => f.id === formatId);

  // Canvas State
  const [stageSize, setStageSize] = useState({ w: window.innerWidth, h: window.innerHeight });
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showResizeMenu, setShowResizeMenu] = useState(false);
  const [showSafeZones, setShowSafeZones] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  
  // Selection State
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<{ visible: boolean; x: number; y: number } | null>(null);
  const [clipboard, setClipboard] = useState<Shape | null>(null);

  // Persistent Scene Graph
  const [shapes, setShapes] = useState<Shape[]>(() => {
    const saved = localStorage.getItem('x-ide-shapes');
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (e) {
            console.error('Failed to parse shapes', e);
        }
    }
    return [
        { 
            id: 'rect1', 
            type: 'rect', 
            x: 50, 
            y: 50, 
            width: 100, 
            height: 100, 
            fillType: 'solid',
            fill: '#ef4444',
            gradientStart: '#ef4444',
            gradientEnd: '#ffffff',
            gradientAngle: 'horizontal'
        },
        { 
            id: 'text1', 
            type: 'text', 
            x: 200, 
            y: 200, 
            text: 'Hello X-IDE', 
            fontSize: 24, 
            fillType: 'solid',
            fill: 'black',
            gradientStart: 'black',
            gradientEnd: 'gray',
            gradientAngle: 'horizontal',
            fontFamily: 'Inter',
            fontStyle: 'normal',
            textDecoration: '',
            align: 'left'
        }
    ];
  });

  // Save to local storage
  useEffect(() => {
    try {
        localStorage.setItem('x-ide-shapes', JSON.stringify(shapes));
    } catch (e) {
        console.warn('Failed to save shapes to localStorage (likely quota exceeded)', e);
    }
  }, [shapes]);

  const stageRef = useRef<Konva.Stage>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trRef = useRef<Konva.Transformer>(null);

  // Initialize Artboard View
  useEffect(() => {
    if (containerRef.current && format) {
      const { offsetWidth, offsetHeight } = containerRef.current;
      setStageSize({ w: offsetWidth, h: offsetHeight });

      // Center the artboard
      const padding = 50;
      const scaleX = (offsetWidth - padding * 2) / format.width;
      const scaleY = (offsetHeight - padding * 2) / format.height;
      const newScale = Math.min(scaleX, scaleY, 1); // Don't zoom in too much initially
      
      setScale(newScale);
      setPosition({
        x: (offsetWidth - format.width * newScale) / 2,
        y: (offsetHeight - format.height * newScale) / 2
      });
    }
  }, [format]);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setStageSize({
            w: containerRef.current.offsetWidth,
            h: containerRef.current.offsetHeight
        });
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Transformer Effect
  useEffect(() => {
    if (selectedId && trRef.current && stageRef.current) {
      const node = stageRef.current.findOne('#' + selectedId);
      if (node) {
        trRef.current.nodes([node]);
        trRef.current.getLayer()?.batchDraw();
      }
    }
  }, [selectedId, shapes]);

  const handleAddShape = (type: 'rect' | 'text' | 'circle' | 'star' | 'image' | 'triangle' | 'heart', variant?: string, x?: number, y?: number) => {
    const id = `${type}-${Date.now()}`;
    const newShape: Shape = {
        id,
        type: type as any,
        x: x ?? 50,
        y: y ?? 50,
        fillType: 'solid',
        fill: '#3b82f6',
        gradientStart: '#3b82f6',
        gradientEnd: '#60a5fa',
        gradientAngle: 'horizontal',
    };
    
    if (type === 'rect') {
        newShape.width = 150;
        newShape.height = 150;
    } else if (type === 'circle') {
        newShape.width = 100;
        newShape.height = 100;
        newShape.fill = '#ef4444';
    } else if (type === 'triangle') {
        newShape.width = 120;
        newShape.height = 120;
        newShape.fill = '#10b981';
    } else if (type === 'heart') {
        newShape.width = 120;
        newShape.height = 120;
        newShape.fill = '#ec4899';
    } else if (type === 'star') {
        newShape.width = 120;
        newShape.height = 120;
        newShape.fill = '#eab308';
    } else if (type === 'text') {
        newShape.fill = 'black';
        newShape.text = 'Double click to edit';
        newShape.fontSize = 32;
        newShape.fontFamily = 'Inter';
        newShape.fontStyle = 'normal';
        newShape.textDecoration = '';
        newShape.align = 'left';

        if (variant === 'heading1') {
             newShape.fontSize = 48;
             newShape.text = 'Heading';
             newShape.fontStyle = 'bold';
        } else if (variant === 'heading2') {
             newShape.fontSize = 32;
             newShape.text = 'Subheading';
             newShape.fontStyle = 'bold';
        } else if (variant === 'body') {
             newShape.fontSize = 16;
             newShape.text = 'Body text';
        }
    } else if (type === 'image') {
        newShape.width = 200;
        newShape.height = 200;
        newShape.imageUrl = variant;
    }
    
    setShapes([...shapes, newShape]);
    setSelectedId(id);
  };

  const checkDeselect = (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    // or clicked on the artboard background (which is a Rect)
    const clickedOnArtboard = e.target.attrs.id === 'artboard-bg';
    
    if (clickedOnEmpty || clickedOnArtboard) {
      setSelectedId(null);
      trRef.current?.nodes([]);
    }
  };

  const handleUpdateShape = (id: string, attrs: Partial<Shape>) => {
    setShapes(shapes.map(shape => {
        if (shape.id === id) {
            return { ...shape, ...attrs };
        }
        return shape;
    }));
  };

  const handleLayer = (action: 'front' | 'back' | 'forward' | 'backward') => {
    if (!selectedId) return;
    const index = shapes.findIndex(s => s.id === selectedId);
    if (index === -1) return;

    const newShapes = [...shapes];
    const shape = newShapes[index];
    newShapes.splice(index, 1);

    if (action === 'front') {
        newShapes.push(shape);
    } else if (action === 'back') {
        newShapes.unshift(shape);
    } else if (action === 'forward') {
        const newIndex = Math.min(index + 1, shapes.length - 1);
        newShapes.splice(newIndex, 0, shape);
    } else if (action === 'backward') {
        const newIndex = Math.max(index - 1, 0);
        newShapes.splice(newIndex, 0, shape);
    }
    setShapes(newShapes);
  };

  const handleDuplicate = () => {
    if (!selectedId) return;
    const shape = shapes.find(s => s.id === selectedId);
    if (!shape) return;

    const newShape = {
        ...shape,
        id: `${shape.type}-${Date.now()}`,
        x: shape.x + 20,
        y: shape.y + 20
    };
    setShapes([...shapes, newShape]);
    setSelectedId(newShape.id);
  };

  const handleDelete = () => {
    if (!selectedId) return;
    setShapes(shapes.filter(s => s.id !== selectedId));
    setSelectedId(null);
  };

  const handleContextMenu = (e: Konva.KonvaEventObject<PointerEvent>) => {
    e.evt.preventDefault();
    if (e.target === e.target.getStage()) {
        setSelectedId(null);
        setContextMenu(null);
        return;
    }
    
    const shapeId = e.target.attrs.id;
    if (shapeId) {
        setSelectedId(shapeId);
        setContextMenu({
            visible: true,
            x: e.evt.clientX,
            y: e.evt.clientY
        });
    }
  };

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        // Ignore if typing in an input
        if (document.activeElement instanceof HTMLInputElement || document.activeElement instanceof HTMLTextAreaElement) {
            return;
        }

        if (e.key === 'Delete' || e.key === 'Backspace') {
            if (selectedId) {
                 setShapes(prev => prev.filter(s => s.id !== selectedId));
                 setSelectedId(null);
            }
        } else if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
            if (selectedId) {
                const shape = shapes.find(s => s.id === selectedId);
                if (shape) {
                    setClipboard(shape);
                }
            }
        } else if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
            if (clipboard) {
                const newShape = {
                    ...clipboard,
                    id: `${clipboard.type}-${Date.now()}`,
                    x: clipboard.x + 20,
                    y: clipboard.y + 20
                };
                setShapes(prev => [...prev, newShape]);
                setSelectedId(newShape.id);
            }
        } else if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
            e.preventDefault();
            if (selectedId) {
                const shape = shapes.find(s => s.id === selectedId);
                if (shape) {
                    const newShape = {
                        ...shape,
                        id: `${shape.type}-${Date.now()}`,
                        x: shape.x + 20,
                        y: shape.y + 20
                    };
                    setShapes(prev => [...prev, newShape]);
                    setSelectedId(newShape.id);
                }
            }
        } else if (selectedId) {
             const shape = shapes.find(s => s.id === selectedId);
             if (shape) {
                const step = e.shiftKey ? 10 : 1;
                let newX = shape.x;
                let newY = shape.y;
                
                if (e.key === 'ArrowUp') newY -= step;
                else if (e.key === 'ArrowDown') newY += step;
                else if (e.key === 'ArrowLeft') newX -= step;
                else if (e.key === 'ArrowRight') newX += step;
                else return;

                e.preventDefault();
                setShapes(prev => prev.map(s => s.id === selectedId ? { ...s, x: newX, y: newY } : s));
             }
        }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedId, shapes, clipboard]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('type');
    if (!type) return;
    
    const variant = e.dataTransfer.getData('variant') || e.dataTransfer.getData('src');

    if (stageRef.current) {
        stageRef.current.setPointersPositions(e);
        const pointer = stageRef.current.getPointerPosition();
        
        if (pointer) {
             const transform = stageRef.current.getAbsoluteTransform().copy();
             transform.invert();
             const pos = transform.point(pointer);
             
             handleAddShape(type as any, variant, pos.x, pos.y);
        }
    }
  };

  const handleDragStart = (id: string, e: Konva.KonvaEventObject<DragEvent>) => {
      if (e.evt.altKey) {
          const shape = shapes.find(s => s.id === id);
          if (shape) {
              // Create a copy at the ORIGINAL position
              // The current shape (id) is being dragged, so it will move.
              // We want to leave a copy behind.
              const newShape = {
                  ...shape,
                  id: `${shape.type}-${Date.now()}`,
                  // We don't need to adjust x/y because the dragged shape hasn't updated state yet
              };
              
              // We add the new shape to the list. 
              // IMPORTANT: We want the NEW shape to be the one that stays behind (the "original").
              // But Konva is dragging the node with `id`.
              // So `id` will move. `newShape` will stay at `shape.x, shape.y`.
              // This creates the effect of "dragging a copy out".
              
              setShapes(prev => [...prev, newShape]);
          }
      }
      setSelectedId(id);
  };

  const handleDoubleClick = (id: string) => {
    const shape = shapes.find(s => s.id === id);
    if (shape && shape.type === 'text') {
        setEditingId(id);
        setSelectedId(id);
    }
  };

  const handleTextEditEnd = (e: React.FocusEvent<HTMLTextAreaElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
      const target = e.target as HTMLTextAreaElement;
      if (editingId) {
          handleUpdateShape(editingId, { text: target.value });
          setEditingId(null);
      }
  };

  const handleClearCanvas = () => {
      if (window.confirm('Are you sure you want to clear the canvas? This cannot be undone.')) {
          setShapes([]);
          setSelectedId(null);
          localStorage.removeItem('x-ide-shapes');
      }
  };

  const downloadURI = (uri: string, name: string) => {
    const link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExport = () => {
    if (!stageRef.current) return;

    // Deselect to hide transformer
    setSelectedId(null);
    
    // Small delay to allow React to render the deselection
    setTimeout(() => {
        if (!stageRef.current) return;

        const pixelRatio = 2; // High quality export

        if (format) {
            // Save current state
            const oldScale = stageRef.current.scaleX();
            const oldPos = stageRef.current.position();
            
            // Reset stage to capture the exact artboard area
            stageRef.current.scale({ x: 1, y: 1 });
            stageRef.current.position({ x: 0, y: 0 });
            
            const dataURL = stageRef.current.toDataURL({
                x: 0,
                y: 0,
                width: format.width,
                height: format.height,
                pixelRatio: pixelRatio,
                mimeType: 'image/png',
            });
            
            // Restore state
            stageRef.current.scale({ x: oldScale, y: oldScale });
            stageRef.current.position(oldPos);
            
            downloadURI(dataURL, `design-${format.id}-${Date.now()}.png`);
        } else {
            // Export visible area or whole stage
            const dataURL = stageRef.current.toDataURL({
                pixelRatio: pixelRatio,
                mimeType: 'image/png',
            });
            downloadURI(dataURL, `design-${Date.now()}.png`);
        }
    }, 100);
  };

  const handlePreview = () => {
    if (!stageRef.current || !format) return;

    // Deselect to hide transformer
    setSelectedId(null);
    
    // Small delay to allow React to render the deselection
    setTimeout(() => {
        if (!stageRef.current) return;

        const pixelRatio = 1; // Standard quality for preview

        // Save current state
        const oldScale = stageRef.current.scaleX();
        const oldPos = stageRef.current.position();
        
        // Reset stage to capture the exact artboard area
        stageRef.current.scale({ x: 1, y: 1 });
        stageRef.current.position({ x: 0, y: 0 });
        
        const dataURL = stageRef.current.toDataURL({
            x: 0,
            y: 0,
            width: format.width,
            height: format.height,
            pixelRatio: pixelRatio,
            mimeType: 'image/png',
        });
        
        // Restore state
        stageRef.current.scale({ x: oldScale, y: oldScale });
        stageRef.current.position(oldPos);
        
        setPreviewImage(dataURL);
        setShowPreview(true);
    }, 100);
  };

  const handleResizeArtboard = (newFormatId: string) => {
      const newFormat = SOCIAL_FORMATS.find(f => f.id === newFormatId);
      if (!newFormat) return;

      if (format) {
          // Calculate scale factor based on width to maintain aspect ratios
          const scaleFactor = newFormat.width / format.width;

          const newShapes = shapes.map(shape => ({
              ...shape,
              x: shape.x * scaleFactor,
              y: shape.y * scaleFactor,
              width: shape.width ? shape.width * scaleFactor : shape.width,
              height: shape.height ? shape.height * scaleFactor : shape.height,
              fontSize: shape.fontSize ? shape.fontSize * scaleFactor : shape.fontSize,
          }));
          setShapes(newShapes);
      }

      setSearchParams({ format: newFormatId });
      setShowResizeMenu(false);
  };

  const handleSaveProject = () => {
      const projectData = {
          version: '1.0',
          timestamp: Date.now(),
          formatId: format?.id || null,
          shapes: shapes
      };
      
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(projectData));
      downloadURI(dataStr, `project-${Date.now()}.json`);
  };

  return (
    <ErrorBoundary>
    <div className="w-full h-screen flex flex-col bg-gray-100 overflow-hidden">
       {/* Top Bar - Context Toolbar */}
       <div className="h-14 bg-white border-b border-gray-200 flex-none z-30">
            <div className="flex items-center h-full px-4">
            <button 
                onClick={() => navigate('/')}
                className="mr-4 p-2 hover:bg-gray-100 rounded-full text-gray-600"
                title="Back to Dashboard"
            >
                <ArrowLeft size={20} />
            </button>
            <div className="flex-1">
                <ContextToolbar 
                    selectedShape={shapes.find(s => s.id === selectedId) || null}
                    onUpdate={(attrs) => selectedId && handleUpdateShape(selectedId, attrs)}
                    onDelete={handleDelete}
                    onDuplicate={handleDuplicate}
                    onLayer={handleLayer}
                />
            </div>
            <div className="flex items-center gap-2 border-l pl-4 ml-4 border-gray-200">
                {/* Safe Zones Toggle */}
                {format?.safeZones && (
                    <button
                        onClick={() => setShowSafeZones(!showSafeZones)}
                        className={`p-2 rounded-lg flex items-center gap-2 transition-colors ${showSafeZones ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100 text-gray-600'}`}
                        title="Toggle Safe Zones"
                    >
                        <Eye size={20} />
                    </button>
                )}

                {/* Resize Dropdown */}
                <div className="relative">
                    <button 
                        onClick={() => setShowResizeMenu(!showResizeMenu)}
                        className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 flex items-center gap-2"
                        title="Resize Artboard"
                    >
                        <span className="text-sm font-medium hidden md:inline">
                            {format ? format.name : 'Custom Size'}
                        </span>
                        <ChevronDown size={16} />
                    </button>
                    
                    {showResizeMenu && (
                        <>
                            <div 
                                className="fixed inset-0 z-40" 
                                onClick={() => setShowResizeMenu(false)}
                            />
                            <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 p-2 z-50 max-h-[80vh] overflow-y-auto">
                                <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Resize To
                                </div>
                                {SOCIAL_FORMATS.map(f => (
                                    <button
                                        key={f.id}
                                        onClick={() => handleResizeArtboard(f.id)}
                                        className={`w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg text-sm flex items-center justify-between group ${format?.id === f.id ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}
                                    >
                                        <div>
                                            <div className="font-medium">{f.name}</div>
                                            <div className="text-xs text-gray-400 group-hover:text-gray-500">{f.platform}</div>
                                        </div>
                                        <div className="text-xs text-gray-400 font-mono">
                                            {f.width}x{f.height}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                <button
                    onClick={handleClearCanvas}
                    className="p-2 hover:bg-red-50 text-red-600 hover:text-red-700 rounded-lg flex items-center gap-2 transition-colors"
                    title="Clear Canvas"
                >
                    <Trash2 size={20} />
                    <span className="text-sm font-medium hidden md:inline">Clear</span>
                </button>

                <button
                    onClick={handleSaveProject}
                    className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 flex items-center gap-2"
                    title="Save Project (JSON)"
                >
                    <Save size={20} />
                    <span className="text-sm font-medium hidden md:inline">Save</span>
                </button>
                <button
                    onClick={handlePreview}
                    className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 flex items-center gap-2"
                    title="Preview Design"
                >
                    <Play size={20} />
                    <span className="text-sm font-medium hidden md:inline">Preview</span>
                </button>
                <button
                    onClick={handleExport}
                    className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors"
                    title="Export as PNG"
                >
                    <Download size={20} />
                    <span className="text-sm font-medium hidden md:inline">Export</span>
                </button>
            </div>
            </div>
       </div>

       <div className="flex flex-1 overflow-hidden">
          {/* Custom Sidebar */}
          <div className="flex-none z-20 h-full shadow-xl">
            <SidePanel 
                onAddShape={handleAddShape} 
                selectedShape={shapes.find(s => s.id === selectedId)}
                onUpdateShape={handleUpdateShape}
                shapes={shapes}
                onSelectShape={setSelectedId}
                onDeleteShape={(id) => {
                    setShapes(shapes.filter(s => s.id !== id));
                    if (selectedId === id) setSelectedId(null);
                }}
            />
          </div>

          {/* Konva Container */}
          <div 
            className="flex-1 h-full relative bg-gray-200 overflow-hidden flex items-center justify-center" 
            ref={containerRef}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
              <Stage  
                width={stageSize.w} 
                height={stageSize.h} 
                scaleX={scale}
                scaleY={scale}
                x={position.x}
                y={position.y}
                draggable={!selectedId}
                ref={stageRef}
                onMouseDown={(e) => {
                    checkDeselect(e);
                    setContextMenu(null);
                }}
                onTouchStart={checkDeselect}
                onContextMenu={handleContextMenu}
                onWheel={(e) => {
                    e.evt.preventDefault();
                    const scaleBy = 1.1;
                    const oldScale = stageRef.current?.scaleX() || 1;
                    const pointer = stageRef.current?.getPointerPosition();
                    if (!pointer) return;

                    const mousePointTo = {
                        x: (pointer.x - (stageRef.current?.x() || 0)) / oldScale,
                        y: (pointer.y - (stageRef.current?.y() || 0)) / oldScale,
                    };
                    const newScale = e.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy;
                    setScale(newScale);
                    setPosition({
                        x: pointer.x - mousePointTo.x * newScale,
                        y: pointer.y - mousePointTo.y * newScale,
                    });
                }}
              >
                <Layer>
                    <Group
                        clipX={0}
                        clipY={0}
                        clipWidth={format?.width}
                        clipHeight={format?.height}
                    >
                        {/* Artboard Background */}
                        {format && (
                            <Rect
                                id="artboard-bg"
                                x={0}
                                y={0}
                                width={format.width}
                                height={format.height}
                                fill="white"
                                shadowColor="black"
                                shadowBlur={20}
                                shadowOpacity={0.1}
                            />
                        )}

                        {/* Safe Zones Overlay */}
                        {format && (
                            <SafeZoneOverlay 
                                width={format.width} 
                                height={format.height} 
                                safeZones={format.safeZones}
                                visible={showSafeZones}
                            />
                        )}

                        {/* Shapes */}
                        {shapes.map((shape) => (
                            <ShapeItem
                                key={shape.id}
                                shape={shape}
                                isSelected={selectedId === shape.id}
                                isEditing={editingId === shape.id}
                                onSelect={setSelectedId}
                                onChange={handleUpdateShape}
                                onDblClick={handleDoubleClick}
                                onDragStart={handleDragStart}
                            />
                        ))}
                    </Group>
                    
                    <Transformer
                        ref={trRef}
                        keepRatio={false}
                        shiftBehavior="inverted"
                        anchorSize={10}
                        anchorCornerRadius={5}
                        rotationSnaps={[0, 45, 90, 135, 180, 225, 270, 315]}
                        boundBoxFunc={(oldBox, newBox) => {
                            if (newBox.width < 5 || newBox.height < 5) {
                                return oldBox;
                            }
                            return newBox;
                        }}
                    />
                </Layer>
              </Stage>
              {editingId && (() => {
                  const shape = shapes.find(s => s.id === editingId);
                  if (!shape || !stageRef.current) return null;
                  
                  const textNode = stageRef.current.findOne('#' + editingId);
                  if (!textNode) return null;
                  
                  const absPos = textNode.getAbsolutePosition();
                  const rotation = textNode.getAbsoluteRotation();
                  const scaleX = stageRef.current.scaleX();

                  return (
                      <textarea
                          autoFocus
                          value={shape.text}
                          onChange={(e) => handleUpdateShape(editingId, { text: e.target.value })}
                          onBlur={handleTextEditEnd}
                          onKeyDown={(e) => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                  e.preventDefault();
                                  setEditingId(null);
                              }
                          }}
                          style={{
                              position: 'absolute',
                              top: absPos.y,
                              left: absPos.x,
                              width: textNode.width() * scaleX,
                              height: textNode.height() * scaleX,
                              fontSize: (shape.fontSize || 12) * scaleX,
                              fontFamily: shape.fontFamily || 'Arial',
                              lineHeight: shape.lineHeight || 1,
                              color: shape.fill,
                              textAlign: shape.align as any,
                              background: 'none',
                              border: 'none',
                              outline: '1px solid #3b82f6',
                              resize: 'none',
                              overflow: 'hidden',
                              transform: `rotate(${rotation}deg)`,
                              transformOrigin: 'top left',
                              zIndex: 100,
                              padding: 0,
                              margin: 0,
                          }}
                      />
                  );
              })()}
          </div>
       </div>
       
       {contextMenu && contextMenu.visible && (
        <ContextMenu 
            x={contextMenu.x} 
            y={contextMenu.y} 
            onClose={() => setContextMenu(null)}
            onDelete={handleDelete}
            onDuplicate={handleDuplicate}
            onLayer={handleLayer}
        />
       )}

       {/* Social Preview Modal */}
       {format && (
           <SocialPreview 
               isOpen={showPreview}
               onClose={() => setShowPreview(false)}
               imageSrc={previewImage}
               format={format}
           />
       )}
    </div>
    </ErrorBoundary>
  );
}