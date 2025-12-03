import { Box, Typography } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { LINK_HELP } from "@/constants/Link";
import { useCustomLanguage } from "@/hooks/useCustomLanguage";
import { AuthAction } from "@/store/reducers/Login/login.reducer";

import { CustomBoxFooter, CustomTabPanel, SwitchTypeLogin } from "../custom";
import style from "../login.module.scss";
import LoginForm from "../view/Login";
import LoginQr from "../view/LoginQR";

const LayoutLogin = () => {
  const dispatch = useDispatch();
  const { t, changeLanguage, language } = useCustomLanguage();
  const [activeTab, setActiveTab] = useState<number>(0);
  const router = useRouter();
  const searchParams = useSearchParams();

  //close modal
  const handleClose = () => {
    dispatch(AuthAction.showForm(false));
    router.push(
      {
        pathname: router.asPath.split("?")[0],
      },
      undefined,
      {
        shallow: true,
      }
    );
  };
  return (
    <>
      <Head>
        <title>{t("text_login")}</title>
      </Head>
      <Box
        className={style.custom_box}
        sx={{
          p: "20px 20px 16px 20px",
          gap: {
            lg: 5,
            xs: 4,
          },
        }}
      >
        <Box className={`${style.custom_box}`}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: 136.74,
                height: {
                  lg: 36,
                  xs: 28,
                },
                flex: 1,
                aspectRatio: "136.74 / 36",
              }}
            >
              <Image
                src="/assets/image/logo_ngang 1.svg"
                alt="Logo"
                fill
                priority
                style={{ objectFit: "contain" }}
              />
            </Box>

            {searchParams.get("href") === "login" && (
              <Box
                sx={{
                  position: "relative",
                  cursor: "pointer",
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
            )}
          </Box>
        </Box>
        <Box className={style.custom_box}>
          <Typography variant="heading20-S30" textAlign="center">
            {t("text_login")}
          </Typography>
        </Box>
        <Box className={style.custom_box} flex={1}>
          <Box>
            <SwitchTypeLogin value={activeTab} onChange={setActiveTab} />
            <CustomTabPanel value={activeTab} index={0}>
              <LoginForm />
            </CustomTabPanel>
            <CustomTabPanel value={activeTab} index={1}>
              <LoginQr />
            </CustomTabPanel>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Link href={LINK_HELP} target="_blank">
              <CustomBoxFooter>
                <Image
                  src="/assets/image/Property=Call-center.svg"
                  alt=""
                  height={16}
                  width={16}
                />
                <Typography className="text_link" variant="body14-M21">
                  {t("text_support_center")}
                </Typography>
              </CustomBoxFooter>
            </Link>

            <CustomBoxFooter
              onClick={() => changeLanguage(language === "vi" ? "en" : "vi")}
            >
              <Image
                src={
                  language === "vi"
                    ? "/assets/image/icon_VN.svg"
                    : "/assets/image/icon_EN.svg"
                }
                alt=""
                height={16}
                width={16}
              />
              <Typography className="text_link" variant="body14-M21">
                {t("lang_vi_en")}
              </Typography>
            </CustomBoxFooter>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default LayoutLogin;
