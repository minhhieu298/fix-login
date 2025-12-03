import {
  Badge,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  SelectProps,
  Stack,
  styled,
  Theme,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

type Option = {
  label: string;
  value: string | number;
  bagde?: { label: string; active: boolean };
};

type Props = Omit<SelectProps, "name" | "label"> & {
  name: string;
  label?: string;
  options: Option[];
  helperText?: string | React.ReactNode;
  placeholder?: string;
};

const CustomSelect = styled(Select)(({ theme }) => ({
  borderRadius: 12,
  background: theme.palette.customBase?.base20,
  ...theme.applyStyles("dark", {
    background: theme.palette.customBase?.base55,
  }),
  ".MuiSelect-select": {
    // padding: "9.5px 40px 9.5px 16px",
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.5,
  },
  ".MuiOutlinedInput-notchedOutline": {
    borderColor: "transparent",
  },
  "&:hover": {
    ".MuiOutlinedInput-notchedOutline": {
      borderColor: "#1AAF74",
    },
  },
  "&.Mui-focused": {
    ".MuiOutlinedInput-notchedOutline": {
      borderWidth: 1,
      borderColor: "#1AAF74",
    },
  },
  "&.Mui-error": {
    ".MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
    },
  },
  ".MuiSvgIcon-root": {
    color: theme.palette.customBase?.base40,
    fontSize: 16,
  },
  "&.MuiInputBase-sizeLarge": {},
}));

const RHFSelect = ({
  name,
  options,
  helperText,
  placeholder,
  size,
  ...props
}: Props) => {
  const { control } = useFormContext();
  const labelId = `${name}-label`;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mergeProps: any = {
    ...props.MenuProps,
    PaperProps: {
      ...props.MenuProps?.PaperProps,
      sx: (theme: Theme) => {
        const oldSx = props.MenuProps?.PaperProps?.sx;
        const resolvedOld =
          typeof oldSx === "function" ? oldSx(theme) : oldSx || {};

        return {
          boxShadow: "0 4px 16px 0 rgba(0, 0, 0, 0.12)",
          backgroundImage: "none",
          backgroundColor: theme.palette.customBase?.base20,
          outline: `1px solid ${theme.palette.customAdditional?.base4003}`,
          color: theme.palette.customBase?.base80,
          ...resolvedOld, // merge sx cũ
          ...theme.applyStyles("dark", {
            backgroundColor: theme.palette.customBase?.base70,
            color: theme.palette.customBase?.base20,
          }),
        };
      },
    },
  };
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <FormControl
            fullWidth
            error={!!fieldState.error}
            sx={(theme) => ({
              ".MuiFormHelperText-root.Mui-error": {
                marginLeft: 3,
                display: "flex",
                color: "#F34859",
                fontSize: 12,
                lineHeight: 1.5,
                fontWeight: 400,
              },
              "&:has(.MuiInputBase-sizeLarge)": {
                ".MuiInputLabel-root": {
                  transform: "translate(14px, 13px) scale(1)",
                  "&.MuiFormLabel-filled": {
                    display: "none",
                  },
                },
              },
              ".MuiInputLabel-root": {
                fontWeight: 500,
                fontSize: 14,
                lineHeight: 1.5,
                fontFamily: "inherit",
                display: "flex",
                transform: "translate(14px, 10px) scale(1)",
                color: theme.palette.customAdditional?.base8003,
                ...theme.applyStyles("dark", {
                  color: theme.palette.customAdditional?.baseWhite03,
                }),
                "&.Mui-focused": {
                  color: theme.palette.customBase?.base80,
                  ...theme.applyStyles("dark", {
                    color: theme.palette.customBase?.base20,
                  }),
                },
              },
            })}
          >
            <CustomSelect
              {...field}
              {...props}
              label=""
              labelId={labelId}
              size={size}
              name={name}
              MenuProps={{
                disableScrollLock: true,
                disableAutoFocus: true,
                disableAutoFocusItem: true,
                MenuListProps: {
                  sx: (theme) => ({
                    py: 0,
                    ".MuiMenuItem-root": {
                      ":hover": {
                        background: theme.palette.customBase?.base25,
                        ...theme.applyStyles("dark", {
                          background: theme.palette.customBase?.base55,
                        }),
                      },
                      "&.Mui-selected": {
                        backgroundColor: theme.palette.customBase?.base20,
                        ...theme.applyStyles("dark", {
                          backgroundColor: theme.palette.customBase?.base70,
                        }),
                        "&:hover": {
                          background: theme.palette.customBase?.base25,
                          ...theme.applyStyles("dark", {
                            background: theme.palette.customBase?.base55,
                          }),
                        },
                        "&.Mui-focusVisible": {
                          backgroundColor: "transparent !important",
                        },
                      },
                      "&.Mui-focusVisible": {
                        backgroundColor: "transparent !important",
                      },
                    },
                  }),
                },
                ...mergeProps,
              }}
              renderValue={(selected) => {
                if (
                  selected === undefined ||
                  selected === null ||
                  selected === ""
                ) {
                  return (
                    <Typography
                      variant={size === "small" ? "sub12-M18" : "body14-M21"}
                      sx={(theme) => ({
                        color: theme.palette.customAdditional?.base8003,
                        ...theme.applyStyles("dark", {
                          color: theme.palette.customAdditional?.baseWhite03,
                        }),
                      })}
                    >
                      {placeholder}
                    </Typography>
                  );
                }
                const item = options.find((e) => e.value === selected);
                if (!item) return null;
                return (
                  <Stack
                    key={item.value}
                    sx={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Typography
                      variant={size === "small" ? "sub12-M18" : "body14-M21"}
                      noWrap
                    >
                      {item.label}
                    </Typography>
                    {item?.bagde && (
                      <Badge
                        size="small"
                        color={item?.bagde?.active ? "success" : "info"}
                        type="square"
                      >
                        {item?.bagde?.label}
                      </Badge>
                    )}
                  </Stack>
                );
              }}
            >
              {options.map((opt) => (
                <MenuItem
                  key={opt.value}
                  value={opt.value}
                  sx={{
                    padding: 3,
                    justifyContent: "space-between",
                  }}
                  disableRipple
                  disableTouchRipple
                >
                  <Stack alignItems="center" gap={2} flexDirection="row">
                    <Typography variant="body14-M21" display="flex">
                      {opt.label}
                    </Typography>
                    {opt?.bagde && (
                      <Badge
                        size="small"
                        color={opt?.bagde?.active ? "success" : "info"}
                        type="square"
                      >
                        {opt?.bagde?.label}
                      </Badge>
                    )}
                  </Stack>
                  {field.value === opt.value && (
                    <Image
                      src="/assets/image/tick_success.svg"
                      alt=""
                      width={20}
                      height={20}
                    />
                  )}
                </MenuItem>
              ))}
            </CustomSelect>
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
          </FormControl>
        );
      }}
    />
  );
};

export default RHFSelect;
