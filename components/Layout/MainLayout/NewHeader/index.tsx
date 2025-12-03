import { Box, useMediaQuery, useTheme } from "@mui/material";
import { memo } from "react";
import { useSelector } from "react-redux";

import {
  allIcon,
  defaultMenuIconNotLogin,
} from "../../Settings/EditMenuIcons/constant";
import { IMenuBarIcon } from "../../Settings/EditMenuIcons/interface";
import HeaderRight from "./HeaderRight";
import styles from "./index.module.css";
import SearchContainer from "./SearchContainer";
import SegementTab from "./Tabs/SegementTab";

const NewHeader = () => {
  const theme = useTheme();
  const ismd = useMediaQuery(theme.breakpoints.up(1440));
  const islg = useMediaQuery(theme.breakpoints.up(1910));
  const settingInfo = useSelector(
    (state: {
      settingReducer: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setting: any;
      };
    }) => state.settingReducer.setting
  );

  const defaultMenu = useSelector(
    (state: {
      settingReducer: {
        defaultMenu: string[];
      };
    }) => state.settingReducer.defaultMenu
  );

  const arrayIcon = settingInfo
    ? !Object.keys(settingInfo).includes("isDefaultMenu") ||
      settingInfo.isDefaultMenu
      ? defaultMenu
      : settingInfo?.menuBarIcon
    : defaultMenuIconNotLogin[islg ? "lg" : ismd ? "md" : "sm"];

  const showIcon = arrayIcon.reduce((acc: IMenuBarIcon[], id: string) => {
    const icon = [...Object.values(allIcon).flat()].find(
      (icon) => icon.id === id
    );
    if (icon) acc.push(icon);
    return acc;
  }, []);

  return (
    <Box className={styles.headerContainer}>
      <SearchContainer />
      <SegementTab size="large" listTabs={showIcon} />
      <HeaderRight />
    </Box>
  );
};

export default memo(NewHeader);
