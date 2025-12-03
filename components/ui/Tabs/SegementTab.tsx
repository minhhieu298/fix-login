import { styled, Tab, Tabs, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

import BaseTooltip from "../BaseTooltip";
import { ISegementTab } from "./types";

const SwitchTabs = styled(Tabs, {
  shouldForwardProp: (props) => props !== "size",
})<{ size: "small" | "large" }>(({ theme, size }) => ({
  color: theme.palette.customBase?.base80,
  minHeight: "auto",
  width: "100%",
  padding: 4,
  borderRadius: 100,
  background: theme.palette.customBase?.base10,
  ...theme.applyStyles("dark", {
    color: theme.palette.customBase?.base10,
    background: theme.palette.customBase?.base70,
  }),
  ...(size === "small" && {
    ".MuiButtonBase-root": {
      padding: "2px 12px",
      minHeight: "auto",
      width: "100%",
      gap: 2,
      flexDirection: "row",
      flex: 1,
      maxWidth: "unset",
      minWidth: "auto",
      textTransform: "unset",
      whiteSpace: "nowrap",
      "&.Mui-selected": {
        color: theme.palette.customPrimary?.primary50,
        background: theme.palette.customBase?.base20,
        borderRadius: 26,
        ...theme.applyStyles("dark", {
          background: theme.palette.customBase?.base60,
        }),
      },
    },
  }),
  ...(size === "large" && {
    ".MuiButtonBase-root": {
      paddingTop: 2,
      paddingBottom: 2,
      gap: 2,
      minHeight: "auto",
      flexDirection: "row",
      flex: 1,
      maxWidth: "unset",
      minWidth: "auto",
      textTransform: "unset",
      "&.Mui-selected": {
        color: theme.palette.customPrimary?.primary50,
        background: theme.palette.customBase?.base20,
        borderRadius: 26,
        ...theme.applyStyles("dark", {
          background: theme.palette.customBase?.base60,
        }),
      },
    },
  }),
}));

const SegementTab = ({
  value,
  onChange,
  size = "small",
  listTabs,
  ...rest
}: ISegementTab) => {
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    onChange(newValue);
  };
  return (
    <SwitchTabs
      size={size}
      slotProps={{
        indicator: {
          sx: {
            display: "none",
          },
        },
      }}
      {...rest}
      value={value}
      onChange={handleChange}
    >
      {listTabs.map((item, ind) => (
        <Tab
          key={ind}
          value={ind}
          disableTouchRipple
          disableFocusRipple
          disableRipple
          onClick={() => ind === value && onChange(ind)}
          label={
            <>
              <Typography
                variant={size === "large" ? "body14-B21" : "sub12-M18"}
              >
                {item.label}
              </Typography>
              {item?.isTooltip && (
                <BaseTooltip title={item?.tooltip}>
                  <Image
                    width={12}
                    height={12}
                    src="/assets/icon/icon_tooltip.svg"
                    alt=""
                  />
                </BaseTooltip>
              )}
            </>
          }
        />
      ))}
    </SwitchTabs>
  );
};

export default SegementTab;
