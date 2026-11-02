import React, { useMemo } from 'react';
import katex from 'katex';

interface MathViewProps {
  math: string;
  displayMode?: boolean;
  className?: string;
}

export const MathView: React.FC<MathViewProps> = ({
  math,
  displayMode = false,
  className = '',
}) => {
  const renderedHtml = useMemo(() => {
    if (!math) return '';
    try {
      return katex.renderToString(math, {
        displayMode,
        throwOnError: false,
        output: 'htmlAndMathml',
      });
    } catch (err) {
      console.warn('KaTeX render error:', err);
      return null;
    }
  }, [math, displayMode]);

  if (!renderedHtml) {
    // Elegant fallback formatting if KaTeX fails
    return (
      <span
        className={`font-mono text-rose-900 bg-rose-50/80 px-2 py-0.5 rounded border border-rose-200 text-sm tracking-wide inline-block ${className}`}
      >
        {math}
      </span>
    );
  }

  return (
    <span
      className={`inline-math ${displayMode ? 'block my-2 overflow-x-auto text-center' : 'inline'} ${className}`}
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
};
