import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import { useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { EyeVisible, EyeVisibleOff } from "../../Login/custom";

type BreakpointValue<T> = {
  xl?: T;
  lg?: T;
  md?: T;
  laptop?: T;
  sm?: T;
  xs?: T;
};

interface RHFTextFieldResponsiveProps
  extends Omit<TextFieldProps, "name" | "label"> {
  name: string;
  label?: string;
  clearable?: boolean;
  password?: boolean;
  startIcon?: string;
  responsive?: boolean;
  responsiveSize?: BreakpointValue<TextFieldProps["size"]>;
}

export function RHFTextField({
  name,
  label,
  password,
  clearable,
  startIcon,
  responsive = true,
  responsiveSize,
  size,
  ...props
}: RHFTextFieldResponsiveProps) {
  const theme = useTheme();
  const { control, setValue, setFocus } = useFormContext();
  const [showPwd, setShowPwd] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const isXs = useMediaQuery(theme.breakpoints.up("xs"));
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isXl = useMediaQuery(theme.breakpoints.up("xl"));
  const isLaptop = useMediaQuery(theme.breakpoints.up("laptop"));

  const computedSize = responsive
    ? (isXl && responsiveSize?.xl) ||
      (isLg && responsiveSize?.lg) ||
      (isMd && responsiveSize?.md) ||
      (isLaptop && responsiveSize?.laptop) ||
      (isSm && responsiveSize?.sm) ||
      (isXs && responsiveSize?.xs) ||
      size
    : size;

  const iconSizeMap: Record<string, number> = {
    small: 16,
    medium: 20,
    large: 20,
    xlarge: 24,
  };
  const currentIconSize = iconSizeMap[computedSize ?? "medium"] ?? 24;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        // xác định type cuối cùng
        const fieldType = password
          ? showPwd
            ? "text"
            : "password"
          : (props.type ?? "text");

        // endAdornment logic
        let endAdornment: React.ReactNode = undefined;
        if (password) {
          endAdornment = (
            <InputAdornment position="end" sx={{ cursor: "pointer" }}>
              <IconButton
                // size={computedSize}
                sx={{
                  p: 0,
                  "&:hover": {
                    svg: {
                      fill: "#ffffff",
                    },
                  },
                }}
                onClick={() => setShowPwd((v) => !v)}
              >
                {showPwd ? (
                  <EyeVisibleOff
                    width={currentIconSize}
                    height={currentIconSize}
                  />
                ) : (
                  <EyeVisible
                    width={currentIconSize}
                    height={currentIconSize}
                  />
                )}
              </IconButton>
            </InputAdornment>
          );
        } else if (clearable && field.value) {
          endAdornment = (
            <InputAdornment position="end">
              <IconButton
                tabIndex={-1}
                size={computedSize}
                onClick={() => {
                  setValue(name, "");
                  setFocus(name);
                }}
                onMouseDown={(e) => e.preventDefault()}
              >
                <Image src="/assets/icon/close_icon.svg" alt="" fill />
              </IconButton>
            </InputAdornment>
          );
        }
        return (
          <TextField
            {...field}
            {...props}
            label={label}
            error={!!fieldState.error}
            size={computedSize}
            helperText={
              props.helperText !== undefined
                ? props.helperText
                : fieldState.error?.message
            }
            type={fieldType}
            inputRef={(el) => {
              inputRef.current = el;
              field.ref(el);
            }}
            slotProps={{
              input: {
                spellCheck: false,
                startAdornment: startIcon && (
                  <InputAdornment position="start">
                    <IconButton size={computedSize} tabIndex={-1}>
                      <Image src={startIcon} alt="" fill />
                    </IconButton>
                  </InputAdornment>
                ),
                endAdornment,
              },
            }}
          />
        );
      }}
    />
  );
}
