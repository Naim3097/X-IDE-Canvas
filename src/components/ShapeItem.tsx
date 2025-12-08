import React from 'react';
import { Rect, Circle, Star, RegularPolygon, Path, Text, Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';
import type { Shape } from '../types';

interface ShapeItemProps {
  shape: Shape;
  isSelected: boolean;
  isEditing?: boolean;
  onSelect: (id: string) => void;
  onChange: (id: string, newAttrs: Partial<Shape>) => void;
  onDblClick?: (id: string) => void;
  onDragStart?: (id: string, e: any) => void;
}

const URLImage = ({ shape, onSelect, onChange, onDragStart, ...props }: any) => {
  const [img] = useImage(shape.imageUrl || '');
  return (
    <KonvaImage
      image={img}
      x={shape.x}
      y={shape.y}
      width={shape.width}
      height={shape.height}
      rotation={shape.rotation}
      draggable
      onClick={onSelect}
      onTap={onSelect}
      onDragStart={(e) => onDragStart && onDragStart(shape.id, e)}
      onDragEnd={(e) => {
        onChange(shape.id, {
          x: e.target.x(),
          y: e.target.y(),
        });
      }}
      onTransformEnd={(e) => {
        const node = e.target;
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();
        node.scaleX(1);
        node.scaleY(1);
        onChange(shape.id, {
          x: node.x(),
          y: node.y(),
          width: Math.max(5, node.width() * scaleX),
          height: Math.max(5, node.height() * scaleY),
          rotation: node.rotation(),
        });
      }}
      {...props}
    />
  );
};

export const ShapeItem: React.FC<ShapeItemProps> = React.memo(({ shape, isEditing, onSelect, onChange, onDblClick, onDragStart }) => {
  // Calculate Gradient Props
  let gradientProps = {};
  if (shape.fillType === 'gradient') {
      if (shape.gradientAngle === 'radial') {
          gradientProps = {
              fillPriority: 'radial-gradient',
              fillRadialGradientStartPoint: { x: (shape.width || 100) / 2, y: (shape.height || 100) / 2 },
              fillRadialGradientStartRadius: 0,
              fillRadialGradientEndPoint: { x: (shape.width || 100) / 2, y: (shape.height || 100) / 2 },
              fillRadialGradientEndRadius: Math.max(shape.width || 100, shape.height || 100) / 1.5,
              fillRadialGradientColorStops: [0, shape.gradientStart, 1, shape.gradientEnd]
          };
      } else {
          gradientProps = {
              fillPriority: 'linear-gradient',
              fillLinearGradientStartPoint: { x: 0, y: 0 },
              fillLinearGradientEndPoint: shape.gradientAngle === 'horizontal' 
                  ? { x: shape.width || 100, y: 0 } 
                  : shape.gradientAngle === 'vertical' 
                      ? { x: 0, y: shape.height || 100 } 
                      : { x: shape.width || 100, y: shape.height || 100 },
              fillLinearGradientColorStops: [0, shape.gradientStart, 1, shape.gradientEnd]
          };
      }
  } else {
      gradientProps = {
          fillPriority: 'color',
          fill: shape.fill
      };
  }

  const commonProps = {
      ...shape,
      ...gradientProps,
      draggable: true,
      onClick: () => onSelect(shape.id),
      onTap: () => onSelect(shape.id),
      onDragStart: (e: any) => onDragStart && onDragStart(shape.id, e),
      onDragEnd: (e: any) => {
          onChange(shape.id, {
              x: e.target.x(),
              y: e.target.y(),
          });
      },
  };

  if (shape.type === 'rect') {
      return (
          <Rect
              {...commonProps}
              onTransformEnd={(e) => {
                  const node = e.target;
                  const scaleX = node.scaleX();
                  const scaleY = node.scaleY();
                  node.scaleX(1);
                  node.scaleY(1);
                  onChange(shape.id, {
                      x: node.x(),
                      y: node.y(),
                      width: Math.max(5, node.width() * scaleX),
                      height: Math.max(5, node.height() * scaleY),
                      rotation: node.rotation(),
                  });
              }}
          />
      );
  } else if (shape.type === 'circle') {
      return (
          <Circle
              {...commonProps}
              radius={(shape.width || 100) / 2}
              onTransformEnd={(e) => {
                  const node = e.target;
                  const scaleX = node.scaleX();
                  node.scaleX(1);
                  node.scaleY(1);
                  onChange(shape.id, {
                      x: node.x(),
                      y: node.y(),
                      width: Math.max(5, (node.width()) * scaleX),
                      height: Math.max(5, (node.height()) * scaleX),
                      rotation: node.rotation(),
                  });
              }}
          />
      );
  } else if (shape.type === 'triangle') {
      return (
          <RegularPolygon
              {...commonProps}
              sides={3}
              radius={(shape.width || 100) / 2}
              onTransformEnd={(e) => {
                  const node = e.target;
                  const scaleX = node.scaleX();
                  node.scaleX(1);
                  node.scaleY(1);
                  onChange(shape.id, {
                      x: node.x(),
                      y: node.y(),
                      width: Math.max(5, (node.width()) * scaleX),
                      height: Math.max(5, (node.height()) * scaleX),
                      rotation: node.rotation(),
                  });
              }}
          />
      );
  } else if (shape.type === 'heart') {
      return (
          <Path
              {...commonProps}
              data="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              scaleX={(shape.width || 100) / 24}
              scaleY={(shape.height || 100) / 24}
              onTransformEnd={(e) => {
                  const node = e.target;
                  const scaleX = node.scaleX();
                  const scaleY = node.scaleY();
                  node.scaleX((shape.width || 100) / 24);
                  node.scaleY((shape.height || 100) / 24);
                  onChange(shape.id, {
                      x: node.x(),
                      y: node.y(),
                      width: Math.max(5, 24 * scaleX),
                      height: Math.max(5, 24 * scaleY),
                      rotation: node.rotation(),
                  });
              }}
          />
      );
  } else if (shape.type === 'star') {
      return (
          <Star
              {...commonProps}
              numPoints={5}
              innerRadius={(shape.width || 100) / 4}
              outerRadius={(shape.width || 100) / 2}
              onTransformEnd={(e) => {
                  const node = e.target;
                  const scaleX = node.scaleX();
                  node.scaleX(1);
                  node.scaleY(1);
                  onChange(shape.id, {
                      x: node.x(),
                      y: node.y(),
                      width: Math.max(5, (node.width()) * scaleX),
                      height: Math.max(5, (node.height()) * scaleX),
                      rotation: node.rotation(),
                  });
              }}
          />
      );
  } else if (shape.type === 'text') {
      return (
          <Text
              {...commonProps}
              visible={!isEditing}
              onDblClick={() => onDblClick && onDblClick(shape.id)}
              onTransformEnd={(e) => {
                  const node = e.target;
                  const scaleX = node.scaleX();
                  
                  // Reset scale
                  node.scaleX(1);
                  node.scaleY(1);
                  
                  onChange(shape.id, {
                      x: node.x(),
                      y: node.y(),
                      fontSize: Math.max(5, (shape.fontSize || 12) * scaleX),
                      width: Math.max(5, node.width() * scaleX),
                      rotation: node.rotation(),
                  });
              }}
          />
      );
  } else if (shape.type === 'image') {
      return (
          <URLImage
              shape={shape}
              onSelect={() => onSelect(shape.id)}
              onChange={onChange}
              {...commonProps}
              onDragStart={onDragStart}
          />
      );
  }
  return null;
});
