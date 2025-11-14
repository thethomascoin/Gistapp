
import React from 'react';

const SparklesIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    <path d="M18 10h.01" />
    <path d="M12 2a4 4 0 0 0 8 8 8 8 0 1 1-8-8Z" />
  </svg>
);

export default SparklesIcon;
