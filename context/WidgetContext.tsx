import { createContext, useContext } from "react";

interface WidgetContextType {
  setAnchorEl: (_el: HTMLElement | null) => void;
  anchorEl: HTMLElement | null;
  setOpen: (_open: boolean) => void;
  open: boolean;
}

export const WidgetContext = createContext<WidgetContextType>({
  setAnchorEl: () => {},
  anchorEl: null,
  open: false,
  setOpen: () => {},
});

export const useWidgetContext = () => useContext(WidgetContext);
