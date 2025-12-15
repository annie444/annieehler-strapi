import type { HTMLAttributes } from "astro/types";

export interface InternalSvgProps extends Omit<
  HTMLAttributes<"svg">,
  "viewBox" | "width" | "height"
> {
  size?: number | string;
  width?: number | string;
  height?: number | string;
  viewBox: { x: number; y: number; width: number; height: number };
}

export type SvgProps = Omit<InternalSvgProps, "viewBox">;

export interface SizeAttributes {
  width: string;
  height: string;
}

export interface SizeProps {
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export function getSizes({ size, width, height }: SizeProps): SizeAttributes {
  let w = "24px";
  let h = "24px";

  if (size && !width) {
    w = typeof size === "number" ? `${size}px` : size;
  } else if (width) {
    w = typeof width === "number" ? `${width}px` : width;
  }
  if (size && !height) {
    h = typeof size === "number" ? `${size}px` : size;
  } else if (height) {
    h = typeof height === "number" ? `${height}px` : height;
  }
  return { width: w, height: h };
}
