import { TabNode } from "flexlayout-react";

import { UpdateWorkspacePayload } from "@/interface/MyHub/interface";
export interface IMenuSection {
  title: string;
  icon: string;
  items: IMenuItem[];
}

export interface IMenuItem {
  text: string;
  component: string;
  maxCount: number;
  currentCount: number;
}

export type StockInfo = [string, string | number];

export interface Stock {
  Info: StockInfo[];
  RowID: string;
}

export interface IDataResponseFTS {
  data: Stock[];
}

export interface ISeries {
  Symbol: "string";
  c: number[];
  h: number[];
  l: number[];
  o: number[];
  t: number[];
  v: number[];
}

export interface DynamicObject {
  [key: string]: string;
}

export interface TemplatesLayout {
  [key: string]: any;
}

export interface ITabJson {
  type: string;
  component: string;
  name: string;
  enableRename: boolean;
  className: string;
  icon: string;
}

export interface TemplateSelectorProps {
  templatesImg: Array<{
    id?: string;
    image?: string;
    icon?: React.ReactNode;
    label: string;
  }>;
  handleAddTab: (_templateId: string) => void;
}

export interface WidgetPopperProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  handleClose: () => void;
  menuSectionsState: IMenuSection[];
  handleDragStart: (
    _component: string,
    _event: React.MouseEvent<HTMLDivElement>
  ) => void;
  handleClickItem: (
    _component: string,
    _event: React.MouseEvent<HTMLDivElement>
  ) => void;
  dragStartedRef: React.MutableRefObject<boolean>;
}

export interface TabsContainerProps {
  tabsContainerRef?: React.RefObject<HTMLDivElement>;
}

export interface ILinkPopper {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  onSelectIcon?: (_iconPath: string, _node: TabNode) => void;
  currentNode?: TabNode | null;
}

export interface IFactory {
  node: TabNode;
  detailWorkspace?: UpdateWorkspacePayload;
}
