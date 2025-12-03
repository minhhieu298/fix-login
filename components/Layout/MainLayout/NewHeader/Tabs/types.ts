import { SxProps, Theme } from "@mui/material";

import { IMenuBarIcon } from "@/components/Layout/Settings/EditMenuIcons/interface";

export interface ISegementTab {
  size: "large" | "small";
  listTabs: IMenuBarIcon[];
  sx?: SxProps<Theme>;
}

export interface SegementTab {
  label: string;
  isTooltip?: boolean;
  tooltip?: React.ReactNode | string;
}
