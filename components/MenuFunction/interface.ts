import { PopperPlacementType } from "@mui/material";

export interface IMenuFunction {
  icon: string;
  label: string;
  url?: string;
  children?: IMenuFunction[];
}

export interface IRecursiveMenu {
  items: IMenuFunction[];
  depth?: number;
  setMenuOpen?: (_value: boolean) => void;
  parentRef?: React.RefObject<HTMLDivElement>;
  setHasSubmenuOpen?: (_value: boolean) => void;
}

export interface MenuFunctionProps {
  placement: PopperPlacementType;
  typePlacementTooltip:
    | "bottom-end"
    | "bottom-start"
    | "bottom"
    | "left-end"
    | "left-start"
    | "left"
    | "right-end"
    | "right-start"
    | "right"
    | "top-end"
    | "top-start"
    | "top";
}
