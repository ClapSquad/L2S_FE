import type { IconProps } from "src/types/iconProps";

export function SparkleIcon({ size, color }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      fill={color}
    >
      <path d="M12 2l1.09 3.26L16.5 6.35l-3.41 1.09L12 10.7l-1.09-3.26L7.5 6.35l3.41-1.09L12 2zm0 11.3l-1.09 3.26L7.5 17.65l3.41 1.09L12 22l1.09-3.26 3.41-1.09-3.41-1.09L12 13.3z"/>
    </svg>
  );
}
