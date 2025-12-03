import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  restrictToHorizontalAxis,
  restrictToParentElement,
} from "@dnd-kit/modifiers";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { Box, Typography } from "@mui/material";
import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useCustomLanguage } from "@/hooks/useCustomLanguage";
import { settingAction } from "@/store/reducers/setting.reducer";

import { allIcon } from "../constant";
import styles from "../editMenuIcons.module.css";
import { IMenuBarIcon } from "../interface";
import { MenuBarIcon } from "./MenuBarIcon";

const HeaderMenuBarComponent: React.FC<{
  scrollRef: React.RefObject<HTMLDivElement>;
  fullScreen: boolean;
}> = ({ scrollRef, fullScreen }) => {
  const { t } = useCustomLanguage();
  const dispatch = useDispatch();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const settingInfo = useSelector(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state: { settingReducer: { setting: any } }) =>
      state.settingReducer.setting
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

  const showIcon = arrayIcon.reduce((acc: IMenuBarIcon[], id: string) => {
    const icon = [...Object.values(allIcon).flat()].find(
      (icon) => icon.id === id
    );
    if (icon) acc.push(icon);
    return acc;
  }, []);

  // const handleToggleSetting = (key: string) => {
  //   const data = {
  //     ...settingInfo,
  //     [key]: settingInfo[key] !== undefined ? !settingInfo[key] : false,
  //   };
  //   dispatch(
  //     settingAction.postSettingAction({ Setting: JSON.stringify(data) })
  //   );
  // };

  const handleRemoveIcon = (id: string) => {
    const data = {
      ...settingInfo,
      isDefaultMenu: false,
      menuBarIcon: arrayIcon.filter((icon: string) => icon !== id),
    };
    dispatch(
      settingAction.postSettingAction({ Setting: JSON.stringify(data) })
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = arrayIcon.indexOf(active.id);
      const newIndex = arrayIcon.indexOf(over.id);

      const newMenuBarIcons = arrayMove(arrayIcon, oldIndex, newIndex);

      const data = {
        ...settingInfo,
        isDefaultMenu: false,
        menuBarIcon: newMenuBarIcons,
      };
      dispatch(settingAction.setDataSetting(data));
      dispatch(
        settingAction.postSettingAction({ Setting: JSON.stringify(data) })
      );
    }
  };

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const scrollAmount = event.deltaY;
      const scrollContainer = scrollRef.current;

      if (scrollContainer) {
        scrollContainer.scrollLeft += scrollAmount;
      }
    };

    const scrollContainer = scrollRef.current;

    if (scrollContainer) {
      scrollContainer.addEventListener("wheel", handleWheel, {
        passive: false,
      });
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  const renderMenuBarIcons = () => {
    return showIcon.map((icon: IMenuBarIcon) => (
      <MenuBarIcon
        key={icon.id}
        id={icon.id}
        icon={icon}
        showTextMenuBar={
          settingInfo?.showTextMenuBar ||
          settingInfo?.showTextMenuBar === undefined
        }
        onRemove={handleRemoveIcon}
        iconPack={settingInfo?.iconPack}
        theme={settingInfo?.theme}
        arrayIcon={arrayIcon}
      />
    ));
  };

  const countEmptyIcon =
    settingInfo?.menuBarIcon?.length > 0 &&
    settingInfo?.menuBarIcon?.length < 10
      ? 10 - showIcon.length
      : 1;

  const renderEmptyIcons = () => {
    return [...Array(countEmptyIcon)].map((_, index) => (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: settingInfo?.showTextMenuBar ? "0px" : "10px 16px",
          flexDirection: "column",
          gap: "4px",
          position: "relative",
        }}
        key={index}
      >
        <Box
          sx={(theme) => ({
            width: settingInfo?.showTextMenuBar ? "20px" : "24px",
            height: settingInfo?.showTextMenuBar ? "20px" : "24px",
            borderRadius: "6px",
            borderWidth: "0.77px",
            borderStyle: "dashed",
            borderColor: theme.palette.customBase?.base40,
          })}
        />
        {settingInfo?.showTextMenuBar && (
          <Typography
            variant="sub12-M18"
            sx={(theme) => ({
              textAlign: "center",
              color: theme.palette.customBase?.base40,
            })}
            className={styles.truncate}
          >
            {t("text_add")}
          </Typography>
        )}
      </Box>
    ));
  };

  return (
    <Box className={styles.menuBarContainer}>
      <Box className={styles.flexColumn}>
        {/* Có chữ */}
        <Box className={styles.flexRow}>
          {/* <Box className={styles.labelLeft}>
            <Typography
              variant="body14-M21"
              sx={{ color: mode === "light" ? "black" : "#EFEFEF" }}
            >
              {t("label_switch_edit_icon")}
            </Typography>
            <BaseSwitch
              checked={
                settingInfo?.showTextMenuBar !== undefined
                  ? settingInfo.showTextMenuBar
                  : true
              }
              onChange={() => handleToggleSetting("showTextMenuBar")}
            />
          </Box> */}
          <Box
            className={styles.flexRowEnd}
            sx={{
              gap: fullScreen ? "120px" : "12px",
              "@media (min-width: 1921px)": {
                gap: fullScreen ? "120px" : "12px",
              },
              "@media (max-width: 1920px)": {
                gap: fullScreen ? "120px" : "12px",
              },
              "@media (max-width: 1440px)": {
                gap: fullScreen ? "50px" : "12px",
              },
              "@media (max-width: 1280px)": {
                gap: fullScreen ? "40px" : "12px",
              },
              "@media (max-width: 1024px)": {
                gap: "12px",
              },
            }}
            ref={scrollRef}
          >
            {/* <Box sx={{ padding: "8px 0px 4px 0px" }}>
              <MenuBarIcon
                key="home"
                id="home"
                icon={{
                  id: "home",
                  name: "text_home",
                  path: "ic_chuyen_tien_nn.svg",
                }}
                showTextMenuBar={
                  settingInfo?.showTextMenuBar ||
                  settingInfo?.showTextMenuBar === undefined
                }
                onRemove={handleRemoveIcon}
                iconPack={settingInfo?.iconPack}
                theme={settingInfo?.theme}
                arrayIcon={arrayIcon}
              />
            </Box> */}
            <Box
              sx={{
                padding: "8px 0px 4px 0px",
                display: "flex",
                alignItems: "center",
                gap: fullScreen ? "120px" : "12px",
                "@media (min-width: 1921px)": {
                  gap: fullScreen ? "120px" : "12px",
                },
                "@media (max-width: 1920px)": {
                  gap: fullScreen ? "120px" : "12px",
                },
                "@media (max-width: 1440px)": {
                  gap: fullScreen ? "50px" : "12px",
                },
                "@media (max-width: 1280px)": {
                  gap: fullScreen ? "40px" : "12px",
                },
                "@media (max-width: 1024px)": {
                  gap: "12px",
                },
              }}
            >
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToHorizontalAxis, restrictToParentElement]}
              >
                <SortableContext
                  items={showIcon.map((icon: IMenuBarIcon) => icon.id)}
                  strategy={horizontalListSortingStrategy}
                >
                  {renderMenuBarIcons()}
                </SortableContext>
              </DndContext>
              {renderEmptyIcons()}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export const HeaderMenuBar = memo(HeaderMenuBarComponent);
