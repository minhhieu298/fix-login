import { Box, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useCustomLanguage } from "@/hooks/useCustomLanguage";
import { useCustomTheme } from "@/hooks/useCustomTheme";
import { settingAction } from "@/store/reducers/setting.reducer";
import { handleFolderMenuIcon } from "@/utils";

import { allIcon } from "../constant";
import styles from "../editMenuIcons.module.css";
import { IMenuBarIcon } from "../interface";

const ResultComponent: React.FC<{
  value: string;
  scrollRef: React.RefObject<HTMLDivElement>;
}> = ({ value, scrollRef }) => {
  const { t } = useCustomLanguage();
  const dispatch = useDispatch();
  const { mode } = useCustomTheme();
  const settingInfo = useSelector(
    (state: {
      settingReducer: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setting: any;
      };
    }) => state.settingReducer.setting
  );

  const defaultMenu = useSelector(
    (state: { settingReducer: { defaultMenu: IMenuBarIcon[] } }) =>
      state.settingReducer.defaultMenu
  );

  const arrayIcon = settingInfo
    ? !Object.keys(settingInfo).includes("isDefaultMenu") ||
      settingInfo.isDefaultMenu
      ? defaultMenu
      : settingInfo?.menuBarIcon
    : defaultMenu;

  const filterIcon: IMenuBarIcon[] =
    [...Object.values(allIcon).flat()].filter(
      (item) => !arrayIcon?.some((icon: string) => icon === item.id)
    ) || [];

  // Hàm normalize text để loại bỏ dấu
  const normalizeText = (text: string) => {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  const result =
    filterIcon.filter((icon) =>
      normalizeText(t(icon.name)).includes(normalizeText(value))
    ) || [];

  const handleAddIcon = (id: string) => {
    const data = {
      ...settingInfo,
      isDefaultMenu: false,
      menuBarIcon: [...arrayIcon, id],
    };
    dispatch(
      settingAction.postSettingAction({ Setting: JSON.stringify(data) })
    );
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  };

  return (
    <Box
      sx={(theme) => ({
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        padding: "8px 0px 12px 12px",
        borderRadius: "8px",
        ...theme.applyStyles("dark", {
          background: theme.palette.customBase?.base80,
        }),
        ...theme.applyStyles("light", {
          background: theme.palette.customBase?.baseWhite,
        }),
      })}
    >
      <Typography variant="body14-B21">
        {t("text_result")} ({result.length})
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          columnGap: "68px",
          rowGap: "24px",
          px: "24px",
        }}
      >
        {result.length > 0 ? (
          result.map((icon) => (
            <Box
              sx={{
                width: "50px",
              }}
              key={icon.id}
              className={styles.iconContainerGrid}
            >
              <Box sx={{ position: "relative" }}>
                <Image
                  src="/assets/icon/plus.svg"
                  alt="add-icon"
                  width={20}
                  height={20}
                  className={styles.addIcon}
                  onClick={() => handleAddIcon(icon.id)}
                />
                <IconButton
                  sx={{ padding: 0 }}
                  onClick={() => handleAddIcon(icon.id)}
                >
                  <Image
                    src={`/assets/${handleFolderMenuIcon(
                      settingInfo?.iconPack,
                      settingInfo?.theme
                    )}/${icon.path}`}
                    alt={icon.id}
                    width={42}
                    height={42}
                  />
                </IconButton>
              </Box>
              <Typography
                variant="sub12-S18"
                sx={(theme) => ({
                  width: "76px",
                  textAlign: "center",
                  lineHeight: "18px",
                  maxHeight: "50px",
                  display: "block",
                  color: theme.palette.customBase?.base80,
                  ...theme.applyStyles("dark", {
                    color: theme.palette.customBase?.base20,
                  }),
                })}
              >
                {t(icon.name)}
              </Typography>
            </Box>
          ))
        ) : (
          <Box className={styles.noResultContainer}>
            <Image
              src={
                mode === "dark"
                  ? "/assets/icon/Hub_signin.svg"
                  : "/assets/image/no_data_light.svg"
              }
              alt="MyHub"
              width={61.87}
              height={40}
            />
            <Typography
              variant="body16-B24"
              sx={(theme) => ({
                color: theme.palette.customBase?.base40,
              })}
            >
              {t("text_no_result")}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export const Result = memo(ResultComponent);
