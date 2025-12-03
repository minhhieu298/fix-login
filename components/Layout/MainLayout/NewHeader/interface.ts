import { IMenuBarIcon } from "../../Settings/EditMenuIcons/interface";

export interface ISectionItem {
  title: string;
  items: IMenuBarIcon[];
  setAncholElMega: (_el: HTMLElement | null) => void;
}
