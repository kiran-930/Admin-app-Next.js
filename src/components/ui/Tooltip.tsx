'use client';

import React, { useState } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export function Tooltip({ content, children, maxWidth = 'max-w-sm' }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="cursor-default"
      >
        {children}
      </div>

      {isVisible && (
        <div className={`absolute z-50 px-3 py-2 text-sm text-white bg-gray-800 rounded shadow-lg ${maxWidth} bottom-full left-1/2 transform -translate-x-1/2 mb-2`}>
          <div className="whitespace-nowrap">
            {content}
          </div>
          {/* Arrow pointing down to the element */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2">
            <div className="border-4 border-transparent border-t-gray-800"></div>
          </div>
        </div>
      )}
    </div>
  );
}
