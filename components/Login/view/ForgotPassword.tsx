import { yupResolver } from "@hookform/resolvers/yup";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import ButtonComponent from "@/components/common/ButtonComponent";
import TypographyComponent from "@/components/common/TypographyComponent";
import { useCustomLanguage } from "@/hooks/useCustomLanguage";
import { IForgotPwd, IPostForgotPwd } from "@/interface/interface";
import { callApi } from "@/libs/http/http-common";
import { AuthAction } from "@/store/reducers/Login/login.reducer";
import { OTPAction } from "@/store/reducers/Otp/otp.reducer";
import eventBus from "@/utils/event";

import { RHFTextField } from "../../common/form/RHFTextField";
import style from "../login.module.scss";
import { forgotSchema } from "../validation";
import ChangePassword from "./ChangePassword";

type FormValues = {
  ClientCode: string; // số tài khoản
  ClientName: string; //Tên người dùng
  IDCard: string; //CCCD
  Contact: string; //email hoặc số điện thoại
};

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { t } = useCustomLanguage();
  const [showFormPwd, setShowFormPwd] = useState<number>(0);
  const methods = useForm<FormValues>({
    shouldFocusError: false,
    defaultValues: {
      ClientCode: "058C",
      ClientName: "",
      IDCard: "",
      Contact: "",
    },
    mode: "onChange",
    resolver: yupResolver(forgotSchema(t)),
  });
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = methods;

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleEventEmit = (event: {
    message: string;
    title: string;
    icon: string;
    textAction: string;
    status: boolean;
  }) => {
    eventBus.emit("showAlert", {
      message: event.message,
      title: event.title,
      icon: event.icon,
      textAction: event.textAction,
      status: event.status,
    });
  };

  const onSubmit = async (data: FormValues) => {
    const response = await callApi<IForgotPwd>({
      url: "/sg/api/gateway/v1/account/validate_forgot_pass",
      method: "POST",
      data: {
        ...data,
        ClientName: data.ClientName.toUpperCase(),
      },
    });
    if (response.Code === 0) {
      setShowFormPwd(1);
      dispatch(
        AuthAction.setForgotInfo({
          ...response.Data,
          Contact: watch("Contact"),
          IDCard: watch("IDCard"),
        } as IPostForgotPwd)
      );
      dispatch(
        OTPAction.getMethodOTP({
          ATRANSACTION: response.Data?.ATRANSACTION as number,
          ClientName: response.Data?.ANAME as string,
          Email: response.Data?.AEMAIL as string,
          SMS: response.Data?.AMOBILE as string,
        })
      );
    } else {
      if (response.Code === -2) {
        handleEventEmit({
          message: t("text_try_again"),
          title: "Sai thông tin tài khoản",
          icon: "lock-error",
          textAction: t("text_da_hieu"),
          status: true,
        });
      }
      if (response.Code === "NETWORK_ERROR") {
        handleEventEmit({
          message: t("text_try_again"),
          title: "Vui lòng kiểm tra kết nối internet của bạn",
          icon: "disconect",
          textAction: t("text_da_hieu"),
          status: true,
        });
      }
      if (response.Code === "UNKNOWN_ERROR") {
        handleEventEmit({
          message: t("text_try_again"),
          title: "Đã có lỗi xảy ra",
          icon: "error",
          textAction: t("text_da_hieu"),
          status: true,
        });
      }
    }
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

  return (
    <>
      <Head>
        <title>{t("text_forgot_pass")}</title>
      </Head>
      <Box className={`${style.custom_box}`} p={5}>
        {showFormPwd === 0 ? (
          <Box className={style.custom_box} flex={1} gap={10}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                span: {
                  flex: 1,
                  textAlign: "center",
                },
              }}
            >
              <Typography variant="heading20-S30">
                {t("text_forgot_pass")}
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
                gap={{ lg: "94px", xs: "63px" }}
              >
                <Stack gap={3} width="100%">
                  <Box sx={{ minHeight: { lg: 78, xs: 70 } }}>
                    <RHFTextField
                      responsiveSize={{
                        lg: "xlarge",
                        xs: "large",
                      }}
                      label={t("text_user_acc")}
                      fullWidth
                      name="ClientCode"
                      helperText={
                        errors.ClientCode && errors.ClientCode.message
                      }
                      clearable
                      startIcon="/assets/icon/Icon_login.svg"
                      autoFocus
                    />
                  </Box>
                  <Box sx={{ minHeight: { lg: 78, xs: 70 } }}>
                    <RHFTextField
                      responsiveSize={{
                        lg: "xlarge",
                        xs: "large",
                      }}
                      label={t("text_name_acc")}
                      error={errors.ClientName ? true : false}
                      helperText={
                        errors.ClientName && errors.ClientName.message
                      }
                      name="ClientName"
                      clearable
                      startIcon="/assets/icon/icon_fullname.svg"
                      sx={{
                        ".MuiInputBase-input": { textTransform: "uppercase" },
                      }}
                    />
                  </Box>
                  <Box sx={{ minHeight: { lg: 78, xs: 70 } }}>
                    <RHFTextField
                      responsiveSize={{
                        lg: "xlarge",
                        xs: "large",
                      }}
                      label={t("text_card_acc")}
                      error={errors.IDCard ? true : false}
                      helperText={errors.IDCard && errors.IDCard.message}
                      name="IDCard"
                      clearable
                      startIcon="/assets/icon/icon_numercard.svg"
                    />
                  </Box>
                  <Box sx={{ minHeight: { lg: 78, xs: 70 } }}>
                    <RHFTextField
                      responsiveSize={{
                        lg: "xlarge",
                        xs: "large",
                      }}
                      label={t("text_phone_email_acc")}
                      error={errors.IDCard ? true : false}
                      helperText={errors.IDCard && errors.IDCard.message}
                      name="Contact"
                      clearable
                      startIcon="/assets/icon/icon_phone.svg"
                    />
                  </Box>
                </Stack>
                <Box sx={{ display: "flex", marginTop: "auto" }}>
                  <ButtonComponent
                    responsiveSize={{
                      lg: "xlarge",
                      xs: "large",
                    }}
                    type="submit"
                    fullWidth
                    variant="primary"
                    disabled={isSubmitting}
                  >
                    <TypographyComponent
                      responsiveVariant={{
                        lg: "body16-M24",
                        xs: "body14-M21",
                      }}
                    >
                      Tiếp theo
                    </TypographyComponent>
                  </ButtonComponent>
                </Box>
              </Box>
            </FormProvider>
          </Box>
        ) : (
          <ChangePassword />
        )}
      </Box>
    </>
  );
};

export default ForgotPassword;
