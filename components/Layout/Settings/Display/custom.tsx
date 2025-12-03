import { CircleOutlined } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  SvgIcon,
  SvgIconProps,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { FC, memo, useState } from "react";

import { useCustomTheme } from "@/hooks/useCustomTheme";

import style from "../index.module.scss";
import {
  CustomCircularCheckboxProps,
  ICustomFormCheck,
  ICustomFormCheckProps,
  ICustomImage,
  ICustomLabel,
} from "../interface";

export const CustomCircularCheckedIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="16" fill="#4CAF50" />
      {/* Vòng tròn xanh bên ngoài */}
      <circle cx="12" cy="12" r="6" fill="white" />
      {/* Vòng tròn trắng bên trong */}
    </SvgIcon>
  );
};

// Sử dụng trong CustomCircularCheckbox
export function CustomCircularCheckbox({
  checked,
  onChange,
}: CustomCircularCheckboxProps) {
  return (
    <Checkbox
      checked={checked}
      onChange={onChange}
      icon={
        <CircleOutlined
          sx={{
            color: "#757575", // Màu xám tối (như hình chưa checked)
            borderRadius: "50%", // Đảm bảo hình tròn
          }}
        />
      }
      checkedIcon={
        <CustomCircularCheckedIcon
          sx={{
            "& .MuiSvgIcon-root": {
              borderRadius: "50%", // Đảm bảo hình tròn
              backgroundColor: "white", // Vòng trắng bên trong
              border: "2px solid currentColor", // Viền xanh lá
            },
          }}
        />
      }
      sx={{
        p: 0,
        "& .MuiSvgIcon-root": {
          borderRadius: "50%", // Viền ngoài tròn
          width: 20,
          height: 20,
          border: "none", // Bỏ viền mặc định của MUI
        },
      }}
    />
  );
}

export const CustomImage: FC<ICustomImage> = (props) => {
  const { url, alt } = props;
  return (
    <Image
      style={{
        objectFit: "cover",
      }}
      src={url}
      alt={alt || ""}
      quality={60}
      width={165}
      height={102}
    />
  );
};

export const CustomLabel: FC<ICustomLabel> = (props) => {
  const { label, children } = props;
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Box className={style.custom_head_row}>{label}</Box>
      {children}
    </Box>
  );
};

export const CustomFormCheck: FC<ICustomFormCheckProps> = memo((props) => {
  const { checked, onChange, item } = props;

  return (
    <FormGroup>
      <FormControlLabel
        sx={{
          gap: "8px",
          m: 0,
          "& .MuiTypography-root": {
            fontWeight: "500",
            fontSize: 14,
            lineHeight: "21px",
            letterSpacing: 0,
            color: "#EFEFEF",
            fontFamily: "inherit",
          },
        }}
        control={
          <CustomCircularCheckbox checked={checked} onChange={onChange} />
        }
        label={item.label}
      />
    </FormGroup>
  );
});

CustomFormCheck.displayName = "CustomFormCheck";

export const CustomSelectBox: FC<ICustomFormCheck> = memo((props) => {
  const { mode } = useCustomTheme();
  const {
    item,
    handleCheckboxChange,
    selectedLabel,
    isShowImage = true,
    isRow = false,
  } = props;
  const [, setChecked] = useState(false);

  const handleSelect = (v: string) => {
    setChecked(true);
    handleCheckboxChange(v);
  };
  return (
    <Box
      key={item.label}
      sx={{
        display: "flex",
        flexDirection: isRow ? "row" : "column",
        gap: "12px",
        alignItems: "center",
        width: isRow ? "100%" : "initial",
      }}
      className="custom-box"
    >
      <Box
        className={style.custom_nav_item_img}
        onClick={() => handleSelect(item.label)}
        sx={{
          outline: item.label === selectedLabel ? "1px solid #1AAF74" : 0,
          borderRadius: "8px",
          display: isShowImage ? "block" : "none",
        }}
      >
        {item.image}
      </Box>
      {isRow ? (
        <FormGroup
          sx={{
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between", // 👈 căn đều hai bên
              alignItems: "center", // 👈 căn giữa theo chiều dọc
              width: "100%",
            }}
          >
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: 14,
                lineHeight: "21px",
                letterSpacing: 0,
                color: mode === "light" ? "black" : "#EFEFEF",
                fontFamily: "inherit",
              }}
            >
              {item.label}
            </Typography>
            <CustomCircularCheckbox
              checked={item.label === selectedLabel}
              onChange={(e) => {
                setChecked(e.target.checked);
                handleCheckboxChange(item.label);
              }}
            />
          </Box>
        </FormGroup>
      ) : (
        <Box className={style.custom_nav_item_checkbox}>
          <FormGroup>
            <FormControlLabel
              sx={{
                gap: "8px",
                m: 0,
                "& .MuiTypography-root": {
                  fontWeight: "500",
                  fontSize: 14,
                  lineHeight: "21px",
                  letterSpacing: 0,
                  color: mode === "light" ? "black" : "#EFEFEF",
                  fontFamily: "inherit",
                },
              }}
              labelPlacement="start"
              control={
                <CustomCircularCheckbox
                  checked={item.label === selectedLabel}
                  onChange={(e) => {
                    setChecked(e.target.checked);
                    handleCheckboxChange(item.label);
                  }}
                />
              }
              label={item.label}
            />
          </FormGroup>
        </Box>
      )}
    </Box>
  );
});

CustomSelectBox.displayName = "CustomSelectBox";
