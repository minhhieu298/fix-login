import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Typography } from "@mui/material";
import * as Sentry from "@sentry/nextjs";
import { setCookie } from "cookies-next";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import ButtonComponent from "@/components/common/ButtonComponent";
import TypographyComponent from "@/components/common/TypographyComponent";
import { LINK_OPEN_ACCOUNT } from "@/constants/Link";
import { useCustomLanguage } from "@/hooks/useCustomLanguage";
import { ILogin } from "@/interface/interface";
import { callApi } from "@/libs/http/http-common";
import { AuthAction } from "@/store/reducers/Login/login.reducer";
import { deleteCookiesForCurrentHost } from "@/utils";
import eventBus from "@/utils/event";
import { getErrorMsg } from "@/utils/getErrorOTP";

import { RHFTextField } from "../../common/form/RHFTextField";
import style from "../login.module.scss";
import { loginSchema } from "../validation";

type FormValues = {
  LoginName: string;
  Password: string;
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const { t } = useCustomLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const methods = useForm<FormValues>({
    shouldFocusError: false,
    defaultValues: {
      LoginName: "058C",
      Password: "",
    },
    mode: "onChange",
    resolver: yupResolver(loginSchema(t)),
  });
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
    setFocus,
  } = methods;

  //ẩn hiện mật khẩu

  const showOTPWithPopup = (errorCode: string) => {
    const msg = getErrorMsg(errorCode, t);
    eventBus.emit("showAlert", {
      message: msg.msg,
      title: msg.title,
      icon: msg.icon,
      textAction: t("text_da_hieu"),
      status: true,
    });
  };

  const onSubmit = async (data: FormValues) => {
    const replay = Sentry.getReplay();

    if (process.env.NODE_ENV === "production") {
      deleteCookiesForCurrentHost();
    }
    const response = await callApi<ILogin>({
      url: "/sg/api/gateway/v1/account/login",
      method: "POST",
      data,
    });

    //Login successs thì handle từng case tương ứng
    try {
      if (response.Code === 0) {
        setCookie("aspfpt_sessiontoken", response.Data?.Jwt, {
          // để domain như này khi chạy local phải setup host về domain như dưới
          // //domain: ".fpts.com.vn",
          path: "/",
        });
        replay?.start();
        router.push({
          pathname: redirect || "/",
        });
        // dispatch(AuthAction.setUserInfo2FA(response));
        if (response.Data?.Login2FA === 1) {
          dispatch(AuthAction.showForm(false)); // đóng form login
        } else {
          //đổi mật khẩu từ internal khi login sẽ bị ép đổi mật khẩu
          if (response.Data?.IsFirstLogin) {
            reset({
              LoginName: "",
              Password: "",
            });
            eventBus.emit("showAlert", {
              message: t("text_first_login"),
              title: t("text_change_pwd"),
              icon: "lock-error",
              textAction: t("text_da_hieu"),
              eventAction: () => dispatch(AuthAction.showFormFirstLogin(true)),
              status: true,
            });
          }
          // đổi mật khẩu định kì sẽ ko ép buộc
          else {
            if (
              response.Data?.ExpireTimePassword !== "" &&
              response.Data?.ExpireTimePassword !== null
            ) {
              eventBus.emit("showConfirmModal", {
                message: "Mật khẩu của bạn sắp hết hạn.",
                title: `Để tăng cường bảo mật, vui lòng thay đổi mật khẩu định kỳ. Thời gian còn lại: ${response.Data?.ExpireTimePassword} ngày`,
                icon: "lock-warning",
                textActionPrev: t("text_remind"),
                textActionNext: t("text_sub_menu_change_pass"),
                eventActionNext: () =>
                  dispatch(AuthAction.showFormFirstLogin(true)),
                status: true,
              });
            } else {
              dispatch(AuthAction.showForm(false));
            }
          }
        }
      } else {
        setValue("Password", "");
        showOTPWithPopup(response.Code.toString());
        setFocus("Password", {
          shouldSelect: true,
        });
      }
    } catch {}
  };

  return (
    <Box
      className={style.custom_box}
      sx={{ flex: 1, mb: { lg: "108px", xs: 25 }, mt: { lg: 7, xs: 5 } }}
    >
      <FormProvider {...methods}>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          className={style.custom_box}
          gap={{ lg: 2, xs: 1 }}
        >
          <Box className={style.custom_box} gap={{ lg: 3, xs: 2 }}>
            <Box sx={{ minHeight: { lg: 78, xs: 70 }, width: "100%" }}>
              <RHFTextField
                responsiveSize={{
                  lg: "xlarge",
                  xs: "large",
                }}
                label="ID/Alias"
                error={errors.LoginName ? true : false}
                clearable
                helperText={
                  errors.LoginName && (
                    <Typography variant="sub12-R18">
                      {errors.LoginName.message}
                    </Typography>
                  )
                }
                autoFocus
                name="LoginName"
                fullWidth
                startIcon="/assets/icon/Icon_login.svg"
              />
            </Box>
            <Box sx={{ minHeight: { lg: 78, xs: 70 }, width: "100%" }}>
              <RHFTextField
                responsiveSize={{
                  lg: "xlarge",
                  xs: "large",
                }}
                label={t("text_password")}
                error={errors.Password ? true : false}
                helperText={
                  errors.Password && (
                    <Typography variant="sub12-R18">
                      {errors.Password.message}
                    </Typography>
                  )
                }
                name="Password"
                fullWidth
                autoComplete="curr-password"
                password
                startIcon="/assets/icon/Icon_password.svg"
              />
            </Box>
          </Box>
          <Box
            className={style.custom_box}
            sx={{
              gap: { lg: 5, xs: 4 },
              alignItems: "flex-end",
              "a:hover": {
                textDecoration: "underline",
              },
            }}
          >
            <Link
              href={`${router.pathname}?href=forgot-password`}
              shallow={false}
              prefetch={false}
              className="text_link"
              style={{
                display: "flex",
                width: "fit-content",
              }}
            >
              <Typography variant="body14-M21">
                {t("text_forgot_pass")}
              </Typography>
            </Link>
            <ButtonComponent
              type="submit"
              variant="primary"
              responsiveSize={{
                lg: "xlarge",
                xs: "large",
              }}
              disabled={isSubmitting}
              fullWidth
            >
              <TypographyComponent
                responsiveVariant={{
                  lg: "body16-M24",
                  xs: "body14-M21",
                }}
              >
                {t("text_login")}
              </TypographyComponent>
            </ButtonComponent>
            <Box
              component={Link}
              href={LINK_OPEN_ACCOUNT}
              target="_blank"
              rel="noopener noreferrer"
              prefetch={false}
              // className={styles.openAccountWrapper}
              sx={{
                textDecoration: "none",
                width: "100%",
                position: "relative",
                padding: "1px",
                borderRadius: 3,
                display: "inline-block",
                background:
                  "conic-gradient(from 0deg, #f36f21 0deg, #22b24c 90deg, #f36f21 180deg, #0066b3 270deg, #f36f21 360deg)",
              }}
            >
              <ButtonComponent
                responsiveSize={{
                  lg: "xlarge",
                  xs: "large",
                }}
                variant="secondary"
                fullWidth
                sx={(theme) => ({
                  background: `${theme.palette.customBase?.base20}`,
                  ...theme.applyStyles("dark", {
                    background: `${theme.palette.customBase?.base50}`,
                  }),
                  "&:hover": {
                    background: `${theme.palette.customBase?.base20}`,
                    ...theme.applyStyles("dark", {
                      background: `${theme.palette.customBase?.base50}`,
                    }),
                  },
                })}
              >
                <Typography
                  variant="body14-M21"
                  sx={(theme) => ({
                    color: theme.palette.customBase?.base60,
                    ...theme.applyStyles("dark", {
                      color: theme.palette.customBase?.baseWhite,
                    }),
                  })}
                >
                  Mở tài khoản
                </Typography>
              </ButtonComponent>
            </Box>
          </Box>
        </Box>
      </FormProvider>
    </Box>
  );
};

export default LoginForm;
