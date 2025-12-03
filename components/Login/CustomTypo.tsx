import {
  Box,
  Grow,
  IconButton,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { memo } from "react";

import { CustomToolTipProps, ProgressBarProps } from "./types";

const CustomBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));

export const CustomToolTip: React.FC<CustomToolTipProps> = (props) => {
  const { open, title, children, color } = props;
  return (
    <Tooltip
      title={title}
      disableFocusListener
      disableHoverListener
      disableTouchListener
      open={open}
      arrow
      slots={{
        transition: Grow,
      }}
      slotProps={{
        tooltip: {
          sx: () => ({
            p: 1.5,
            borderRadius: 3,
            background: color,
            "&.MuiTooltip-tooltipPlacementBottom": {
              mt: "7px !important",
            },

            ".MuiTooltip-arrow": {
              color: color,
              ":before": {
                borderTopLeftRadius: "3px",
              },
            },
          }),
        },
        transition: { timeout: 0 },
      }}
    >
      {children}
    </Tooltip>
  );
};

export const ProgressBar: React.FC<ProgressBarProps> = memo(({ count }) => {
  const getColor = (count: number) => {
    switch (count) {
      case 1:
        return "#F34859"; // Màu đỏ (nấc 1)
      case 2:
        return "#FF9F41"; // Màu vàng (nấc 2)
      case 3:
        return "#3FC2EB"; // Màu xanh da trời (nấc 3)
      case 4:
        return "#1AAF74"; // Màu xanh lá cây (nấc 4)
      default:
        return "";
    }
  };

  const getTooltipTitle = (count: number) => {
    switch (count) {
      case 1:
        return "Yếu";
      case 2:
        return "Trung bình";
      case 3:
        return "Mạnh";
      case 4:
        return "Rất mạnh";
      default:
        return "";
    }
  };

  // Lấy màu dựa trên count
  const currentColor = getColor(count);
  const tooltipTitle = getTooltipTitle(count);

  return (
    <Box
      sx={{
        display: "flex",
        gap: 0.25, // Khoảng cách 5px giữa các đoạn
        width: "100%",
        height: "10px",
      }}
    >
      {/* Đoạn 1: Tô màu nếu count >= 1 */}
      <CustomToolTip
        color={currentColor}
        title={
          <CustomBox>
            <IconButton>
              <Image src="/assets/icon/icon-mark_weak.svg" alt="" fill />
            </IconButton>
            <Typography
              variant="sub12-S18"
              sx={(theme) => ({
                color: theme.palette.customBase?.baseWhite,
              })}
            >
              {tooltipTitle}
            </Typography>
          </CustomBox>
        }
        open={count === 1}
      >
        {/* Đoạn 1: Tô màu nếu count >= 1 */}
        <Box
          sx={(theme) => ({
            flex: 1,
            height: "100%",
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
            ...theme.applyStyles("light", {
              background:
                count >= 1 ? currentColor : theme.palette.customBase?.base20,
            }),
            ...theme.applyStyles("dark", {
              background:
                count >= 1 ? currentColor : theme.palette.customBase?.base55,
            }),
          })}
        />
      </CustomToolTip>
      {/* Đoạn 2: Tô màu nếu count >= 2 */}
      <CustomToolTip
        color={currentColor}
        title={
          <CustomBox>
            <IconButton>
              <Image src="/assets/icon/icon-mark-medium.svg" alt="" fill />
            </IconButton>
            <Typography
              variant="sub12-S18"
              sx={(theme) => ({
                color: theme.palette.customBase?.baseWhite,
              })}
            >
              {tooltipTitle}
            </Typography>
          </CustomBox>
        }
        open={count === 2}
      >
        <Box
          sx={(theme) => ({
            flex: 1,
            height: "100%",
            ...theme.applyStyles("light", {
              background:
                count >= 2 ? currentColor : theme.palette.customBase?.base20,
            }),
            ...theme.applyStyles("dark", {
              background:
                count >= 2 ? currentColor : theme.palette.customBase?.base55,
            }),
          })}
        />
      </CustomToolTip>
      {/* Đoạn 3: Tô màu nếu count >= 3 */}
      <CustomToolTip
        color={currentColor}
        title={
          <CustomBox>
            <IconButton>
              <Image src="/assets/icon/icon-mark-strong.svg" alt="" fill />
            </IconButton>
            <Typography
              variant="sub12-S18"
              sx={(theme) => ({
                color: theme.palette.customBase?.baseWhite,
              })}
            >
              {tooltipTitle}
            </Typography>
          </CustomBox>
        }
        open={count === 3}
      >
        <Box
          sx={(theme) => ({
            flex: 1,
            height: "100%",
            ...theme.applyStyles("light", {
              background:
                count >= 3 ? currentColor : theme.palette.customBase?.base20,
            }),
            ...theme.applyStyles("dark", {
              background:
                count >= 3 ? currentColor : theme.palette.customBase?.base55,
            }),
          })}
        />
      </CustomToolTip>
      {/* Đoạn 4: Tô màu nếu count >= 4 */}
      <CustomToolTip
        color={currentColor}
        title={
          <CustomBox>
            <IconButton>
              <Image src="/assets/icon/icon-mark-verystrong.svg" alt="" fill />
            </IconButton>
            <Typography
              variant="sub12-S18"
              sx={(theme) => ({
                color: theme.palette.customBase?.baseWhite,
              })}
            >
              {tooltipTitle}
            </Typography>
          </CustomBox>
        }
        open={count === 4}
      >
        <Box
          sx={(theme) => ({
            flex: 1,
            height: "100%",
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
            ...theme.applyStyles("light", {
              background:
                count >= 4 ? currentColor : theme.palette.customBase?.base20,
            }),
            ...theme.applyStyles("dark", {
              background:
                count >= 4 ? currentColor : theme.palette.customBase?.base55,
            }),
          })}
        />
      </CustomToolTip>
    </Box>
  );
});
