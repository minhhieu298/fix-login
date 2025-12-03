import { Box, IconButton, styled, Tooltip, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import Image from "next/image";
import { ElementType, FC, memo, useCallback } from "react";
import { Trans } from "react-i18next";
import { useSelector } from "react-redux";

import { useCustomLanguage } from "@/hooks/useCustomLanguage";
import { useCustomTheme } from "@/hooks/useCustomTheme";

import DialogComponent from "../common/DialogComponent";
import IconSecurity from "../Icons/IconSecurity";
import FormOtpVerification from "./FormOtpVerification";
import FormTokenOTP from "./FormTokenOTP";
import style from "./otp.module.scss";
import { IAuthenMethod, IFormOTP } from "./types";

const CustomTypographyBody = styled(Typography)<{ component?: ElementType }>(
  ({ theme }) => ({
    color: theme.palette.customBase?.base30,
    ...theme.applyStyles("dark", {
      color: theme.palette.customBase?.base20,
    }),
  })
);

const CustomTypographyHeading = styled(Typography)<{ component?: ElementType }>(
  ({ theme }) => ({
    color: theme.palette.customBase?.baseWhite,
  })
);

const FormOTP: FC<IFormOTP> = (props) => {
  const { open, onClose, verifyOTP, data, resendOTP } = props;
  const { t } = useCustomLanguage();
  const { isDark } = useCustomTheme();
  const authenticationMethod = useSelector(
    (state: {
      OTPReducer: {
        authenticationMethod: IAuthenMethod;
      };
    }) => state.OTPReducer.authenticationMethod
  );

  const onSubmit = useCallback(async (_otp: string) => {
    return await verifyOTP(_otp);
  }, []);

  const hideEmail = (str: string) => {
    if (str !== null) {
      const [localPart, domain] = str.split("@");
      const maskedLocalPart =
        localPart.slice(0, 1) + "****" + localPart.slice(-2);
      const maskedEmail = `${maskedLocalPart}@${domain}`;
      return maskedEmail;
    }
    return "";
  };

  const text = (
    <Typography
      key={0}
      variant="body16-B24"
      sx={(theme) => ({
        ml: 1,
        color: theme.palette.customBase?.base80,
        ...theme.applyStyles("dark", {
          color: theme.palette.customBase?.base20,
        }),
      })}
    />
  );

  return (
    <DialogComponent
      open={open}
      fullWidth
      sx={(theme) => ({
        zIndex: 1500,
        "& .MuiPaper-root": {
          maxWidth: authenticationMethod.ATRANSACTION === 1 ? 500 : 600,
          borderRadius: 3,
          padding: authenticationMethod.ATRANSACTION === 1 ? 6 : 3,
          margin: 0,
          ".title_OTP": {
            display: "flex",
            color: theme.palette.customBase?.base80,
            ...theme.applyStyles("dark", {
              color: theme.palette.customBase?.base20,
            }),
          },
          ".subtitle_OTP": {
            display: "flex",
            color: theme.palette.customBase?.base50,
            ...theme.applyStyles("dark", {
              color: theme.palette.customBase?.base30,
            }),
          },
          ".text_description": {
            display: "flex",
            color: theme.palette.customBase?.base40,
          },
        },
      })}
    >
      {authenticationMethod.ATRANSACTION === 1 ? (
        <Box className={style.custom_box} gap={10}>
          <Box className={style.custom_box} gap={4}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="heading20-S30"
                className="title_OTP"
                sx={{
                  flex: 1,
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                Xác thực Giao dịch bằng Token
              </Typography>
              <IconButton size="large" onClick={onClose}>
                <Image src="/assets/icon/close_icon.svg" alt="" fill />
              </IconButton>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
              }}
            >
              <Typography variant="body16-M24" className="subtitle_OTP">
                Vui lòng nhập TokenCode hoặc PassCode
              </Typography>
              <Tooltip
                title={
                  <Box className={style.custom_box} gap={4}>
                    <CustomTypographyBody component="div" variant="sub12-S18">
                      Nếu sử dụng PassCode, khi xác thực GD, Quý khách cần nhập
                      PIN đã đăng ký theo sau là Mã Token.
                    </CustomTypographyBody>
                    <CustomTypographyBody component="div" variant="sub12-S18">
                      Ví dụ, nếu PIN là{" "}
                      <CustomTypographyHeading
                        component="span"
                        variant="sub12-B18"
                      >
                        Ha123
                      </CustomTypographyHeading>{" "}
                      và TokenCode là{" "}
                      <CustomTypographyHeading
                        component="span"
                        variant="sub12-B18"
                      >
                        369369
                      </CustomTypographyHeading>
                      , thì Mã truy cập là{" "}
                      <CustomTypographyHeading
                        component="span"
                        variant="sub12-B18"
                      >
                        Ha123369369
                      </CustomTypographyHeading>
                      .
                    </CustomTypographyBody>
                  </Box>
                }
                arrow
                slotProps={{
                  tooltip: {
                    sx: (theme) => ({
                      maxWidth: 232,
                      p: 3,
                      borderRadius: 4,
                      mt: "8px !important",
                      color: theme.palette.customBase?.base30,
                      background: theme.palette.customBase?.base80,
                      ...theme.applyStyles("dark", {
                        background: theme.palette.customBase?.base50,
                      }),
                      ".MuiTooltip-arrow": {
                        color: theme.palette.customBase?.base80,
                        ...theme.applyStyles("dark", {
                          color: theme.palette.customBase?.base50,
                        }),
                      },
                    }),
                  },
                }}
              >
                <IconButton size="medium">
                  <Image src="/assets/icon/icon_alert.svg" alt="" fill />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          <FormTokenOTP handleOTP={onSubmit} />
        </Box>
      ) : (
        <Box className={style.custom_box} sx={{ alignItems: "center", gap: 5 }}>
          <Box className={style.custom_box} sx={{ width: "100%", gap: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flex: 1,
                  justifyContent: "center",
                  gap: 2,
                }}
              >
                <IconSecurity
                  width={20}
                  color={isDark ? "#EFEFEF" : "#1A1D1F"}
                />
                <Typography
                  variant="heading20-S30"
                  className="subtitle_OTP"
                  textAlign="center"
                >
                  {authenticationMethod.ATRANSACTION === 2 ||
                  authenticationMethod.ATRANSACTION === 3 ? (
                    <Trans
                      i18nKey="text_title_OTP"
                      values={{
                        method:
                          authenticationMethod.ATRANSACTION === 2
                            ? "SMS"
                            : "Email",
                      }}
                    />
                  ) : authenticationMethod.ATRANSACTION === 4 ? (
                    t("text_title_smartOTP")
                  ) : (
                    "Vui lòng chọn phương thức xác thực"
                  )}
                </Typography>
              </Box>
              <IconButton size="large" onClick={onClose}>
                <Image src="/assets/icon/close_icon.svg" alt="" fill />
              </IconButton>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <Typography
                variant="body16-M24"
                className="subtitle_OTP"
                textAlign="center"
              >
                {authenticationMethod.ATRANSACTION === 2 ? (
                  <Trans
                    i18nKey="text_body_sendOTP"
                    components={[text]}
                    values={{
                      method:
                        authenticationMethod.SMS !== null
                          ? authenticationMethod.SMS.slice(0, 3) +
                            "****" +
                            authenticationMethod.SMS.slice(7)
                          : "",
                      action: t("text_phone"),
                    }}
                  />
                ) : authenticationMethod.ATRANSACTION === 3 ? (
                  <Trans
                    i18nKey="text_body_sendOTP"
                    components={[text]}
                    values={{
                      method:
                        authenticationMethod.Email !== null
                          ? hideEmail(authenticationMethod.Email)
                          : "",
                      action: t("text_Email"),
                    }}
                  />
                ) : (
                  authenticationMethod.ATRANSACTION === 4 &&
                  t("text_body_smartOTP")
                )}
              </Typography>
            </Box>
          </Box>
          <FormOtpVerification
            handleOTP={onSubmit}
            resendOTP={resendOTP}
            data={data}
          />
        </Box>
      )}
    </DialogComponent>
  );
};

export default dynamic(() => Promise.resolve(memo(FormOTP)), { ssr: false });
