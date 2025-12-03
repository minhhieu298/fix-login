import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  Popper,
  Tooltip,
  Typography,
} from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Image from "next/image";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";

import { useCustomLanguage } from "@/hooks/useCustomLanguage";
import { useCustomTheme } from "@/hooks/useCustomTheme";
import { WidgetPopperProps } from "@/interface/ui/DynamicDashboard/interface";
import styles from "@/styles/dynamicDashboard.module.css";

const WidgetPopper: React.FC<WidgetPopperProps> = ({
  anchorEl,
  open,
  handleClose,
  menuSectionsState,
  handleDragStart,
  handleClickItem,
  dragStartedRef,
}) => {
  const { t } = useCustomLanguage();
  const { mode } = useCustomTheme();
  const settingInfo = useSelector(
    (state: {
      settingReducer: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setting: any;
      };
    }) => state.settingReducer.setting
  );

  const wrapperRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const handleDragStartWithFlag = useCallback(
    (component: string, e: React.MouseEvent<HTMLDivElement>) => {
      dragStartedRef.current = true;
      handleDragStart(component, e);
    },
    [handleDragStart]
  );

  const handleClickAway = useCallback(() => {
    if (dragStartedRef.current) {
      dragStartedRef.current = false;
      return;
    }
    handleClose();
  }, [handleClose, dragStartedRef]);

  const handleToggleSection = useCallback((title: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  }, []);

  const initialOpenSections = useMemo(
    () =>
      menuSectionsState.reduce(
        (acc, section) => {
          acc[section.title] = true;
          return acc;
        },
        {} as { [key: string]: boolean }
      ),
    [menuSectionsState]
  );

  const [openSections, setOpenSections] = useState(initialOpenSections);

  useEffect(() => {
    const checkForScrollbar = () => {
      if (listRef.current && wrapperRef.current) {
        const hasScrollbar =
          listRef.current.scrollHeight > listRef.current.clientHeight;
        if (hasScrollbar) {
          wrapperRef.current.classList.add(styles.hasScrollbar);
        } else {
          wrapperRef.current.classList.remove(styles.hasScrollbar);
        }
      }
    };
    const timer = setTimeout(checkForScrollbar, 0);
    const mutationObserver = new MutationObserver(checkForScrollbar);
    if (listRef.current) {
      mutationObserver.observe(listRef.current, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true,
      });
    }
    const resizeObserver = new ResizeObserver(checkForScrollbar);
    if (listRef.current) {
      resizeObserver.observe(listRef.current);
      const collapseElements =
        listRef.current.querySelectorAll(".MuiCollapse-root");
      collapseElements.forEach((el) => {
        resizeObserver.observe(el as Element);
      });
    }
    const handleAnimationEnd = () => {
      checkForScrollbar();
    };
    if (listRef.current) {
      listRef.current.addEventListener("animationend", handleAnimationEnd);
      listRef.current.addEventListener("transitionend", handleAnimationEnd);
    }
    return () => {
      clearTimeout(timer);
      mutationObserver.disconnect();
      resizeObserver.disconnect();
      if (listRef.current) {
        listRef.current.removeEventListener("animationend", handleAnimationEnd);
        listRef.current.removeEventListener(
          "transitionend",
          handleAnimationEnd
        );
      }
    };
  }, [open, openSections]);
  useEffect(() => {
    if (open && listRef.current && wrapperRef.current) {
      const timer = setTimeout(() => {
        const hasScrollbar =
          listRef.current!.scrollHeight > listRef.current!.clientHeight;
        if (hasScrollbar) {
          wrapperRef.current!.classList.add(styles.hasScrollbar);
        } else {
          wrapperRef.current!.classList.remove(styles.hasScrollbar);
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [open]);

  useEffect(() => {
    const onMouseUp = () => {
      if (dragStartedRef.current) {
        dragStartedRef.current = false;
      }
    };
    window.addEventListener("mouseup", onMouseUp);
    return () => window.removeEventListener("mouseup", onMouseUp);
  }, []);

  return (
    <Popper
      anchorEl={anchorEl}
      open={open}
      placement={
        settingInfo?.position === "Left" ? "bottom-end" : "bottom-start"
      }
      sx={{
        zIndex: 1300,
      }}
      modifiers={[
        {
          name: "offset",
          options: {
            offset: settingInfo?.position === "Left" ? [-16, 0] : [16, 0],
          },
        },
      ]}
    >
      <ClickAwayListener onClickAway={handleClickAway}>
        <Box
          className={styles.popperContainer}
          sx={{
            background: (theme) =>
              theme.palette.mode === "dark"
                ? theme.palette.customBase?.base60
                : theme.palette.customBase?.base20,
          }}
        >
          <Box className={styles.popperHeader}>
            <Typography
              variant="heading18-B27"
              sx={{
                color: (theme) =>
                  theme.palette.mode === "dark"
                    ? theme.palette.customBase?.base20
                    : theme.palette.customBase?.base80,
              }}
            >
              {t("text_widget_list")}
            </Typography>
            <CloseIcon className={styles.closeIcon} onClick={handleClose} />
          </Box>

          <Box
            className={styles.scrollWrapper}
            sx={{
              height:
                settingInfo?.position === "Left" ||
                settingInfo?.position === "Right"
                  ? "calc(100vh - 160px)"
                  : settingInfo?.position === "Bottom"
                    ? "calc(100vh - 181px)"
                    : "calc(100vh - 137px)",
            }}
            ref={wrapperRef}
          >
            <List
              className={
                mode === "dark"
                  ? styles.popperItemContainer
                  : styles.popperItemContainerLight
              }
              ref={listRef}
            >
              {menuSectionsState?.map((section) => (
                <Box
                  key={section.title}
                  className={styles.sectionWrapper}
                  sx={{
                    background: (theme) =>
                      theme.palette.mode === "dark"
                        ? theme.palette.customBase?.base70
                        : theme.palette.customBase?.base10,
                  }}
                >
                  <ListItemButton
                    className={styles.sectionHeader}
                    sx={{
                      background: (theme) =>
                        theme.palette.mode === "dark"
                          ? theme.palette.customBase?.base70
                          : theme.palette.customBase?.base10,
                    }}
                    onClick={() => handleToggleSection(section.title)}
                  >
                    <Box className={styles.sectionTitle}>
                      <Box className={styles.sectionTitleLeft}>
                        <Image
                          src={`/assets/icon/${section.icon}.svg`}
                          alt=""
                          width={20}
                          height={20}
                        />
                        <Typography
                          variant="body14-B21"
                          sx={{
                            color: (theme) =>
                              theme.palette.mode === "dark"
                                ? theme.palette.customBase?.base20
                                : theme.palette.customBase?.base80,
                          }}
                        >
                          {t(section.title)}
                        </Typography>
                      </Box>
                      {openSections[section.title] ? (
                        <ArrowDropUpIcon
                          sx={{
                            width: 20,
                            height: 20,
                            color: (theme) => theme.palette.customBase?.base40,
                          }}
                        />
                      ) : (
                        <ArrowDropDownIcon
                          sx={{
                            width: 20,
                            height: 20,
                            color: (theme) => theme.palette.customBase?.base40,
                          }}
                        />
                      )}
                    </Box>
                  </ListItemButton>

                  <Collapse in={openSections[section.title]} timeout="auto">
                    <List component="div" className={styles.collapseList}>
                      {section.items?.map((item) => {
                        const isMaxedOut = item.currentCount >= item.maxCount;
                        return (
                          <Tooltip
                            key={item.component}
                            title={
                              isMaxedOut
                                ? t("widget_max_count", {
                                    count: item.maxCount,
                                  })
                                : ""
                            }
                            arrow
                            placement="top"
                            followCursor
                            sx={{ cursor: "pointer" }}
                          >
                            <div>
                              <ListItemButton
                                className={`${styles.widgetItemButton} ${
                                  isMaxedOut ? styles.widgetItemDisabled : ""
                                }`}
                                onMouseDown={(e) =>
                                  !isMaxedOut &&
                                  handleDragStartWithFlag(item.component, e)
                                }
                                onClick={(e) =>
                                  !isMaxedOut &&
                                  handleClickItem(item.component, e)
                                }
                                disabled={isMaxedOut}
                                sx={{
                                  opacity: isMaxedOut ? 0.5 : 1,
                                  cursor: isMaxedOut
                                    ? "not-allowed"
                                    : "pointer",
                                  "&:hover": {
                                    backgroundColor:
                                      mode === "dark"
                                        ? "rgba(255, 255, 255, 0.05)"
                                        : "#EFEFEF",
                                  },
                                }}
                              >
                                <ListItemText
                                  primary={t(item.text)}
                                  className={styles.widgetItemText}
                                  sx={{
                                    color: (theme) =>
                                      theme.palette.mode === "dark"
                                        ? theme.palette.customBase?.base20
                                        : theme.palette.customBase?.base80,
                                  }}
                                />
                              </ListItemButton>
                            </div>
                          </Tooltip>
                        );
                      })}
                    </List>
                  </Collapse>
                </Box>
              ))}
            </List>
          </Box>
        </Box>
      </ClickAwayListener>
    </Popper>
  );
};

export default React.memo(WidgetPopper);
