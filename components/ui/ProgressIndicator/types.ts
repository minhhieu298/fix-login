import { CircularProgressProps, LinearProgressProps } from "@mui/material";

interface BaseProgressIndicatorProps {
  isLoading: boolean;
  children?: React.ReactNode;
  type?: "circular" | "linear";
}

export interface ProgressIndicatorProps extends BaseProgressIndicatorProps {
  // Props chung
  color?: CircularProgressProps["color"] | LinearProgressProps["color"];
  type: "circular" | "linear";

  // Props cho Circular
  size?: number;
  thickness?: number;

  // Props cho Linear
  variant?: LinearProgressProps["variant"];
  value?: number; // Dùng cho determinate linear progress
}
