import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid2, IconButton, Tooltip, Typography } from "@mui/material";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Trans } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

import ButtonComponent from "@/components/common/ButtonComponent";
import TypographyComponent from "@/components/common/TypographyComponent";
import FormOTP from "@/components/FormOTP";
import style from "@/components/Login/login.module.scss";
import { useCustomLanguage } from "@/hooks/useCustomLanguage";
import { IPostForgotPwd } from "@/interface/interface";
import { IOTP, IResponseOTP } from "@/interface/otp/interface";
import { callApi } from "@/libs/http/http-common";
import { AuthAction } from "@/store/reducers/Login/login.reducer";
import eventBus from "@/utils/event";
import { getErrorMsg } from "@/utils/getErrorOTP";

import { RHFTextField } from "../../common/form/RHFTextField";
import { ProgressBar } from "../CustomTypo";
import { passwordValidation, validatePassword } from "../validation";

type FormValues = {
  NewPass: string;
  ConfirmPassword: string;
};

const ChangePassword = () => {
  const dispatch = useDispatch();
  const forgotInfo = useSelector(
    (state: {
      AuthReducer: {
        forgotInfo: IPostForgotPwd;
      };
    }) => state.AuthReducer.forgotInfo
  );

  const { t } = useCustomLanguage();
  const [showOTP, setShowOTP] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [resultOTP, setResultOTP] = useState<IOTP>();
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
      }),
      { abortEarly: false }
    ),
  });
  const {
    handleSubmit,
    formState: { errors },
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

  //show Form nhập OTP
  const handleOTP = useCallback(() => {
    setShowOTP(false);
  }, []);

  const showOTPWithPopup = (errorCode: string | number) => {
    const msg = getErrorMsg(errorCode, t);
    eventBus.emit("showAlert", {
      message: msg.msg,
      title: msg.title,
      icon: "error",
      textAction: t("text_da_hieu"),
      status: true,
    });
  };

  //submit để lấy OTP
  const onSubmit = async (data: FormValues) => {
    //tk sms/email thì sendOTP
    if (forgotInfo.ATRANSACTION !== 1 && forgotInfo.ATRANSACTION !== 4) {
      const newData = {
        ClientCode: forgotInfo.ACLIENTCODE,
        NewPass: data.NewPass,
        ClientName: forgotInfo.ANAME,
        IDCard: forgotInfo.IDCard, // số CMND
        Contact: forgotInfo.Contact,
      };
      const response = await callApi<IOTP>({
        url: "/sg/api/gateway/v1/account/forgot_password",
        method: "POST",
        data: newData,
      });

      if (response.Code === 181109) {
        setShowOTP(true);
        setResultOTP(response.Data as IOTP);
      } else {
        if (response.Code === 181107) {
          setShowOTP(true);
          setResultOTP(response.Data as IOTP);
        }
        showOTPWithPopup(response.Code);
      }
    } else {
      setShowOTP(true);
    }
  };

  const verifyOTP = async (otp: string): Promise<boolean> => {
    eventBus.emit("msgOTP", {
      message: "",
    });
    const newData = {
      ClientCode: forgotInfo.ACLIENTCODE,
      NewPass: watch("NewPass"),
      ClientName: forgotInfo.ANAME,
      IDCard: forgotInfo.IDCard,
      Contact: forgotInfo.Contact,
      OTP: otp,
    };
    const response = await callApi<IResponseOTP>({
      url: "/sg/api/gateway/v1/account/forgot_password",
      method: "POST",
      data: newData,
    });
    // alert(response.Message);
    if (response.Code === 0) {
      eventBus.emit("showAlert", {
        message: t("text_require_lognewpass"),
        title: t("text_changepwd_success"),
        icon: "success",
        textAction: t("text_da_hieu"),
        status: true,
      });
      setShowOTP(false);
      dispatch(AuthAction.showForm(false));
    } else {
      const msg = getErrorMsg(response.Code, t);
      if (response.Code === 181109) {
        setShowOTP(true);
        setResultOTP(response.Data as IOTP);
      } else {
        eventBus.emit("msgOTP", {
          message: msg.msg,
        });
        return false;
      }
    }
    return true;
  };

  const handleClose = () => {
    dispatch(AuthAction.showForm(false));
    router.push(
      {
        pathname: router.asPath.split("?")[0],
      },
      undefined,
      { shallow: true }
    );
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
    <>
      <Box className={style.custom_box} flex={1} gap={10} p={5}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            span: {
              flex: 1,
              textAlign: "center",
            },
          }}
        >
          <Typography variant="heading20-S30">
            {t("text_create_new_pwd")}
          </Typography>
          {searchParams.get("href") === "forgot-password" && (
            <IconButton size="large" onClick={handleClose}>
              <Image src="/assets/icon/close_icon.svg" alt="" fill />
            </IconButton>
          )}
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
              gap={{ lg: 5, xs: 3 }}
              mb={{ lg: "146px", xs: 30 }}
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
                  autoFocus
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
                  {arrLabel.map((item, ind) => (
                    <Grid2
                      size={4}
                      key={ind}
                      sx={{
                        display: "flex",
                        gap: 2,
                        justifyContent: ind === 2 ? "flex-end" : "flex-start",
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
                          flex: 1,
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
                responsiveSize={{
                  lg: "xlarge",
                  xs: "large",
                }}
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
      {showOTP && (
        <FormOTP
          open={showOTP}
          onClose={handleOTP}
          verifyOTP={verifyOTP}
          data={resultOTP as IOTP}
          resendOTP={verifyOTP}
        />
      )}
    </>
  );
};

export default ChangePassword;
