// components/DynamicDashboard/DragPreview.tsx
import { Box, Typography } from "@mui/material";
import React from "react";

import { useCustomLanguage } from "@/hooks/useCustomLanguage";
import { useCustomTheme } from "@/hooks/useCustomTheme";
import styles from "@/styles/components/dragPreview.module.css";
interface DragPreviewProps {
  component: string;
  style?: React.CSSProperties;
}

const DragPreview: React.FC<DragPreviewProps> = ({ component, style }) => {
  const { muiTheme, mode } = useCustomTheme();
  const { t } = useCustomLanguage();
  return (
    <Box className={styles.dragPreview} style={style}>
      <Box className={styles.previewCard}>
        <Box
          className={styles.componentInfo}
          style={{
            background:
              mode === "dark"
                ? muiTheme.palette?.customBase?.base60
                : muiTheme.palette?.customBase?.base20,
          }}
        >
          <Typography
            component="span"
            variant="sub12-M18"
            sx={(theme) => ({
              color: muiTheme.palette?.customBase?.base80,
              ...theme.applyStyles("dark", {
                color: theme.palette.customBase?.base20,
              }),
            })}
          >
            {t(component)}
          </Typography>
        </Box>
        <Box
          className={styles.tooltip}
          style={{
            background:
              mode === "dark"
                ? muiTheme.palette?.customBase?.base50
                : muiTheme.palette?.customBase?.base40,
          }}
        >
          <Typography
            component="span"
            variant="sub12-S18"
            sx={(theme) => ({
              color: theme.palette.customBase?.base20,
              ...theme.applyStyles("dark", {
                color: theme.palette.customBase?.base30,
              }),
            })}
          >
            {t("text_tooltip_drag_preview")}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(DragPreview);
