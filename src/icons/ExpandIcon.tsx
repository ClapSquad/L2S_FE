import type { IconProps } from "src/types/iconProps";

export function ExpandIcon({ size, color }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 -960 960 960" width={size} fill={color}>
      <path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z" />
    </svg>
  );
}
