import {
  Box,
  Button,
  Divider,
  DividerOwnProps,
  IconButton,
  Radio,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { useCustomLanguage } from "@/hooks/useCustomLanguage";
import { useCustomTheme } from "@/hooks/useCustomTheme";
import { settingAction } from "@/store/reducers/setting.reducer";

import EditMenuIcons from "../EditMenuIcons";
import { IFormSetting } from "../interface";
import { configlanguage, layoutTheme } from "./constants";
import style from "./display.module.scss";

const Display = ({ fullScreen }: { fullScreen: boolean }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { toggleTheme } = useCustomTheme();
  const { changeLanguage, t } = useCustomLanguage();
  const { control, reset } = useForm({
    defaultValues: {
      theme: "",
      language: "",
      position: "",
    },
  });

  const settingInfo = useSelector(
    (state: {
      settingReducer: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setting: any;
      };
    }) => state.settingReducer.setting
  );

  //thay đổi sáng tối
  const handleChangeTheme = (newTheme: "light" | "dark") => {
    toggleTheme(newTheme);
  };
  //thay đổi ngôn ngữ
  const handleLanguage = (lang: "vi" | "en") => {
    changeLanguage(lang);
  };

  const handleSwitchTabMenuIcon = () => {
    router.push(
      {
        pathname: router.asPath.split("?")[0],
        query: {
          ...router.query,
          setting: "display",
          screen: "edit-menu",
        },
      },
      undefined,
      { shallow: true }
    );
  };

  useEffect(() => {
    reset({
      theme: settingInfo?.theme,
      position: settingInfo?.position,
      language: settingInfo?.language,
    });
  }, [settingInfo]);

  const handleUpdateSettingTheme = (obj: {
    theme?: string;
    position?: string;
    language?: string;
  }) => {
    if (
      settingInfo?.theme === obj.theme ||
      settingInfo?.position === obj.position ||
      settingInfo?.language === obj.language
    ) {
      return;
    }
    handlePostSetting({
      ...settingInfo,
      ...obj,
    });
  };

  const handlePostSetting = async (data: IFormSetting) => {
    dispatch(
      settingAction.postSettingAction({ Setting: JSON.stringify(data) })
    );
  };

  const renderDivBorder = (type: DividerOwnProps["variant"] = "fullWidth") => (
    <Divider
      variant={type}
      sx={(theme) => ({
        border: 0,
        width: "100%",
        height: "0.5px",
        background: theme.palette.customAdditional?.base4003,
        "&.MuiDivider-inset": {
          marginLeft: 2,
          marginRight: "5px",
        },
      })}
    />
  );

  const renderContent = () => {
    switch (router.query.screen) {
      case "edit-menu":
        return <EditMenuIcons fullScreen={fullScreen} />;
      default:
        return (
          <>
            <Head>
              <title>Eztrade - Giao diện</title>
            </Head>
            <Box className={style.display_container}>
              {/* Thay đổi theme sáng tối */}
              <Box className={style.display_box}>
                <Typography
                  variant="body14-B21"
                  sx={(theme) => ({
                    mb: "16px",
                    color: theme.palette.customBase?.base80,
                    ...theme.applyStyles("dark", {
                      color: theme.palette.customBase?.base20,
                    }),
                  })}
                >
                  {t("text_zoom_display")}
                </Typography>
                <Box
                  className={style.display_box}
                  sx={(theme) => ({
                    borderRadius: 3,
                    background: theme.palette.customBase?.baseWhite,
                    ...theme.applyStyles("dark", {
                      background: theme.palette.customBase?.base80,
                    }),
                  })}
                >
                  {layoutTheme.map((item, index) => (
                    <Fragment key={item.label}>
                      <Box
                        className={style.display_box_item}
                        sx={{ cursor: "pointer" }}
                        onClick={() => {
                          handleChangeTheme(item.value as "light" | "dark");
                          handleUpdateSettingTheme({ theme: item.value });
                        }}
                      >
                        <Typography
                          variant="body14-M21"
                          sx={(theme) => ({
                            color: theme.palette.customBase?.base80,
                            ...theme.applyStyles("dark", {
                              color: theme.palette.customBase?.base20,
                            }),
                          })}
                        >
                          {t(`${item.label}`)}
                        </Typography>
                        <Controller
                          control={control}
                          name="theme"
                          render={({ field }) => (
                            <Radio
                              size="small"
                              checked={field.value === item.value}
                              onChange={() => {
                                field.onChange(item.value);
                                handleChangeTheme(
                                  item.value as "light" | "dark"
                                );
                                handleUpdateSettingTheme({ theme: item.value });
                              }}
                            />
                          )}
                        />
                      </Box>
                      <Box sx={{ px: "16px" }}>
                        {index === 0 && renderDivBorder()}
                      </Box>
                    </Fragment>
                  ))}
                </Box>
              </Box>
              {renderDivBorder()}
              {/* Thay đổi vị trí menu bar */}
              <Box className={style.display_box}>
                <Box
                  className={style.display_box_item}
                  sx={{ padding: "0px !important" }}
                >
                  <Typography
                    variant="body14-B21"
                    sx={(theme) => ({
                      color: theme.palette.customBase?.base80,
                      ...theme.applyStyles("dark", {
                        color: theme.palette.customBase?.base20,
                      }),
                    })}
                  >
                    {t("text_locale_menu")}
                  </Typography>
                  <Button
                    size="xsmall"
                    variant="ghostPrimary"
                    sx={(theme) => ({
                      background: theme.palette.customSupport?.greendefault01,
                      textTransform: "unset",
                      fontSize: "12px",
                      fontWeight: 500,
                    })}
                    onClick={handleSwitchTabMenuIcon}
                  >
                    {t("text_edit_menuicon")}
                  </Button>
                </Box>
                {/* <Controller
                  control={control}
                  name="position"
                  render={({ field }) => (
                    <Grid2 container columnSpacing={3}>
                      {menuPosition(field.value).map((item) => (
                        <Grid2
                          key={item.label}
                          size={3}
                          className={style.display_menu_bar}
                          onClick={() => {
                            field.onChange(item.value);
                            handleUpdateSettingTheme({
                              position: item.value,
                            });
                          }}
                        >
                          {item.image}
                          <FormControlLabel
                            sx={{ marginRight: 0 }}
                            value={item.value}
                            control={
                              <Radio
                                size="small"
                                checked={field.value === item.value}
                                onChange={() => {
                                  field.onChange(item.value);
                                  handleUpdateSettingTheme({
                                    position: item.value,
                                  });
                                }}
                              />
                            }
                            label={
                              <Typography
                                variant="body14-M21"
                                ml={2}
                                sx={(theme) => ({
                                  color: theme.palette.customBase?.base80,
                                  ...theme.applyStyles("dark", {
                                    color: theme.palette.customBase?.base20,
                                  }),
                                })}
                              >
                                {t(`${item.label}`)}
                              </Typography>
                            }
                            labelPlacement="end"
                          />
                        </Grid2>
                      ))}
                    </Grid2>
                  )}
                /> */}
              </Box>
              {renderDivBorder()}
              {/* Thay đổi ngôn ngữ */}
              <Box className={style.display_box}>
                <Typography
                  variant="body14-B21"
                  sx={(theme) => ({
                    mb: "16px",
                    color: theme.palette.customBase?.base80,
                    ...theme.applyStyles("dark", {
                      color: theme.palette.customBase?.base20,
                    }),
                  })}
                >
                  {t("text_lang")}
                </Typography>
                <Box
                  className={style.display_box}
                  sx={(theme) => ({
                    borderRadius: 3,
                    background: theme.palette.customBase?.baseWhite,
                    ...theme.applyStyles("dark", {
                      background: theme.palette.customBase?.base80,
                    }),
                  })}
                >
                  {configlanguage.map((item, index) => (
                    <Fragment key={item.label}>
                      <Box
                        className={style.display_box_item}
                        sx={{ cursor: "pointer" }}
                        onClick={() => {
                          handleLanguage(item.value as "vi" | "en");
                          handleUpdateSettingTheme({
                            language: item.value,
                          });
                        }}
                      >
                        <Controller
                          control={control}
                          name="language"
                          render={({ field }) => (
                            <>
                              <Box
                                className={style.display_box_lang}
                                onClick={() => {
                                  field.onChange(item.value);
                                  handleLanguage(item.value as "vi" | "en");
                                  handleUpdateSettingTheme({
                                    language: item.value,
                                  });
                                }}
                                sx={(theme) => ({
                                  cursor: "pointer",
                                  color: theme.palette.customBase?.base80,
                                  ...theme.applyStyles("dark", {
                                    color: theme.palette.customBase?.base20,
                                  }),
                                })}
                              >
                                <IconButton size="regular">
                                  {item.image}
                                </IconButton>
                                <Typography variant="body14-M21">
                                  {item.label}
                                </Typography>
                              </Box>
                              <Radio
                                size="small"
                                checked={field.value === item.value}
                                onChange={() => {
                                  field.onChange(item.value);
                                  handleLanguage(item.value as "vi" | "en");
                                  handleUpdateSettingTheme({
                                    language: item.value,
                                  });
                                }}
                              />
                            </>
                          )}
                        />
                      </Box>
                      <Box sx={{ pr: 4, pl: 12 }}>
                        {index === 0 && renderDivBorder()}
                      </Box>
                    </Fragment>
                  ))}
                </Box>
              </Box>
            </Box>
          </>
        );
    }
  };

  return <>{renderContent()}</>;
};

export default Display;
