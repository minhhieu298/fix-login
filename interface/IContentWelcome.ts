import { ReactElement } from "react";

export interface IContentWelcome {
  title: string;
  subtitle1: string;
  subtitle2: string;
  gradientText: string;
  image: ReactElement;
  layout: "classic" | "professional" | "personal";
  iconPack: "green" | "pink" | "grey";
  step: number;
}

export type IconPosition = "left" | "center" | "right";
export type IconType = "green" | "pink" | "grey";
export type IconPositions = Record<IconType, IconPosition>;
export type LayoutType = "classic" | "professional" | "personal";

export interface IConfig {
  step: number;
  layout: "classic" | "professional" | "personal";
  layoutPositions: Record<LayoutType, IconPosition>;
  iconPack: IconType;
  iconPositions: IconPositions;
  open: boolean;
}

export interface ISettingResponse {
  Setting: string;
}
