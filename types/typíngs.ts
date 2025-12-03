import { SxProps, Theme } from "@mui/material";
import { HTMLAttributes } from "react";

export type IComponentProps<E = HTMLElement> = HTMLAttributes<E> & {
  width?: number;
  height?: number;
  color?: string;
  viewBox?: string;
  sx?: SxProps<Theme>;
};
