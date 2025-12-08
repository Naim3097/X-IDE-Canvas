import React from 'react';
import { Group, Rect, Text, Line } from 'react-konva';

interface SafeZoneOverlayProps {
  width: number;
  height: number;
  safeZones?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
  visible: boolean;
}

export const SafeZoneOverlay: React.FC<SafeZoneOverlayProps> = ({ width, height, safeZones, visible }) => {
  if (!visible || !safeZones) return null;

  const { top = 0, bottom = 0, left = 0, right = 0 } = safeZones;
  const color = 'rgba(255, 0, 0, 0.15)';
  const strokeColor = 'rgba(255, 0, 0, 0.5)';

  return (
    <Group listening={false}>
      {/* Top Unsafe Area */}
      {top > 0 && (
        <Group>
            <Rect x={0} y={0} width={width} height={top} fill={color} />
            <Line points={[0, top, width, top]} stroke={strokeColor} strokeWidth={1} dash={[5, 5]} />
            <Text x={10} y={top - 20} text="Header / Profile Area" fontSize={12} fill="red" opacity={0.7} />
        </Group>
      )}

      {/* Bottom Unsafe Area */}
      {bottom > 0 && (
        <Group>
            <Rect x={0} y={height - bottom} width={width} height={bottom} fill={color} />
            <Line points={[0, height - bottom, width, height - bottom]} stroke={strokeColor} strokeWidth={1} dash={[5, 5]} />
            <Text x={10} y={height - bottom + 10} text="Footer / Caption Area" fontSize={12} fill="red" opacity={0.7} />
        </Group>
      )}

      {/* Left Unsafe Area */}
      {left > 0 && (
        <Group>
            <Rect x={0} y={0} width={left} height={height} fill={color} />
            <Line points={[left, 0, left, height]} stroke={strokeColor} strokeWidth={1} dash={[5, 5]} />
        </Group>
      )}

      {/* Right Unsafe Area */}
      {right > 0 && (
        <Group>
            <Rect x={width - right} y={0} width={right} height={height} fill={color} />
            <Line points={[width - right, 0, width - right, height]} stroke={strokeColor} strokeWidth={1} dash={[5, 5]} />
            <Text x={width - right + 10} y={height / 2} text="Actions" fontSize={12} fill="red" opacity={0.7} rotation={90} />
        </Group>
      )}
    </Group>
  );
};
