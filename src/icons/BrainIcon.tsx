import type { IconProps } from "src/types/iconProps";

export function BrainIcon({ size, color }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 0 24 24" width={size} fill={color}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-1.12.24-2.18.66-3.14l1.37 1.37 1.45-1.45L6.1 7.39C7.45 5.28 9.57 4 12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8zm-2-9h4v2h-4v-2z"/>
    </svg>
  );
}
