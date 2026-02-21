// SVG imports as React components (via vite-plugin-svgr or similar)
declare module '*.svg?react' {
  import { FC, SVGProps } from 'react';
  const content: FC<SVGProps<SVGSVGElement>>;
  export default content;
}

// Regular SVG imports
declare module '*.svg' {
  const content: string;
  export default content;
}

// Image imports
declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}

declare module '*.webp' {
  const content: string;
  export default content;
}
