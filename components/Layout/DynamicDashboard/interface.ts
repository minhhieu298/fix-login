import { ITabRenderValues, Layout, TabNode } from "flexlayout-react";

import { IMenuSection } from "@/interface/ui/DynamicDashboard/interface";

export interface IDynamicDashboard {
  dragStartedRef: React.MutableRefObject<boolean>;
  layoutRef: React.RefObject<Layout>;
  setMenuSectionsState: (
    _updater: (_prevState: IMenuSection[]) => IMenuSection[]
  ) => void;
  isDragging: boolean;
  dragPosition: { x: number; y: number };
  dragComponent: string;
  setIsDragging: (_isDragging: boolean) => void;
  setDragPosition: (_dragPosition: { x: number; y: number }) => void;
}

export interface IRenderNameTab {
  node: TabNode;
  renderValues: ITabRenderValues;
}
