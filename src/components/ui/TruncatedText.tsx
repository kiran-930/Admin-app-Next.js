'use client';

import React from 'react';
import { Tooltip } from './Tooltip';

interface TruncatedTextProps {
  text: string;
  maxLength?: number;
  className?: string;
  showTooltipAlways?: boolean;
}

export function TruncatedText({
  text,
  maxLength = 20,
  className = '',
  showTooltipAlways = true
}: TruncatedTextProps) {
  const shouldTruncate = text.length > maxLength;
  const truncatedText = shouldTruncate ? text.slice(0, maxLength) + '...' : text;

  // Always show tooltip if showTooltipAlways is true, or if text is truncated
  if (showTooltipAlways || shouldTruncate) {
    return (
      <Tooltip content={text}>
        <span className={`${className}`}>
          {truncatedText}
        </span>
      </Tooltip>
    );
  }

  return <span className={className}>{text}</span>;
}
