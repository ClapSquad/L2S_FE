import type { IconProps } from "src/types/iconProps";

export function BoltIcon({ size, color }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 -960 960 960" width={size} fill={color}>
      <path d="M480-80 360-440H200l280-440 120 360h160L480-80Z" />
    </svg>
  );
}
