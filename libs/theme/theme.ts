import createCache from "@emotion/cache";
import { createTheme, Theme, ThemeOptions } from "@mui/material";

import { MuiBadge } from "@/components/ui/Badge/theme";
import { MuiButton, MuiIconButton } from "@/components/ui/BaseButton/theme";
import { MuiPagination } from "@/components/ui/BasePagination/theme";
import { MuiTooltip } from "@/components/ui/BaseTooltip/theme";
import { MuiCheckbox } from "@/components/ui/CheckBox/theme";
import { MuiChip } from "@/components/ui/Chip/theme";
import { MuiModal } from "@/components/ui/Modal/theme";
import { MuiRadio } from "@/components/ui/RadioButton/theme";
import { MuiSwitch } from "@/components/ui/Switch/theme";
import {
  MuiTable,
  MuiTableBody,
  MuiTableHead,
} from "@/components/ui/Table/theme";
import {
  MuiInputAdornment,
  MuiInputBase,
  MuiTextField,
} from "@/components/ui/TextField/theme";
import { MuiAlert, MuiSnackbar } from "@/components/ui/ToastMessage/theme";

import { colorThemeCustom, typographyCustom } from "./themeCustom";

export type ThemeMode = "light" | "dark";

export interface ThemeConfig {
  mode: ThemeMode;
  toggleTheme: (_mode: ThemeMode) => void;
  emotionCache: ReturnType<typeof createCache>;
  muiTheme: ThemeOptions;
}

// Tạo theme cho Material-UI
export const createCustomTheme = (mode: ThemeMode): Theme => {
  const theme = createTheme({
    palette: {
      mode,
      ...colorThemeCustom,
    },
    typography: {
      fontFamily: "Manrope Variable, sans-serif",
      allVariants: {
        color: "inherit",
        lineHeight: 1.5,
      },
      ...typographyCustom,
    },
    breakpoints: {
      values: {
        xl: 1920,
        lg: 1440,
        md: 1280,
        laptop: 1024,
        sm: 780,
        xs: 0,
      },
    },
    spacing: (factor: number) => 4 * factor,
    components: {
      MuiChip: MuiChip,
      MuiInputBase: MuiInputBase,
      MuiTextField: MuiTextField,
      MuiInputAdornment: MuiInputAdornment,
      MuiIconButton: MuiIconButton,
      MuiButton: MuiButton,
      MuiSnackbar: MuiSnackbar,
      MuiAlert: MuiAlert,
      MuiModal: MuiModal,
      MuiTooltip: MuiTooltip,
      MuiBadge: MuiBadge,
      MuiRadio: MuiRadio,
      MuiCheckbox: MuiCheckbox,
      MuiPagination: MuiPagination,
      MuiTable: MuiTable,
      MuiTableHead: MuiTableHead,
      MuiTableBody: MuiTableBody,
      MuiSwitch: MuiSwitch,
    },
  });

  theme.applyStyles = (expectedMode, styles) => {
    return mode === expectedMode ? styles : {};
  };

  return theme;
};
