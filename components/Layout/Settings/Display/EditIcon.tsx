import {
  Box,
  Checkbox,
  IconButton,
  Stack,
  styled,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { Trans } from "react-i18next";

import BaseSwitch from "@/components/ui/Switch/Switch";
import { useCustomLanguage } from "@/hooks/useCustomLanguage";

const CustomTaskBarIcon = styled(Stack)(({ theme }) => ({
  padding: "6px 12px",
  borderRadius: 16,
  outlineWidth: 1,
  outlineStyle: "solid",
  outlineColor: theme.palette.customPrimary?.primary50,
  color: theme.palette.customBase?.base80,
  flexDirection: "row",
  alignItems: "center",
  ...theme.applyStyles("dark", {
    color: theme.palette.customBase?.base20,
  }),
}));

const CustomTextIcon = styled(Stack, {
  shouldForwardProp: (prop) => prop !== "isCheckbox",
})<{ isCheckbox?: boolean }>(({ isCheckbox }) => ({
  "&.panel-left": {
    width: "100%",
    maxWidth: 166,
    gap: 8,
    ...(isCheckbox && {
      maxWidth: 155,
    }),
  },
  "&.panel-right": {
    width: "100%",
    gap: 12,
    maxWidth: 166,
    flexDirection: "row",
    justifyContent: "flex-end",
    ...(isCheckbox && {
      display: "none",
    }),
  },
  "&.panel-item-icon": {
    padding: 10,
    ...(isCheckbox && {
      paddingTop: 1,
      paddingBottom: 1,
      gap: 4,
      width: "100%",
      span: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      },
    }),
  },
  // flexDirection: "column",
  // gap: 1,
  // overflow: "hidden",
  // textAlign: "center",
  // height: 44,
  // width: 44,
  // padding: 10,
  // ...(isCheckbox && {
  //   width: "100%",
  // }),
  // span: {
  //   overflow: "hidden",
  //   textOverflow: "ellipsis",
  //   whiteSpace: "nowrap",
  // },
}));

const iconArr = [
  {
    icon: "/assets/icon_favorite/ic_bang_gia.svg",
    label: "Bảng giá",
  },
  {
    icon: "/assets/icon_favorite/ic_dat_lenh.svg",
    label: "Đặt lệnh",
  },
  {
    icon: "/assets/icon_favorite/ic_quan_ly_tai_khoan.svg",
    label: "Tài khoản",
  },
  {
    icon: "/assets/icon_favorite/ic_forum.svg",
    label: "Ezdiscuss",
  },
  {
    icon: "/assets/icon_favorite/ic_bang_gia.svg",
    label: "EzDiscuss",
  },
  {
    icon: "/assets/icon_favorite/ic_bang_gia.svg",
    label: "Bảng giá",
  },
  {
    icon: "/assets/icon_favorite/ic_bang_gia.svg",
    label: "Bảng giá",
  },
  {
    icon: "/assets/icon_favorite/ic_bang_gia.svg",
    label: "Quản lí tài khoản",
  },
];

const icon = [
  {
    src: "assets/icon_favorite/ic_nop_tien.svg",
    label: "Cash Deposit",
  },
];

export const EditIcon = () => {
  const { t } = useCustomLanguage();
  const [show, setShow] = useState(false);

  const handleShowTextIcon = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShow(event.target.checked);
  };
  return (
    <Box
      sx={{
        padding: 3,
        paddingTop: 4,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CustomTaskBarIcon>
        <CustomTextIcon className="panel-left" isCheckbox={show ? true : false}>
          <Stack direction="row" alignItems="center" gap={2}>
            <Typography variant="body14-M21">Cỡ chữ</Typography>
            <BaseSwitch checked={show} onChange={handleShowTextIcon} />
          </Stack>
          {show && (
            <Stack direction="row" alignItems="center" gap={2}>
              <Typography variant="body14-M21" sx={{ whiteSpace: "nowrap" }}>
                Màn mặc định
              </Typography>
              <Tooltip
                title={
                  <Box>
                    <Typography variant="sub12-B18">
                      {t("text_view_default")}
                    </Typography>
                  </Box>
                }
                arrow
                placement="top"
                slotProps={{
                  tooltip: {
                    sx: (theme) => ({
                      maxWidth: 412,
                      p: 3,
                      color: theme.palette.customBase?.base30,
                      background: theme.palette.customBase?.baseWhite,
                      ...theme.applyStyles("dark", {
                        background: theme.palette.customBase?.base50,
                      }),
                      ".MuiTooltip-arrow": {
                        color: theme.palette.customBase?.baseWhite,
                        ...theme.applyStyles("dark", {
                          color: theme.palette.customBase?.base50,
                        }),
                      },
                    }),
                  },
                }}
              >
                <IconButton>
                  <Image fill alt="" src="/assets/icon/icon_tooltip.svg" />
                </IconButton>
              </Tooltip>
              <BaseSwitch />
            </Stack>
          )}
        </CustomTextIcon>
        <Stack gap={2} flex={1}>
          <Stack flexDirection="row" gap={3}>
            {iconArr.map((item, index) => (
              <CustomTextIcon
                className="panel-item-icon"
                key={index}
                isCheckbox={show ? true : false}
              >
                <IconButton size={show ? "regular" : "large"}>
                  <Image alt="" src={item.icon} fill />
                </IconButton>
                {show && (
                  <Typography variant="sub12-M18">{item.label}</Typography>
                )}
              </CustomTextIcon>
            ))}
          </Stack>
          {show && (
            <Stack flexDirection="row" gap={3} justifyContent="space-around">
              {iconArr.map((item, index) => (
                <CustomTextIcon key={index} isCheckbox={true}>
                  <Checkbox
                    size="large"
                    disableRipple
                    slotProps={{
                      root: {
                        sx: {
                          "&": { padding: 0 },
                        },
                      },
                    }}
                  />
                </CustomTextIcon>
              ))}
            </Stack>
          )}
        </Stack>
        {!show && (
          <CustomTextIcon className="panel-right">
            <Image
              src="/assets/icon/icon-gift.svg"
              alt="icon-gift"
              width={16}
              height={16}
            />
            <Image
              src="/assets/icon/icon-belt.svg"
              alt="icon-belt"
              width={16}
              height={16}
            />
            <Image
              src="/assets/icon/icon_theme.svg"
              alt="icon-theme"
              width={16}
              height={16}
            />
            <Image
              src="/assets/icon/icon_setting.svg"
              alt="icon-setting"
              width={16}
              height={16}
            />
          </CustomTextIcon>
        )}
      </CustomTaskBarIcon>
      <Stack flexDirection="row" gap={4} mt={4} alignItems="flex-start">
        <Stack flex={1} gap={1}>
          <Typography variant="body14-S21">Danh sách chức năng</Typography>
          <Typography
            variant="sub12-M18"
            sx={(theme) => ({
              color: theme.palette.customBase?.base40,
            })}
          >
            <Trans
              i18nKey="text_note_icon"
              components={[
                <br key={0} />,
                <Typography
                  variant="sub12-M18"
                  key={1}
                  sx={(theme) => ({
                    color: theme.palette.customGreen?.default,
                  })}
                />,
                <Typography
                  variant="sub12-M18"
                  key={2}
                  sx={(theme) => ({
                    color: theme.palette.customGreen?.default,
                  })}
                />,
              ]}
            />
          </Typography>
        </Stack>
        <Stack maxWidth={160} gap={1}>
          <TextField size="small" placeholder="Tìm kiếm" />
        </Stack>
      </Stack>
      <Stack
        gap={2}
        mt={4}
        sx={{
          overflow: "auto",
          height: "100%",
        }}
      >
        <Stack
          gap={4}
          sx={(theme) => ({
            background: theme.palette.customBase?.baseWhite,
            borderRadius: 3,
            padding: 3,
            paddingTop: 2,
            ...theme.applyStyles("dark", {
              background: theme.palette.customBase?.base80,
            }),
          })}
        >
          <Typography variant="body14-B21">Cash Transaction</Typography>
          <Stack
            flexDirection="row"
            flexWrap="wrap"
            columnGap={17}
            rowGap={10.5}
            paddingLeft={5}
          >
            {[...Array(6).concat(icon)].map((item, index) => (
              <Stack gap={1} key={index}>
                <Image
                  alt=""
                  src="assets/icon_favorite/ic_nop_tien.svg"
                  width={42}
                  height={42}
                />
                <Typography variant="sub12-S18">Cash Deposit</Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
        <Stack
          gap={4}
          sx={(theme) => ({
            background: theme.palette.customBase?.baseWhite,
            borderRadius: 3,
            padding: 3,
            paddingTop: 2,
            ...theme.applyStyles("dark", {
              background: theme.palette.customBase?.base80,
            }),
          })}
        >
          <Typography variant="body14-B21">Cash Transaction</Typography>
          <Stack
            flexDirection="row"
            flexWrap="wrap"
            columnGap={17}
            rowGap={10.5}
            paddingLeft={5}
          >
            {[...Array(6).concat(icon)].map((item, index) => (
              <Stack gap={1} key={index}>
                <Image
                  alt=""
                  src="assets/icon_favorite/ic_nop_tien.svg"
                  width={42}
                  height={42}
                />
                <Typography variant="sub12-S18">Cash Deposit</Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
        <Stack
          gap={4}
          sx={(theme) => ({
            background: theme.palette.customBase?.baseWhite,
            borderRadius: 3,
            padding: 3,
            paddingTop: 2,
            ...theme.applyStyles("dark", {
              background: theme.palette.customBase?.base80,
            }),
          })}
        >
          <Typography variant="body14-B21">Cash Transaction</Typography>
          <Stack
            flexDirection="row"
            flexWrap="wrap"
            columnGap={17}
            rowGap={10.5}
            paddingLeft={5}
          >
            {[...Array(6).concat(icon)].map((item, index) => (
              <Stack gap={1} key={index}>
                <Image
                  alt=""
                  src="assets/icon_favorite/ic_nop_tien.svg"
                  width={42}
                  height={42}
                />
                <Typography variant="sub12-S18">Cash Deposit</Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};
