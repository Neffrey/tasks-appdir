// LIBRARIES
import React from "react";

// Props
interface LogoProps {
  className?: string;
}

// COMPONENT
const NeffreyLogo = ({ className = "" }: LogoProps) => {
  return (
    <svg viewBox="0 0 300 300" className={className}>
      <path d="M263.63 53.92c46.89 55.33 46.89 136.84 0 192.16-.72.85-2.12.33-2.12-.79V54.71c0-1.12 1.41-1.64 2.13-.79ZM53.92 36.38c55.33-46.9 136.84-46.9 192.17 0 .85.72.33 2.12-.79 2.12H54.71c-1.12 0-1.64-1.4-.79-2.12Z" />
      <path d="M36.38 246.08c-46.89-55.33-46.9-136.83 0-192.16.72-.85 2.12-.33 2.12.79v190.58c0 1.12-1.39 1.64-2.12.79ZM246.09 263.62c-55.33 46.9-136.84 46.9-192.17 0-.85-.72-.33-2.12.79-2.12H245.3c1.12 0 1.64 1.4.79 2.12ZM151.01 167.82l67.89 67.89c.76.76.22 2.06-.85 2.06H82.26c-1.07 0-1.61-1.3-.85-2.06l67.89-67.89c.47-.47 1.23-.47 1.71 0ZM119.65 163.92l-55.37 55.37c-.76.76-2.06.22-2.06-.85v-55.37c0-.67.54-1.21 1.21-1.21h55.37c1.07 0 1.61 1.3.85 2.06Z" />
      <path d="M237.78 82.26v135.87c0 1.07-1.3 1.61-2.06.85l-67.94-67.94c-.47-.47-.47-1.23 0-1.71l67.94-67.94c.76-.76 2.06-.22 2.06.85Z" />
      <path d="m64.28 81.1 54.98 54.98c.76.76.22 2.06-.85 2.06H63.43c-.67 0-1.21-.54-1.21-1.21V81.95c0-1.07 1.3-1.61 2.06-.85Z" />
      <path d="M146.29 62.22c.3 0 .59.11.82.31 3.79 3.53 9.96 11.66 12.35 23.48 2.88 14.17-.54 29.42-9.91 44.69-.41.66-1.34.77-1.89.22L81.01 64.28c-.76-.76-.22-2.06.85-2.06h64.42ZM219.29 64.28l-33.06 33.06c-.76.76-2.06.21-2.05-.86.03-5.64-.56-10.73-1.47-15.19a73.097 73.097 0 0 0-5.84-17.33c-.39-.81.18-1.74 1.08-1.74h40.49c1.07 0 1.61 1.3.85 2.06Z" />
    </svg>
  );
};

export default NeffreyLogo;
