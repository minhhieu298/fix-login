import "dayjs/locale/en";
import "dayjs/locale/vi";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Box, Button, Typography } from "@mui/material";
import { DatePicker } from "antd";
import type { RangePickerProps } from "antd/es/date-picker";
import locale from "antd/es/date-picker/locale/vi_VN";
import { Dayjs } from "dayjs";
import { PanelMode } from "rc-picker/lib/interface";
import { useState } from "react";

import { useCustomTheme } from "@/hooks/useCustomTheme";

import styles from "./index.module.css";
import { ICustomDateRangePicker } from "./types";

const { RangePicker } = DatePicker;

const DateRangePicker = ({
  fromDate,
  toDate,
  onClose,
  onSetTab,
  open,
  onChange,
  getPopupContainer,
}: ICustomDateRangePicker) => {
  const [value, setValue] = useState<[Dayjs, Dayjs] | null>([fromDate, toDate]);
  const [panelMode, setPanelMode] = useState<PanelMode>("date");
  const { mode } = useCustomTheme();

  const handleChange: RangePickerProps["onChange"] = (ranges) => {
    if (ranges?.[0] && ranges?.[1]) {
      setValue([ranges[0], ranges[1]]);
    } else {
      setValue(null);
    }
  };

  const handlePanelChange: RangePickerProps["onPanelChange"] = (
    _dates,
    mode
  ) => {
    if (Array.isArray(mode)) {
      setPanelMode(mode[0]);
    }
  };

  const renderExtraFooter = () => {
    return (
      <Box
        sx={(theme) => ({
          display: "flex",
          gap: "12px",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "12px",
          borderTop: `0.5px solid ${theme.palette.customAdditional?.base4003}`,
        })}
      >
        <Button
          variant="secondary"
          size="small"
          sx={{
            textTransform: "none",
            fontSize: "12px",
          }}
          onClick={() => {
            if (onClose) {
              onClose(false);
            }
            if (onSetTab) {
              onSetTab();
            }
          }}
        >
          Hủy
        </Button>
        <Button
          variant="primary"
          size="small"
          sx={{
            textTransform: "none",
            fontSize: "12px",
          }}
          onClick={() => {
            if (onChange) {
              onChange(value as [Dayjs, Dayjs]);
              if (onClose) {
                onClose(false);
              }
            }
          }}
        >
          Tìm kiếm
        </Button>
      </Box>
    );
  };

  return (
    <RangePicker
      getPopupContainer={getPopupContainer}
      open={open}
      styles={{
        root: {
          pointerEvents: "none",
          opacity: 0,
          position: "absolute",
          top: 0,
          right: 0,
          insetInlineEnd: 0,
        },
      }}
      locale={{
        ...locale,
        lang: {
          ...locale.lang,
          monthFormat: "MMMM",
        },
      }}
      value={value}
      onChange={handleChange}
      format="DD-MM-YYYY"
      allowClear={false}
      suffixIcon={<CalendarTodayIcon sx={{ color: "#9e9e9e" }} />}
      className={`${styles.rangePickerInput} ${
        mode === "light" ? styles.rangePickerInputLight : ""
      }`}
      classNames={{
        popup: {
          root: `${styles.rangePickerPopup} ${
            mode === "light" ? styles.rangePickerPopupLight : ""
          }`,
        },
      }}
      superNextIcon={
        <Box aria-label="next" className={styles.navigationIcon}>
          <NavigateNextIcon />
        </Box>
      }
      superPrevIcon={
        <Box aria-label="prev" className={styles.navigationIcon}>
          <NavigateBeforeIcon />
        </Box>
      }
      nextIcon={
        <Box aria-label="next" className={styles.navigationIcon}>
          <NavigateNextIcon />
        </Box>
      }
      prevIcon={
        <Box aria-label="prev" className={styles.navigationIcon}>
          <NavigateBeforeIcon />
        </Box>
      }
      disabledDate={(current) => {
        return current && current.valueOf() > Date.now();
      }}
      renderExtraFooter={() => panelMode === "date" && renderExtraFooter()}
      onPanelChange={handlePanelChange}
      panelRender={(originPanel) => (
        <Box className={styles.panelContainer}>
          {panelMode === "date" && (
            <Box className={styles.panelHeader}>
              <Typography
                variant="body14-S21"
                sx={(theme) => ({
                  color: theme.palette.customBase?.base80,
                  ...theme.applyStyles("dark", {
                    color: theme.palette.customBase?.base20,
                  }),
                })}
              >
                Từ ngày
              </Typography>
              <Typography
                variant="body14-S21"
                sx={(theme) => ({
                  color: theme.palette.customBase?.base80,
                  ...theme.applyStyles("dark", {
                    color: theme.palette.customBase?.base20,
                  }),
                })}
              >
                Đến ngày
              </Typography>
            </Box>
          )}
          {originPanel}
        </Box>
      )}
    />
  );
};

export default DateRangePicker;
