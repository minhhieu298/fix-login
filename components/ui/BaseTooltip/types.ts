import { TooltipProps } from "@mui/material";
import { CSSProperties, ReactElement } from "react";

export interface IBaseTooltip extends Omit<TooltipProps, "title"> {
  title?: ReactElement | string;
  children: ReactElement;
  arrow?: boolean;
  styleTooltip?: CSSProperties;
  placement?:
    | "bottom-end"
    | "bottom-start"
    | "bottom"
    | "left-end"
    | "left-start"
    | "left"
    | "right-end"
    | "right-start"
    | "right"
    | "top-end"
    | "top-start"
    | "top";
}
