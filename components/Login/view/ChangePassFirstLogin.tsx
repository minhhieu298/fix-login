import { yupResolver } from "@hookform/resolvers/yup";
import {
  AlertColor,
  Box,
  Grid2,
  IconButton,
  SnackbarOrigin,
  Tooltip,
  Typography,
} from "@mui/material";
import * as Sentry from "@sentry/nextjs";
import { deleteCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { memo, useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Trans } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

import ButtonComponent from "@/components/common/ButtonComponent";
import DialogComponent from "@/components/common/DialogComponent";
import TypographyComponent from "@/components/common/TypographyComponent";
import { useCustomLanguage } from "@/hooks/useCustomLanguage";
import { IResponseLogin } from "@/interface/interface";
import { callApi } from "@/libs/http/http-common";
import { AuthAction } from "@/store/reducers/Login/login.reducer";
import eventBus from "@/utils/event";
import { Logout } from "@/utils/logout";

import { RHFTextField } from "../../common/form/RHFTextField";
import { ProgressBar } from "../CustomTypo";
import style from "../login.module.scss";
import { passwordValidation, validatePassword } from "../validation";

type FormValues = {
  NewPass: string;
  ConfirmPassword: string;
};

const ChangePassFirstLogin = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const showFormFirstLogin = useSelector(
    (state: {
      AuthReducer: {
        showFormFirstLogin: boolean;
      };
    }) => state.AuthReducer.showFormFirstLogin
  );
  const userInfo2FA = useSelector(
    (state: {
      AuthReducer: {
        userInfo2FA: IResponseLogin;
      };
    }) => state.AuthReducer.userInfo2FA
  );
  const { t, language } = useCustomLanguage();
  const methods = useForm<FormValues>({
    shouldFocusError: false,
    shouldUnregister: true,
    defaultValues: {
      NewPass: "",
      ConfirmPassword: "",
    },
    mode: "onChange",
    resolver: yupResolver(
      yup.object({
        NewPass: passwordValidation(t),
        ConfirmPassword: yup
          .string()
          .required("Vui lòng nhập mật khẩu mới")
          .oneOf([yup.ref("NewPass")], "Mật khẩu chưa trùng khớp"),
      })
    ),
  });
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    trigger,
  } = methods;

  const newPassValue = watch("NewPass") ?? "";
  const confirmPass = watch("ConfirmPassword") ?? "";

  const { count, checks } = useMemo(
    () => validatePassword(newPassValue, t),
    [newPassValue]
  );

  const arrLabel = useMemo(
    () =>
      checks.map((check) => ({
        label: check.label, // dùng key để map i18n
        isCheck: check.isCheck,
        isTooltip: check.isTooltip,
      })),
    [t, checks]
  );

  const handleAlert = ({
    message,
    status,
    severity,
    anchorOrigin = { horizontal: "center", vertical: "top" },
  }: {
    message: string;
    status: boolean;
    anchorOrigin?: SnackbarOrigin;
    severity: AlertColor;
  }) => {
    eventBus.emit("showToastMsg", {
      message,
      anchorOrigin,
      status,
      severity,
    });
  };

  const handleClose = async () => {
    dispatch(AuthAction.showFormFirstLogin(false));
    const response = await Logout();
    if (response.Code === -123456) {
      deleteCookie("aspfpt_sessiontoken", {
        domain: process.env.NODE_ENV === "production" ? ".fpts.com.vn" : "",
        path: "",
      });
      router.replace(
        {
          pathname: router.asPath.split("?")[0],
        },
        undefined,
        { shallow: true }
      );
    } else {
      if (response.Code === 0) {
        const client = Sentry.getClient();
        if (client) {
          const replayIntegration = client.getIntegrationByName("Replay") as {
            stop?: () => Promise<void>;
          };
          if (
            replayIntegration &&
            typeof replayIntegration.stop === "function"
          ) {
            await replayIntegration.stop();
          }
        }
        deleteCookie("aspfpt_sessiontoken", {
          domain: process.env.NODE_ENV === "production" ? ".fpts.com.vn" : "",
          path: "",
        });
      }
    }
    // //dispatch(AuthAction.showForm(true));
    dispatch(AuthAction.setUserInfo2FA(response));
    // router.push(
    //   {
    //     pathname: router.asPath.split("?")[0],
    //   },
    //   undefined,
    //   {
    //     shallow: true,
    //   }
    // );
  };

  const onSubmit = async (data: FormValues) => {
    if (userInfo2FA.Data && Object.keys(userInfo2FA.Data).length > 0) {
      if (
        userInfo2FA.Data.ExpireTimePassword !== "" &&
        userInfo2FA.Data.ExpireTimePassword !== null
      ) {
        const response = await callApi({
          method: "POST",
          url: "/sg/api/gateway/v1/account/change_pass_login",
          data: {
            NewPass: data.NewPass,
            Language: language === "vi" ? "vi-VN" : "en-US",
          },
        });
        if (response.Code === 0) {
          dispatch(AuthAction.showFormFirstLogin(false));
          handleAlert({
            message: response.Message,
            severity: "success",
            status: true,
          });
          router.replace(router.asPath.split("?")[0], undefined, {
            shallow: true,
          });
        } else {
          handleAlert({
            message: response.Message,
            severity: "error",
            status: true,
          });
        }
      } else {
        const response = await callApi({
          method: "POST",
          url: "/sg/api/gateway/v1/account/ChangePassword1st",
          data: {
            NewPass: data.NewPass,
            Language: language === "vi" ? "vi-VN" : "en-US",
          },
        });
        if (response.Code === 0) {
          dispatch(AuthAction.showFormFirstLogin(false));
          handleAlert({
            message: response.Message,
            severity: "success",
            status: true,
          });
          dispatch(AuthAction.getUserInfo());
          router.replace(router.asPath.split("?")[0], undefined, {
            shallow: true,
          });
        } else {
          handleAlert({
            message: response.Message,
            severity: "error",
            status: true,
          });
        }
      }
    }
  };

  //chặn ko cho nhập khoảng trắng/space
  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === " ") {
      event.preventDefault();
    }
  };
  //chặn ko cho paste có khoảng trắng
  const onPaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    const text = event.clipboardData.getData("text");
    if (/\s/.test(text)) {
      event.preventDefault(); // chặn nếu text chứa khoảng trắng
    }
  };

  useEffect(() => {
    if (confirmPass) {
      trigger("ConfirmPassword");
    }
  }, [newPassValue, confirmPass, trigger]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const HtmlText = ({ children, ...props }: any) => (
    <Typography
      variant="sub12-M18"
      component="p"
      sx={(theme) => ({
        color: theme.palette.customPrimary?.primary50,
      })}
      dangerouslySetInnerHTML={{ __html: children }}
      {...props}
    />
  );

  return (
    <DialogComponent
      open={showFormFirstLogin}
      fullWidth
      className="custom-modal-changepwd"
      disableEnforceFocus
      sx={{
        ".MuiPaper-root": {
          maxWidth: { lg: 500, xs: 400 },
          borderRadius: 5,
        },
      }}
    >
      <Box
        className={style.custom_box}
        sx={{
          p: 5,
          gap: 10,
          flex: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            variant="heading20-S30"
            sx={{ flex: 1, textAlign: "center" }}
          >
            {t("text_sub_menu_change_pass")}
          </Typography>
          <Box
            sx={{
              position: "relative",
              cursor: "pointer",
              marginLeft: "auto",
              width: {
                lg: 24,
                xs: 20,
              },
              height: {
                lg: 24,
                xs: 20,
              },
            }}
            onClick={handleClose}
          >
            <Image src="/assets/icon/close_icon.svg" alt="" fill />
          </Box>
        </Box>
        <FormProvider {...methods}>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            className={style.custom_box}
            flex={1}
          >
            <Box
              className={style.custom_box}
              sx={{
                gap: { lg: 5, xs: 2 },
                mb: { lg: "146px", xs: "45px" },
                flex: 1,
              }}
            >
              <Box sx={{ minHeight: { lg: 78, xs: 70 } }}>
                <RHFTextField
                  responsiveSize={{
                    lg: "xlarge",
                    xs: "large",
                  }}
                  label="Mật khẩu mới"
                  fullWidth
                  name="NewPass"
                  password
                  startIcon="/assets/icon/Icon_password.svg"
                  onKeyDown={onKeyDown}
                  onPaste={onPaste}
                  helperText={
                    errors.NewPass ? (
                      <Typography variant="sub12-R18" color="#F34859">
                        {errors.NewPass.message}
                      </Typography>
                    ) : newPassValue && !errors.NewPass ? (
                      <Typography variant="sub12-R18" color="#1AAF74">
                        Mật khẩu đạt yêu cầu
                      </Typography>
                    ) : null
                  }
                  autoFocus
                />
              </Box>
              <Box sx={{ minHeight: { lg: 78, xs: 70 } }}>
                <RHFTextField
                  responsiveSize={{
                    lg: "xlarge",
                    xs: "large",
                  }}
                  label="Xác nhận mật khẩu mới"
                  fullWidth
                  name="ConfirmPassword"
                  password
                  startIcon="/assets/icon/Icon_password.svg"
                  onKeyDown={onKeyDown}
                  onPaste={onPaste}
                  helperText={
                    errors.ConfirmPassword ? (
                      <Typography variant="sub12-R18" color="#F34859">
                        {errors.ConfirmPassword.message}
                      </Typography>
                    ) : confirmPass && !errors.ConfirmPassword ? (
                      <Typography variant="sub12-R18" color="#1AAF74">
                        Mật khẩu trùng khớp
                      </Typography>
                    ) : null
                  }
                />
              </Box>
              <Box className={style.custom_box} gap={3}>
                <ProgressBar count={count} />
                <Typography variant="body14-M21">
                  {t("text_pwd_required")}
                </Typography>
                <Grid2 container rowGap={"3px"}>
                  {arrLabel.map((item, index) => (
                    <Grid2
                      size={4}
                      key={index}
                      sx={{
                        display: "flex",
                        gap: 2,
                        alignItems: "center",
                      }}
                    >
                      <IconButton
                        size="small"
                        sx={{
                          cursor: "auto",
                        }}
                      >
                        <Image
                          fill
                          alt=""
                          src={
                            item.isCheck
                              ? "/assets/icon/tick_success.svg"
                              : "/assets/icon/tick_error.svg"
                          }
                        />
                      </IconButton>
                      <TypographyComponent
                        whiteSpace="nowrap"
                        responsiveVariant={{
                          lg: "body14-M21",
                          xs: "sub12-M18",
                        }}
                        sx={(theme) => ({
                          color: theme.palette.customBase?.base80,
                          ...theme.applyStyles("dark", {
                            color: theme.palette.customBase?.base20,
                          }),
                          cursor: "default",
                        })}
                      >
                        {item.label}
                      </TypographyComponent>
                      {item.isTooltip && (
                        <Tooltip
                          title={
                            <Trans
                              i18nKey="tooltip_char"
                              components={[
                                <Typography
                                  variant="sub12-M18"
                                  component="p"
                                  key={0}
                                />,
                                <HtmlText key={1} />,
                              ]}
                            />
                          }
                          arrow
                          placement="left"
                          slotProps={{
                            tooltip: {
                              sx: {
                                width: 223,
                              },
                            },
                          }}
                        >
                          <IconButton size="small">
                            <Image
                              fill
                              alt=""
                              src="/assets/icon/icon_tooltip.svg"
                            />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Grid2>
                  ))}
                </Grid2>
              </Box>
            </Box>

            <Box display="flex">
              <ButtonComponent
                variant="primary"
                type="submit"
                fullWidth
                size="xlarge"
                disabled={isSubmitting}
              >
                <TypographyComponent
                  responsiveVariant={{
                    lg: "body16-M24",
                    xs: "body14-M21",
                  }}
                >
                  {t("text_confirm")}
                </TypographyComponent>
              </ButtonComponent>
            </Box>
          </Box>
        </FormProvider>
      </Box>
    </DialogComponent>
  );
};

export default memo(ChangePassFirstLogin);
