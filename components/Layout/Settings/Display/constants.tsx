import { Box } from "@mui/material";
import Image from "next/image";

import { ISettingMode } from "../interface";

//setting theme mode
export const layoutTheme: Array<ISettingMode & { value: string }> = [
  {
    label: "text_mode_dark",
    image: null,
    value: "dark",
  },
  {
    label: "text_mode_light",
    image: null,
    value: "light",
  },
];

//setting language
export const configlanguage: Array<ISettingMode & { value: string }> = [
  {
    label: "English",
    image: (
      <Image
        style={{
          objectFit: "cover",
        }}
        src="/assets/image/icon_EN.svg"
        alt="language"
        fill
      />
    ),
    value: "en",
  },
  {
    label: "Tiếng Việt",
    image: (
      <Image
        style={{
          objectFit: "cover",
        }}
        src="/assets/image/icon_VN.svg"
        alt="language"
        fill
      />
    ),
    value: "vi",
  },
];

const layout = (
  position: "Top" | "Bottom" | "Left" | "Right",
  isChecked: boolean = false
) => {
  return (
    <Box
      sx={(theme) => ({
        width: "165px",
        height: "102px",
        backgroundColor: theme.palette.customBase?.base10,
        border: `1px solid ${isChecked ? theme.palette.customPrimary?.primary50 : theme.palette.customAdditional?.base4003}`,
        borderRadius: "7px",
        padding: "7px",
        display: "flex",
        gap: "3px",
        flexDirection:
          position === "Top"
            ? "column"
            : position === "Bottom"
              ? "column-reverse"
              : position === "Left"
                ? "row"
                : "row-reverse",
        justifyContent: "center",
        alignItems: "center",
        ...theme.applyStyles("dark", {
          backgroundColor: theme.palette.customBase?.base70,
        }),
      })}
    >
      <Box
        sx={(theme) => ({
          width: ["Top", "Bottom"].includes(position) ? "100%" : "6px",
          height: ["Top", "Bottom"].includes(position) ? "6px" : "100%",
          borderRadius: "3.7px",
          border: `0.92px solid ${isChecked ? theme.palette.customPrimary?.primary50 : theme.palette.customAdditional?.base4003}`,
          boxShadow: "0px 0px 9.22px rgba(0, 0, 0, 0.05)",
        })}
      />
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "2.76px",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "2.76px" }}>
          <Box
            sx={(theme) => ({
              backgroundColor: theme.palette.customBase?.baseWhite,
              borderRadius: "3.69px",
              height: "30.25px",
              ...theme.applyStyles("dark", {
                backgroundColor: theme.palette.customBase?.base80,
              }),
            })}
          />
          <Box
            sx={(theme) => ({
              backgroundColor: theme.palette.customBase?.baseWhite,
              borderRadius: "3.69px",
              flex: 1,
              ...theme.applyStyles("dark", {
                backgroundColor: theme.palette.customBase?.base80,
              }),
            })}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "2.76px" }}>
          <Box
            sx={(theme) => ({
              backgroundColor: theme.palette.customBase?.baseWhite,
              borderRadius: "3.69px",
              height: "54.24px",
              ...theme.applyStyles("dark", {
                backgroundColor: theme.palette.customBase?.base80,
              }),
            })}
          />
          <Box
            sx={(theme) => ({
              backgroundColor: theme.palette.customBase?.baseWhite,
              borderRadius: "3.69px",
              flex: 1,
              ...theme.applyStyles("dark", {
                backgroundColor: theme.palette.customBase?.base80,
              }),
            })}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "2.76px" }}>
          <Box
            sx={(theme) => ({
              backgroundColor: theme.palette.customBase?.baseWhite,
              borderRadius: "3.69px",
              height: "20.12px",
              ...theme.applyStyles("dark", {
                backgroundColor: theme.palette.customBase?.base80,
              }),
            })}
          />
          <Box
            sx={(theme) => ({
              backgroundColor: theme.palette.customBase?.baseWhite,
              borderRadius: "3.69px",
              flex: 1,
              ...theme.applyStyles("dark", {
                backgroundColor: theme.palette.customBase?.base80,
              }),
            })}
          />
        </Box>
      </Box>
    </Box>
  );
};

//setting position menu bar
export const menuPosition = (
  selectedPosition?: string
): Array<ISettingMode & { value: string }> => [
  {
    label: "text_Top",
    image: layout("Top", selectedPosition === "Top"),
    value: "Top",
  },
  {
    label: "text_Bottom",
    image: layout("Bottom", selectedPosition === "Bottom"),
    value: "Bottom",
  },
  {
    label: "text_Left",
    image: layout("Left", selectedPosition === "Left"),
    value: "Left",
  },
  {
    label: "text_Right",
    image: layout("Right", selectedPosition === "Right"),
    value: "Right",
  },
];
