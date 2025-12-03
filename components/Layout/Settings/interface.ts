import { Theme } from "@emotion/react";
import { BoxProps, SxProps } from "@mui/material";
import { ReactNode } from "react";

export interface ISetting {
  label: string;
  path: string;
  iconSrc: string;
  isShowLeftContent: boolean;
  iconActive: string;
  children?: Array<{
    label: string;
    path: string;
    icon?: string;
  }>;
}

export interface ISettingMode {
  label: string;
  image: ReactNode;
}

export interface ICustomFormCheck {
  item: ISettingMode;
  handleCheckboxChange: (_label: string) => void;
  selectedLabel: string;
  isShowImage?: boolean;
  isRow?: boolean;
}

export interface ICustomImage {
  url: string;
  alt?: string;
}

export interface ICustomLabel extends BoxProps {
  label: string;
  sx?: SxProps<Theme>;
  children?: ReactNode;
}

export interface CustomCircularCheckboxProps {
  checked: boolean;
  onChange: (_: React.ChangeEvent<HTMLInputElement>) => void;
  mode?: "light" | "dark";
}

export interface ICustomFormCheckProps extends CustomCircularCheckboxProps {
  item: ISettingMode;
}
export interface IModal {
  open: boolean;
  setOpen: (_: boolean) => void;
  setAnchor?: (_: string) => void;
}

export type IconItem = { src: string; title: string; key?: string };

export type IArraySelectedIcon = {
  cashTransaction: IconItem[];
  investmentAdvisor: IconItem[];
};

export interface ISettingResponse {
  Setting: string;
}

export interface IFormSetting {
  setting: {
    arraySelectedIcon: IconItem[];
    arraySettingIcon: IArraySelectedIcon;
    result: IconItem[];
    selectedValue: number;
  };
}

export interface ISecurities {
  setting: string;
  mainSetting?: string;
  subQueryRoute?: string[];
  handleSubSetting: (_v: string) => void;
  setAnchor?: (_: string) => void;
  matchedSubSettings: {
    label: string;
    path: string;
  }[];
}
