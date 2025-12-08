import type { IconProps } from "src/types/iconProps";

export function BoltIcon({ size, color }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      fill={color}
    >
      <path d="M7 2v11h3v9l7-12h-4l4-8z"/>
    </svg>
  );
}
