import "dayjs/locale/en";
import "dayjs/locale/vi";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Stack, styled } from "@mui/material";
import type { DatePickerProps } from "antd";
import { DatePicker } from "antd";
import en from "antd/es/date-picker/locale/en_US";
import vn from "antd/es/date-picker/locale/vi_VN";
import dayjs, { Dayjs } from "dayjs";
import Image from "next/image";

import { useCustomLanguage } from "@/hooks/useCustomLanguage";

import { ICustomDatePickker } from "./types";

const StyleDatePickker = styled(Stack)<{ width?: number }>(
  ({ theme, width }) => ({
    ...(width && {
      width: width,
    }),
    ".ant-picker.ant-picker-outlined": {
      border: 0,
      background: "#EFEFEF",
      color: "#1A1D1F",
      borderRadius: 8,
      padding: "7px 8px 7px 12px",
      "&.ant-picker-focused": {
        outlineWidth: "thin",
        outlineColor: theme.palette.customPrimary?.primary50,
        outlineStyle: "solid",
      },
      "&:hover": {
        outlineWidth: "thin",
        outlineColor: theme.palette.customPrimary?.primary50,
        outlineStyle: "solid",
      },
      ...theme.applyStyles("dark", {
        background: "#2C3137",
        color: "#EFEFEF",
      }),
    },
    ".ant-picker-input": {
      input: {
        fontSize: "12px",
        fontWeight: 500,
        lineHeight: 1.5,
        fontFamily: "inherit",
      },
      "&.ant-picker-input-placeholder": {
        input: {
          color: "#1A1D1F",
          ...theme.applyStyles("dark", {
            color: "#EFEFEF",
          }),
        },
      },
    },
    ".ant-picker-dropdown": {
      fontFamily: "inherit",
      ".ant-picker-panel-container": {
        padding: 16,
        background: "#EFEFEF",
        ...theme.applyStyles("dark", {
          background: "#212427",
        }),
      },
      ".ant-picker-panel-layout": {
        ".ant-picker-date-panel, .ant-picker-month-panel, .ant-picker-year-panel":
          {
            width: 378,
            gap: 12,
          },
      },
      ".ant-picker-header": {
        alignItems: "center",
        padding: 0,
        borderBottom: 0,

        ".ant-picker-header-next-btn, .ant-picker-header-prev-btn": {
          width: 44,
          height: 44,
          display: "flex",
          justifyContents: "center",
          alignItems: "center",
          borderRadius: 100,
          background: "#EFEFEF",
          ...theme.applyStyles("dark", {
            background: "#2C3137",
          }),
        },
        ".ant-picker-header-view": {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "> button:not(:first-of-type)": {
            marginInlineStart: 26,
          },
          "> button": {
            textTransform: "capitalize",
            padding: "10px 12px",
            justifyContent: "flex-start",
            "&:hover": {
              outlineColor: theme.palette.customPrimary?.primary50,
              outlineWidth: "thin",
              outlineStyle: "solid",
              borderRadius: 8,
            },
            "&.ant-picker-month-btn": {
              minWidth: 107,
              // "&::after": {
              //   right: 10,
              // },
            },
            "&.ant-picker-year-btn": {
              // minWidth: 82,
              // "&::after": {
              //   right: 12,
              // },
            },
          },
        },
      },

      ".ant-picker-body": {
        padding: 0,
        ".ant-picker-content": {
          th: {
            height: 44,
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: 1.5,
            color: "#858B93",
            fontFamily: "inherit",
          },
          td: {
            height: 44,
            fontSize: "16px",
            fontWeight: 600,
            lineHeight: 1.5,
            padding: 0,
            fontFamily: "inherit",
            textTransform: "capitalize",
            "&.ant-picker-cell": {
              color: "rgba(17, 19, 21, 0.3)",
              borderRadius: 8,
              ...theme.applyStyles("dark", {
                color: "rgba(255, 255, 255, 0.3)",
              }),
              "&.ant-picker-cell-in-view": {
                color: "#1A1D1F",
                ...theme.applyStyles("dark", {
                  color: "#EFEFEF",
                }),
              },
              "&.ant-picker-cell-selected": {
                background: theme.palette.customPrimary?.primary50,

                ".ant-picker-cell-inner": {
                  background: "transparent",
                },
              },
              "&.ant-picker-cell-today": {
                ".ant-picker-cell-inner": {
                  "&::before": {
                    border: 0,
                  },
                },
              },
              "&:not(.ant-picker-cell-selected).ant-picker-cell-hover": {
                background: theme.palette.customSupport?.primary5003,
                color: theme.palette.customPrimary?.primary50,
              },
              "&.ant-picker-cell-disabled": {
                color: theme.palette.customBase?.base60,
                ...theme.applyStyles("dark", {
                  color: theme.palette.customBase?.base40,
                }),
              },
            },
          },
        },
      },

      ".ant-picker-month-btn, .ant-picker-year-btn": {
        fontSize: "20px",
        fontWeight: 600,
        lineHeight: 1.5,
        fontFamily: "inherit",
        color: "#1A1D1F",
        position: "relative",
        ...theme.applyStyles("dark", {
          color: "#EFEFEF",
        }),
        "&:hover": {
          color: "#1A1D1F",
          ...theme.applyStyles("dark", {
            color: "#EFEFEF",
          }),
        },
        "&::after": {
          position: "absolute",
          content: `""`,
          width: 8,
          height: 8,
          borderRadius: 2,
          background: theme.palette.customPrimary?.primary50,
          clipPath: "polygon(0 0, 100% 0, 100% 100%)",
          transform: "translateY(-50%) rotate(90deg)",
          bottom: 15,
          right: 0,
        },
      },

      ".ant-picker-footer": {
        display: "none",
      },

      ".ant-picker-month-panel, .ant-picker-year-panel, .ant-picker-decade-panel":
        {
          ".ant-picker-cell-inner": {
            padding: 0,
            whiteSpace: "nowrap",
          },
          ".ant-picker-content": {
            height: "auto",
          },
        },
    },
    ".ant-picker-month-panel-container": {
      ".ant-picker-year-btn": {
        "&::after": {
          top: 18,
          transform: "translatey(-50%) rotate(0deg)",
        },
      },
    },
    ".ant-picker-year-panel, .ant-picker-month-panel, .ant-picker-decade-panel":
      {
        ".ant-picker-decade-btn": {
          fontSize: "20px",
          fontWeight: 600,
          lineHeight: 1.5,
          fontFamily: "inherit",
          color: "#1A1D1F",
          ...theme.applyStyles("dark", {
            color: "#EFEFEF",
          }),
        },
        ".ant-picker-header-view >button:hover": {
          color: "#1A1D1F",
          ...theme.applyStyles("dark", {
            color: "#EFEFEF",
          }),
        },
        ".ant-picker-content": {
          td: {
            borderRadius: 8,
            "&.ant-picker-cell-hover": {
              ".ant-picker-cell-inner": {
                background: "transparent !important",
              },
            },
            "&.ant-picker-cell-selected": {
              background: "transparent !important",
              outlineColor: theme.palette.customPrimary?.primary50,
              outlineWidth: "thin",
              outlineStyle: "solid",
              ".ant-picker-cell-inner": {
                background: "transparent",
              },
            },
            "&:not(.ant-picker-cell-selected).ant-picker-cell-hover": {
              background: "transparent !important",
              color: theme.palette.customPrimary?.primary50,
            },
          },
        },
      },
    ".ant-picker-decade-panel-container": {
      ".ant-picker-header-view": {
        fontSize: "20px",
        fontWeight: 600,
        lineHeight: 1.5,
        fontFamily: "inherit",
        color: "#1A1D1F",
        ...theme.applyStyles("dark", {
          color: "#EFEFEF",
        }),
      },
    },
    ".ant-picker-header-next-btn": {
      transform: "rotate(180deg)",
    },
    ".ant-picker-cell.ant-picker-cell-in-view:not(.ant-picker-cell-selected):has(div.ant-picker-cell-today)":
      {
        outlineColor: theme.palette.customPrimary?.primary50,
        outlineWidth: "thin",
        outlineStyle: "solid",
        borderRadius: 8,
      },

    /* 2. Ô được chọn đồng thời là hôm nay: bỏ border */
    ".ant-picker-cell.ant-picker-cell-in-view.ant-picker-cell-today:not(.ant-picker-cell-selected):has(div.ant-picker-cell-today)":
      {
        outlineColor: theme.palette.customPrimary?.primary50,
        outlineWidth: "thin",
        outlineStyle: "solid",
        borderRadius: 8,
      },
  })
);

const CustomDatePickker = ({ width, value, onChange }: ICustomDatePickker) => {
  const buddhistLocaleVN: typeof vn = {
    ...vn,
    lang: {
      ...vn.lang,
      monthFormat: "MMMM",
    },
  };
  const buddhistLocaleEN: typeof en = {
    ...en,
    lang: {
      ...en.lang,
      monthFormat: "MMMM",
    },
  };
  const { language } = useCustomLanguage();
  const currentYear = dayjs().year();

  const cellRender: DatePickerProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type !== "date") {
      return info.originNode;
    }

    if (typeof current === "number" || typeof current === "string") {
      return <div className="ant-picker-cell-inner">{current}</div>;
    }
    return (
      <div
        className={`ant-picker-cell-inner${
          current.format("DD/MM/YYYY") === info.today.format("DD/MM/YYYY")
            ? " ant-picker-cell-today"
            : ""
        }`}
      >
        {current.date()}
      </div>
    );
  };

  const handleChange: DatePickerProps["onChange"] = (date) => {
    onChange(date);
  };

  return (
    <StyleDatePickker width={width}>
      <DatePicker
        locale={language === "en" ? buddhistLocaleEN : buddhistLocaleVN}
        value={value}
        format="DD/MM/YYYY"
        allowClear={false}
        onChange={handleChange}
        suffixIcon={
          <CalendarTodayIcon sx={{ color: "#9e9e9e", fontSize: "16px" }} />
        }
        getPopupContainer={(triggerNode) =>
          triggerNode.parentNode as HTMLElement
        }
        nextIcon={
          <Image
            src="/assets/icon/icon_arrow_left.svg"
            alt=""
            width={20}
            height={20}
          />
        }
        prevIcon={
          <Image
            src="/assets/icon/icon_arrow_left.svg"
            alt=""
            width={20}
            height={20}
          />
        }
        // superNextIcon={<></>}
        // superPrevIcon={<></>}
        cellRender={cellRender}
        disabledDate={(date) =>
          // date có thể là null, nên cần kiểm tra
          !!date && date.year() > currentYear
        }
      />
    </StyleDatePickker>
  );
};

export default CustomDatePickker;
