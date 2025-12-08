import type { IconProps } from "src/types/iconProps";

export function GlobeIcon({ size, color }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 -960 960 960" width={size} fill={color}>
      <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q54 0 104-17.5t92-50.5L528-360h-48v-80h-80v-80h-80v-80h-80v-62q-69 26-110.5 86T88-480q0 137 87 238t217 114Zm214-162q37-47 55.5-103T768-480q0-63-22.5-120.5T684-706l-98 98v48h80v80h80v80h-52Zm-24-422q-32-15-66.5-23.5T534-782l112 112h48v-74Z" />
    </svg>
  );
}
