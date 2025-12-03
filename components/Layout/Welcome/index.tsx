import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  LinearProgress,
  Slide,
  Zoom,
} from "@mui/material";
import Lottie from "lottie-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import ContentWelcome from "@/components/Layout/Welcome/ContentWelcome";
import {
  classicConfig,
  newHubTemplateWelcome,
  personalConfig,
  professionalConfig,
} from "@/constants/dynamic-dashboard/constant";
import { useCustomLanguage } from "@/hooks/useCustomLanguage";
import { useCustomTheme } from "@/hooks/useCustomTheme";
import { callApi } from "@/libs/http/http-common";
import darkSkyAnimation from "@/public/assets/image/dark_sky.json";
import lightSkyAnimation from "@/public/assets/image/light_sky.json";
import { ezhubActions } from "@/store/reducers/ezHub.reducer";
import { settingAction } from "@/store/reducers/setting.reducer";
import eventBus from "@/utils/event";

import {
  IConfig,
  IconPositions,
  IconType,
  ISettingResponse,
} from "./IContentWelcome";
import styles from "./Welcome.module.css";

const Welcome = () => {
  const { t } = useCustomLanguage();
  const dispatch = useDispatch();
  const [config, setConfig] = useState<IConfig>({
    step: 1,
    layout: "classic",
    layoutPositions: {
      classic: "center",
      professional: "right",
      personal: "left",
    },
    iconPack: "green",
    iconPositions: {
      pink: "left",
      green: "center",
      grey: "right",
    },
    open: true,
  });
  const [slideDirection, setSlideDirection] = useState<"left" | "right">(
    "left"
  );
  const containerRef = useRef<HTMLElement>(null);
  const [loadingStates, setLoadingStates] = useState([false, false, false]);
  // const [openToast, setOpenToast] = useState(false);
  const router = useRouter();

  const { toggleTheme, mode, muiTheme } = useCustomTheme();

  const handleSettingWelcome = async () => {
    try {
      const data = {
        layout: config.layout,
        iconPack: config.iconPack,
        theme: mode,
        position: "Top",
        language: "vi",
      };

      const response = await callApi<ISettingResponse>({
        url: "/sg/api/gateway/v1/account/setting",
        method: "POST",
        data: {
          Setting: JSON.stringify(data),
        },
      });

      if (response.Code === 0) {
        switch (config.layout) {
          case "classic":
            dispatch(
              ezhubActions.addEzhubAction(newHubTemplateWelcome(classicConfig))
            );
            break;
          case "professional":
            dispatch(
              ezhubActions.addEzhubAction(
                newHubTemplateWelcome(professionalConfig)
              )
            );
            break;
          case "personal":
            dispatch(
              ezhubActions.addEzhubAction(newHubTemplateWelcome(personalConfig))
            );
            break;
        }
        if (response.Data?.Setting) {
          dispatch(
            settingAction.setDataSetting(JSON.parse(response.Data.Setting))
          );
        }
        return true;
      } else {
        return false;
      }
    } catch {
      return false;
    }
  };

  const handleTheme = () => {
    toggleTheme(mode === "dark" ? "light" : "dark");
  };

  const handleNext = () => {
    setSlideDirection("left");
    if (config.step < 4) {
      setConfig((prev) => ({ ...prev, step: prev.step + 1 }));
    } else {
      setConfig((prev) => ({ ...prev, open: false }));
    }
  };

  const handleBack = () => {
    setSlideDirection("right");
    setConfig((prev) => ({ ...prev, step: prev.step - 1 }));
  };

  const iconOptions: Array<IconType> = ["green", "pink", "grey"];

  const handleIconSelect = (selected: IconType) => {
    const currentPos = config.iconPositions[selected];

    // Nếu đang ở center thì không làm gì
    if (currentPos === "center") {
      return;
    }

    const newPositions: IconPositions = {
      green: config.iconPositions.green,
      pink: config.iconPositions.pink,
      grey: config.iconPositions.grey,
    };

    // Tính toán direction để slide
    if (currentPos === "left") {
      // Icon bên trái slide vào center
      newPositions[selected] = "center";
      newPositions[config.iconPack] = "right";

      // Icon còn lại ở left
      iconOptions.forEach((icon) => {
        if (icon !== selected && icon !== config.iconPack) {
          newPositions[icon] = "left";
        }
      });
    } else if (currentPos === "right") {
      // Icon bên phải slide vào center
      newPositions[selected] = "center";
      newPositions[config.iconPack] = "left";

      // Icon còn lại ở right
      iconOptions.forEach((icon) => {
        if (icon !== selected && icon !== config.iconPack) {
          newPositions[icon] = "right";
        }
      });
    }

    setConfig((prev) => ({
      ...prev,
      iconPositions: newPositions,
      iconPack: selected,
    }));
  };

  const layoutOptions: Array<"classic" | "professional" | "personal"> = [
    "classic",
    "professional",
    "personal",
  ];

  const handleLayoutSelect = (
    selected: "classic" | "professional" | "personal"
  ) => {
    const currentPos = config.layoutPositions[selected];

    // Nếu đang ở center thì không làm gì
    if (currentPos === "center") {
      return;
    }

    const newPositions: {
      classic: "left" | "center" | "right";
      professional: "left" | "center" | "right";
      personal: "left" | "center" | "right";
    } = {
      classic: config.layoutPositions.classic,
      professional: config.layoutPositions.professional,
      personal: config.layoutPositions.personal,
    };

    // Tính toán direction để slide
    if (currentPos === "left") {
      // Layout bên trái slide vào center
      newPositions[selected] = "center";
      newPositions[config.layout] = "right";

      // Layout còn lại ở left
      layoutOptions.forEach((layout) => {
        if (layout !== selected && layout !== config.layout) {
          newPositions[layout] = "left";
        }
      });
    } else if (currentPos === "right") {
      // Layout bên phải slide vào center
      newPositions[selected] = "center";
      newPositions[config.layout] = "left";

      // Layout còn lại ở right
      layoutOptions.forEach((layout) => {
        if (layout !== selected && layout !== config.layout) {
          newPositions[layout] = "right";
        }
      });
    }

    setConfig((prev) => ({
      ...prev,
      layoutPositions: newPositions,
      layout: selected,
    }));
  };

  useEffect(() => {
    if (config.step === 4) {
      setLoadingStates([false, false, false]);

      const timer1 = setTimeout(() => {
        setLoadingStates([true, false, false]);
      }, 1000);

      const timer2 = setTimeout(() => {
        setLoadingStates([true, true, false]);
      }, 2000);

      const timer3 = setTimeout(async () => {
        setLoadingStates([true, true, true]);

        const success = await handleSettingWelcome();

        if (success) {
          const redirectTimer = setTimeout(() => {
            router.push({ pathname: router.asPath.split("?")[0] }, undefined, {
              shallow: true,
            });
            dispatch(settingAction.offShowWelcome());
          }, 1000);

          return () => {
            clearTimeout(redirectTimer);
          };
        } else {
          // setOpenToast(true);
          eventBus.emit("showToastMsg", {
            severity: "error",
            message: "Lỗi khi lưu cài đặt!",
            status: true,
          });
          const redirectHome = setTimeout(() => {
            dispatch(settingAction.offShowWelcome());
            router.push(
              { pathname: "/", query: { href: "login" } },
              undefined,
              { shallow: true }
            );
          }, 2000);

          return () => {
            clearTimeout(redirectHome);
          };
        }
      }, 3000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [config.step]);

  return (
    <Dialog
      open={config.open}
      slotProps={{
        paper: {
          className: styles.welcomePaper,
        },
      }}
      sx={{
        backdropFilter: "blur(20px)",
        "& .MuiBackdrop-root": {
          background:
            mode === "dark"
              ? muiTheme.palette?.customBase?.base80
              : muiTheme.palette?.customBase?.baseWhite,
        },
        "&::after": {
          content: '""',
          position: "absolute",
          top: "30%",
          left: "40%",
          width: "190px",
          height: "220px",
          boxShadow: `
            0 0 300px 25px rgba(255, 128, 155, 1),
            0 0 300px 25px rgba(255, 227, 128, 1)
          `,
          zIndex: -1,
          filter: "blur(60px)",
        },
        "& > div:first-of-type::before": {
          content: '""',
          position: "absolute",
          top: "30%",
          right: "40%",
          width: "190px",
          height: "220px",
          background:
            "linear-gradient(rgba(180, 174, 255, 1) 0%, rgba(157, 229, 255, 1) 70%)",
          boxShadow: "0 0 300px 25px rgb(41 255 215)",
          zIndex: -1,
        },
        "& > div:first-of-type::after": {
          content: '""',
          position: "absolute",
          bottom: "25%",
          right: "45%",
          width: "190px",
          height: "220px",
          background:
            "linear-gradient(rgba(180, 174, 255, 1) 0%, rgba(157, 229, 255, 1) 70%)",
          boxShadow: `
            0 0 300px 25px rgba(180, 174, 255, 1),
            0 0 300px 25px rgba(157, 229, 255, 1)
          `,
          zIndex: -1,
        },
      }}
    >
      <DialogTitle
        sx={(theme) => ({
          padding: "20px 20px 0px 20px",
          fontSize: "16px",
          fontWeight: 600,
          backgroundColor: theme.palette.customBase?.baseWhite,
          ...theme.applyStyles("dark", {
            backgroundColor: theme.palette.customBase?.base80,
          }),
        })}
      >
        <Box
          className={styles.header}
          sx={(theme) => ({
            backgroundColor: theme.palette.customBase?.base10,
            ...theme.applyStyles("dark", {
              backgroundColor: theme.palette.customBase?.base70,
            }),
          })}
        >
          <Image
            src="/assets/icon/logo_ngang 3.svg"
            alt="logo"
            width={106}
            height={28}
            priority
          />
          <Box
            className={`${styles.headerGreeting} ${
              mode === "dark" ? styles.headerGreetingDark : ""
            }`}
          >
            {t("title_welcome")}
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent
        className={`${styles.dialogContent} ${
          mode === "dark" ? styles.dialogContentDark : ""
        }`}
        sx={{ padding: "0px" }}
      >
        {config.step === 1 ? (
          <ContentWelcome
            title={t("title_welcome_step1")}
            subtitle1={t("title_welcome_step1_subtitle1")}
            subtitle2={t("title_welcome_step1_subtitle2")}
            gradientText={
              mode === "dark"
                ? t("title_welcome_step1_gradient_dark")
                : t("title_welcome_step1_gradient_light")
            }
            layout={config.layout}
            iconPack={config.iconPack}
            step={config.step}
            image={
              <>
                <Box
                  className={`${styles.switchContainer} ${
                    mode === "dark" ? styles.checked : ""
                  }`}
                  onClick={handleTheme}
                >
                  <span className={styles.labelLight}>
                    {t("title_welcome_step1_tab_button_light")}
                  </span>
                  <div className={styles.track}>
                    <div className={styles.thumb} />
                  </div>
                  <span className={styles.labelDark}>
                    {t("title_welcome_step1_tab_button_dark")}
                  </span>
                </Box>
                {mode === "dark" ? (
                  <Box sx={{ padding: "20px" }}>
                    <Lottie
                      animationData={darkSkyAnimation}
                      loop
                      style={{ width: 180, height: 180 }}
                    />
                  </Box>
                ) : (
                  <Box sx={{ padding: "20px" }}>
                    <Lottie
                      animationData={lightSkyAnimation}
                      loop
                      style={{ width: 180, height: 180 }}
                    />
                  </Box>
                )}
              </>
            }
          />
        ) : config.step === 2 ? (
          <Slide
            key={`step-${config.step}`}
            in={config.step === 2}
            direction={slideDirection}
          >
            <ContentWelcome
              title={t("title_welcome_step2")}
              subtitle1={t("title_welcome_step2_subtitle1")}
              subtitle2={t("title_welcome_step2_subtitle2")}
              gradientText={
                config.layout === "classic"
                  ? t("title_welcome_step2_gradient_classic")
                  : config.layout === "professional"
                    ? t("title_welcome_step2_gradient_professional")
                    : t("title_welcome_step2_gradient_personal")
              }
              layout={config.layout}
              iconPack={config.iconPack}
              step={config.step}
              ref={containerRef}
              image={
                <Box className={styles.layoutPackContainer}>
                  <Box
                    className={`${styles.layoutOption} ${
                      styles[
                        `layout${
                          config.layoutPositions.classic
                            .charAt(0)
                            .toUpperCase() +
                          config.layoutPositions.classic.slice(1)
                        }`
                      ]
                    } ${
                      config.layout === "classic"
                        ? mode === "dark"
                          ? styles.selectedLayoutClassic
                          : styles.selectedLayoutClassicLight
                        : ""
                    }`}
                    onClick={() => handleLayoutSelect("classic")}
                  >
                    <Image
                      src={
                        mode === "dark"
                          ? "/assets/image/layout_classic.png"
                          : "/assets/image/layout_classic_light.png"
                      }
                      alt="Classic Layout"
                      width={200}
                      height={139}
                    />
                  </Box>
                  <Box
                    className={`${styles.layoutOption} ${
                      styles[
                        `layout${
                          config.layoutPositions.professional
                            .charAt(0)
                            .toUpperCase() +
                          config.layoutPositions.professional.slice(1)
                        }`
                      ]
                    } ${
                      config.layout === "professional"
                        ? mode === "dark"
                          ? styles.selectedLayoutProfessional
                          : styles.selectedLayoutProfessionalLight
                        : ""
                    }`}
                    onClick={() => handleLayoutSelect("professional")}
                  >
                    <Image
                      src={
                        mode === "dark"
                          ? "/assets/image/layout_professional.png"
                          : "/assets/image/layout_professional_light.png"
                      }
                      alt="Professional Layout"
                      width={200}
                      height={139}
                    />
                  </Box>
                  <Box
                    className={`${styles.layoutOption} ${
                      styles[
                        `layout${
                          config.layoutPositions.personal
                            .charAt(0)
                            .toUpperCase() +
                          config.layoutPositions.personal.slice(1)
                        }`
                      ]
                    } ${
                      config.layout === "personal"
                        ? mode === "dark"
                          ? styles.selectedLayoutPersonal
                          : styles.selectedLayoutPersonalLight
                        : ""
                    }`}
                    onClick={() => handleLayoutSelect("personal")}
                  >
                    <Image
                      src={
                        mode === "dark"
                          ? "/assets/image/layout_personal.png"
                          : "/assets/image/layout_personal_light.png"
                      }
                      alt="Personal Layout"
                      width={200}
                      height={139}
                    />
                  </Box>
                </Box>
              }
            />
          </Slide>
        ) : config.step === 3 ? (
          <Slide
            key={`step-${config.step}`}
            in={config.step === 3}
            direction={slideDirection}
          >
            <ContentWelcome
              title={t("title_welcome_step3")}
              subtitle1={t("title_welcome_step3_subtitle1")}
              subtitle2={t("title_welcome_step3_subtitle2")}
              gradientText={
                config.iconPack === "green"
                  ? t("title_welcome_step3_gradient_green")
                  : config.iconPack === "pink"
                    ? t("title_welcome_step3_gradient_pink")
                    : t("title_welcome_step3_gradient_grey")
              }
              layout={config.layout}
              iconPack={config.iconPack}
              step={config.step}
              ref={containerRef}
              image={
                <Box className={styles.iconPackContainer}>
                  <Box
                    className={`${styles.iconOption} ${
                      styles[
                        `icon${
                          config.iconPositions.green.charAt(0).toUpperCase() +
                          config.iconPositions.green.slice(1)
                        }`
                      ]
                    } ${
                      config.iconPack === "green"
                        ? mode === "dark"
                          ? styles.selectedIconGreen
                          : styles.selectedIconGreenLight
                        : ""
                    }`}
                    onClick={() => handleIconSelect("green")}
                  >
                    <Image
                      src={
                        mode === "dark"
                          ? "/assets/image/greenpack.svg"
                          : "/assets/image/greenpack-light.svg"
                      }
                      alt="Green Icon Pack"
                      width={200}
                      height={200}
                    />
                  </Box>
                  <Box
                    className={`${styles.iconOption} ${
                      styles[
                        `icon${
                          config.iconPositions.pink.charAt(0).toUpperCase() +
                          config.iconPositions.pink.slice(1)
                        }`
                      ]
                    } ${
                      config.iconPack === "pink"
                        ? mode === "dark"
                          ? styles.selectedIconPink
                          : styles.selectedIconPinkLight
                        : ""
                    }`}
                    onClick={() => handleIconSelect("pink")}
                  >
                    <Image
                      src={
                        mode === "dark"
                          ? "/assets/image/pinkpack.png"
                          : "/assets/image/pinkpack-light.png"
                      }
                      alt="Pink Icon Pack"
                      width={200}
                      height={200}
                    />
                  </Box>
                  <Box
                    className={`${styles.iconOption} ${
                      styles[
                        `icon${
                          config.iconPositions.grey.charAt(0).toUpperCase() +
                          config.iconPositions.grey.slice(1)
                        }`
                      ]
                    } ${
                      config.iconPack === "grey"
                        ? mode === "dark"
                          ? styles.selectedIconGrey
                          : styles.selectedIconGreyLight
                        : ""
                    }`}
                    onClick={() => handleIconSelect("grey")}
                  >
                    <Image
                      src={
                        mode === "dark"
                          ? "/assets/image/greypack.svg"
                          : "/assets/image/greypack-light.svg"
                      }
                      alt="Grey Icon Pack"
                      width={200}
                      height={200}
                    />
                  </Box>
                </Box>
              }
            />
          </Slide>
        ) : (
          <Slide
            key={`step-${config.step}`}
            in={config.step === 4}
            direction={slideDirection}
          >
            <Box className={styles.contentWrapperLoading}>
              <Box
                className={styles.titleLoading}
                dangerouslySetInnerHTML={{ __html: t("title_welcome_step4") }}
              />
              <Box className={styles.gearWrapper}>
                <Image
                  src="/assets/image/gear1.svg"
                  alt="gear1"
                  width={167}
                  height={167}
                  className={styles.animationGear1}
                />
                <Image
                  src="/assets/image/gear2.svg"
                  alt="gear2"
                  width={63}
                  height={63}
                  className={styles.animationGear2}
                />
                <Image
                  src="/assets/image/gear3.svg"
                  alt="gear3"
                  width={83}
                  height={83}
                  className={styles.animationGear3}
                />
              </Box>

              <Box className={styles.listLoading}>
                <Box className={styles.itemLoading}>
                  <span className={styles.loadingCheck}>
                    {!loadingStates[0] ? (
                      <Image
                        src="/assets/image/loading-check.gif"
                        alt="loading"
                        width={36}
                        height={36}
                        unoptimized
                      />
                    ) : (
                      <Zoom in={loadingStates[0]}>
                        <Box className={styles.checkCircle}>
                          <CheckCircleIcon
                            color="success"
                            width={20}
                            height={20}
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          />
                        </Box>
                      </Zoom>
                    )}
                  </span>
                  {t("title_welcome_step4_loading1")}
                </Box>
                <Box className={styles.itemLoading}>
                  <span className={styles.loadingCheck}>
                    {!loadingStates[1] ? (
                      <Image
                        src="/assets/image/loading-check.gif"
                        alt="loading"
                        width={36}
                        height={36}
                        unoptimized
                      />
                    ) : (
                      <Zoom in={loadingStates[0]}>
                        <Box className={styles.checkCircle}>
                          <CheckCircleIcon
                            color="success"
                            width={20}
                            height={20}
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          />
                        </Box>
                      </Zoom>
                    )}
                  </span>
                  {t("title_welcome_step4_loading2")}
                </Box>
                <Box className={styles.itemLoading}>
                  <span className={styles.loadingCheck}>
                    {!loadingStates[2] ? (
                      <Image
                        src="/assets/image/loading-check.gif"
                        alt="loading"
                        width={36}
                        height={36}
                        unoptimized
                      />
                    ) : (
                      <Zoom in={loadingStates[0]}>
                        <Box className={styles.checkCircle}>
                          <CheckCircleIcon
                            color="success"
                            width={20}
                            height={20}
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          />
                        </Box>
                      </Zoom>
                    )}
                  </span>
                  {t("title_welcome_step4_loading3")}
                </Box>
              </Box>
            </Box>
          </Slide>
        )}

        {/* Footer */}
        {config.step <= 3 && (
          <Box
            sx={{
              backgroundColor: mode === "dark" ? "#1A1D1F" : "#fff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "50px",
              padding: "36px 20px 20px 20px",
            }}
          >
            {config.step === 1 ? (
              <Box className={styles.spacer}></Box>
            ) : (
              <Button
                variant="secondary"
                size="xlarge"
                startIcon={
                  <Image
                    src="/assets/icon/arrow-left.svg"
                    alt="arrow-left"
                    width={24}
                    height={24}
                    style={{
                      filter:
                        mode === "dark"
                          ? `brightness(0) invert(1)`
                          : `brightness(0) saturate(100%) invert(${muiTheme.palette?.customBase?.base60})`,
                    }}
                  />
                }
                sx={{
                  width: "145px",
                  borderRadius: 5,
                  textTransform: "none",
                }}
                onClick={handleBack}
              >
                Quay lại
              </Button>
            )}
            <LinearProgress
              variant="determinate"
              value={Math.min((config.step * 100) / 3, 100)}
              sx={(theme) => ({
                width: "210px",
                height: "7px",
                borderRadius: "10px",
                backgroundColor: theme.palette.customSupport?.greendefault03,
                "& .MuiLinearProgress-bar1": {
                  backgroundColor: "#1AAF74",
                },
              })}
            />
            <Button
              variant="primary"
              size="xlarge"
              endIcon={
                <Image
                  src="/assets/icon/arrow-right.svg"
                  alt="arrow-right"
                  width={24}
                  height={24}
                />
              }
              sx={{
                width: "145px",
                borderRadius: 5,
                textTransform: "none",
              }}
              onClick={handleNext}
            >
              {config.step === 3 ? "Xong" : "Tiếp theo"}
            </Button>
          </Box>
        )}
      </DialogContent>
      {/* <ToastMessage
        severity="error"
        content="Lỗi khi lưu cài đặt!"
        open={openToast}
        onClose={() => setOpenToast(false)}
      /> */}
    </Dialog>
  );
};

export default Welcome;
