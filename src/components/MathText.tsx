import React, { useMemo } from 'react';
import MathRenderer from './MathRenderer';

export interface MathSegment {
  type: 'text' | 'inline-math' | 'block-math';
  content: string;
}

/**
 * Parses a text string containing inline math ($...$) and block equations ($$...$$)
 * into structured segments without breaking normal surrounding text.
 */
export function parseMathSegments(text: string): MathSegment[] {
  if (!text) return [];

  // Match $$...$$ (block math, can span lines) or $...$ (inline math)
  const regex = /(\$\$[\s\S]+?\$\$|\$[^$\n]+?\$)/g;
  const parts = text.split(regex);
  const segments: MathSegment[] = [];

  for (const part of parts) {
    if (!part) continue;

    if (part.startsWith('$$') && part.endsWith('$$') && part.length > 4) {
      segments.push({
        type: 'block-math',
        content: part.slice(2, -2).trim(),
      });
    } else if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
      segments.push({
        type: 'inline-math',
        content: part.slice(1, -1).trim(),
      });
    } else {
      segments.push({
        type: 'text',
        content: part,
      });
    }
  }

  return segments;
}

interface MathTextProps {
  text: string;
  className?: string;
}

export const MathText: React.FC<MathTextProps> = ({ text, className = '' }) => {
  const segments = useMemo(() => parseMathSegments(text), [text]);

  if (!text) return null;

  return (
    <span className={className}>
      {segments.map((seg, index) => {
        if (seg.type === 'block-math') {
          return (
            <span key={index} className="block my-2 overflow-x-auto">
              <MathRenderer math={seg.content} display={true} />
            </span>
          );
        }
        if (seg.type === 'inline-math') {
          return (
            <MathRenderer
              key={index}
              math={seg.content}
              display={false}
              className="mx-0.5"
            />
          );
        }
        return <React.Fragment key={index}>{seg.content}</React.Fragment>;
      })}
    </span>
  );
};

export default MathText;
