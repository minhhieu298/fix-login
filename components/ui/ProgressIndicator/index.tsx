import {
  Box,
  CircularProgress,
  CircularProgressProps,
  LinearProgress,
  LinearProgressProps,
} from "@mui/material";

import { ProgressIndicatorProps } from "./types";

export const CustomProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  isLoading,
  children,
  size = 48,
  thickness = 4,
  type = "circular",
  variant = "indeterminate", // Default cho linear
  value, // Chỉ dùng khi variant='determinate' cho linear
  color = "primary",
  ...restProps
}) => {
  if (!isLoading) {
    return children ? <>{children}</> : null;
  }

  // Component Progress dựa trên type
  const progressComponent =
    type === "circular" ? (
      <CircularProgress
        size={size}
        thickness={thickness}
        color={color as CircularProgressProps["color"]}
        {...restProps}
      />
    ) : (
      <LinearProgress
        variant={variant}
        value={value}
        color={color as LinearProgressProps["color"]}
        sx={{ width: "100%" }}
        {...restProps}
      />
    );

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        ...(type === "circular" && { minHeight: size }),
      }}
    >
      {progressComponent}
    </Box>
  );
};
