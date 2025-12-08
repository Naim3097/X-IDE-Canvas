export interface Shape {
  id: string;
  type: 'rect' | 'text' | 'circle' | 'star' | 'image' | 'triangle' | 'heart';
  x: number;
  y: number;
  width?: number;
  height?: number;
  rotation?: number;
  opacity?: number;
  
  // Fill (Solid or Gradient)
  fillType: 'solid' | 'gradient';
  fill: string; // Solid color
  gradientStart: string;
  gradientEnd: string;
  gradientAngle: 'horizontal' | 'vertical' | 'diagonal' | 'radial';

  // Stroke & Shadow
  stroke?: string;
  strokeWidth?: number;
  shadowColor?: string;
  shadowBlur?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  shadowOpacity?: number;
  cornerRadius?: number;

  // Typography
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  fontStyle?: string;
  textDecoration?: string;
  align?: string;
  letterSpacing?: number;
  lineHeight?: number;

  // Image
  imageUrl?: string;
}
