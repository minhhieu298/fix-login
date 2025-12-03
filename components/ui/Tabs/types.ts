import { SxProps, TabsProps, Theme } from "@mui/material";

export interface CustomTabsProps extends Omit<TabsProps, "variant"> {
  tabs: { label: string }[];
  variant?: "standard" | "scrollable" | "fullWidth";
  orientation?: "horizontal" | "vertical";
  defaultTab?: number;
  onTabChange?: (_: React.SyntheticEvent, _newValue: number) => void;
  option: string;
}

export interface ISegementTab {
  value: number;
  onChange: (_: number) => void;
  size: "large" | "small";
  listTabs: SegementTab[];
  sx?: SxProps<Theme>;
}

export interface SegementTab {
  label: string;
  isTooltip?: boolean;
  tooltip?: string;
}

export interface SegementTab {
  label: string;
  isTooltip?: boolean;
  tooltip?: string;
}
