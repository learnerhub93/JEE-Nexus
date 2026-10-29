import React, { useMemo } from 'react';
import katex from 'katex';

interface MathRendererProps {
  math: string;
  display?: boolean;
  className?: string;
}

export const MathRenderer: React.FC<MathRendererProps> = ({ math, display = false, className = '' }) => {
  const renderedHtml = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: display,
        throwOnError: false,
        output: 'html',
      });
    } catch (e) {
      console.error('KaTeX render error:', e);
      return `<span class="formula-font font-mono text-blue-600 dark:text-blue-400">${math}</span>`;
    }
  }, [math, display]);

  return (
    <span
      className={`inline-block align-middle ${display ? 'my-2 w-full text-center overflow-x-auto py-1' : ''} ${className}`}
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
};

export default MathRenderer;
