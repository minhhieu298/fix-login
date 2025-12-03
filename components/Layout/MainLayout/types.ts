import { SxProps, Theme } from "@mui/material";
import { HTMLAttributes, ReactNode } from "react";

import { IResponseLogin } from "@/interface/interface";

import { IMenuBarIcon } from "../Settings/EditMenuIcons/interface";

export interface ITopAppBarLayout {
  children: ReactNode;

  settingInfo: any;
  mode: "light" | "dark";
  t: (_key: string) => string;
  showIcon: IMenuBarIcon[];
  scrollRef: React.RefObject<HTMLDivElement>;
  handleThemeMode: (_event: React.MouseEvent<HTMLImageElement>) => void;
  anchorElTheme: HTMLElement | null;
  setAnchorElTheme: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  handleSelectTheme: (_value: "light" | "dark") => void;
  handleSettingAccount: () => void;
  userInfo2FA: IResponseLogin;
  avatarInfo: string | undefined;
  renderBtnLogin: (_options: { isSideBar?: boolean }) => ReactNode;
  openWidgetPopper: () => void;
}

export type IComponentProps<E = HTMLElement> = HTMLAttributes<E> & {
  width?: number;
  height?: number;
  color?: string;
  viewBox?: string;
  sx?: SxProps<Theme>;
};
