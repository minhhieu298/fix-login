import {
  I18nLabel,
  IJsonModel,
  IJsonRowNode,
  ITabAttributes,
  Model,
} from "flexlayout-react";
import { TFunction } from "i18next";

import { IDataEzhub } from "@/interface/MyHub/interface";
import { generateDuplicateName, generateRandomName } from "@/utils";

import styles from "../../styles/dynamicDashboard.module.css";

// const SearchBoxModule = dynamic(() => impor'Customer/SearchBox'));

export const menuSections = [
  {
    title: "title_assets",
    icon: "taisan",
    items: [
      {
        text: "text_base_asset",
        component: "text_base_asset",
        maxCount: 1,
        currentCount: 0,
      },
      {
        text: "bcts_lai_lo",
        component: "bcts_lai_lo",
        maxCount: 1,
        currentCount: 0,
      },
      {
        text: "report_nav",
        component: "report_nav",
        maxCount: 1,
        currentCount: 0,
      },
    ],
  },
  {
    title: "title_price_board",
    icon: "giaodichtien",
    items: [
      {
        text: "text_chart_index",
        component: "text_chart_index",
        maxCount: 2,
        currentCount: 0,
      },
      {
        text: "text_index_table",
        component: "text_index_table",
        maxCount: 3,
        currentCount: 0,
      },
      {
        text: "text_price_table",
        component: "text_price_table",
        maxCount: 2,
        currentCount: 0,
      },
      {
        text: "text_mini_price_table",
        component: "text_mini_price_table",
        maxCount: 2,
        currentCount: 0,
      },
      {
        text: "text_heatmap",
        component: "text_heatmap",
        maxCount: 2,
        currentCount: 0,
      },
      {
        text: "text_detail_code",
        component: "text_detail_code",
        maxCount: 2,
        currentCount: 0,
      },
      {
        text: "text_market_depth",
        component: "text_market_depth",
        maxCount: 2,
        currentCount: 0,
      },
      {
        text: "text_depth_chart",
        component: "text_depth_chart",
        maxCount: 2,
        currentCount: 0,
      },
      {
        text: "text_order_matching",
        component: "text_order_matching",
        maxCount: 2,
        currentCount: 0,
      },
      {
        text: "text_technical_chart",
        component: "text_technical_chart",
        maxCount: 2,
        currentCount: 0,
      },
      {
        text: "text_trend_chart",
        component: "text_trend_chart",
        maxCount: 2,
        currentCount: 0,
      },
      {
        text: "text_money_flow",
        component: "text_money_flow",
        maxCount: 2,
        currentCount: 0,
      },
    ],
  },
  {
    title: "title_trading",
    icon: "giaodichtien",
    items: [
      {
        text: "text_place_base_order",
        component: "text_place_base_order",
        maxCount: 2,
        currentCount: 0,
      },
      {
        text: "text_place_derivative_order",
        component: "text_place_derivative_order",
        maxCount: 2,
        currentCount: 0,
      },
      {
        text: "text_base_order_book",
        component: "text_base_order_book",
        maxCount: 2,
        currentCount: 0,
      },
      {
        text: "text_derivative_order_book",
        component: "text_derivative_order_book",
        maxCount: 2,
        currentCount: 0,
      },
      {
        text: "text_base_portfolio",
        component: "text_base_portfolio",
        maxCount: 2,
        currentCount: 0,
      },
      {
        text: "text_derivative_portfolio",
        component: "text_derivative_portfolio",
        maxCount: 2,
        currentCount: 0,
      },
    ],
  },
  {
    title: "title_top_stocks",
    icon: "taisan",
    items: [
      {
        text: "text_top_volume",
        component: "text_top_volume",
        maxCount: 2,
        currentCount: 0,
      },
      {
        text: "text_top_breakout",
        component: "text_top_breakout",
        maxCount: 2,
        currentCount: 0,
      },
      {
        text: "text_top_value",
        component: "text_top_value",
        maxCount: 2,
        currentCount: 0,
      },
      {
        text: "text_top_price_increase",
        component: "text_top_price_increase",
        maxCount: 2,
        currentCount: 0,
      },
      {
        text: "text_top_price_decrease",
        component: "text_top_price_decrease",
        maxCount: 2,
        currentCount: 0,
      },
    ],
  },
];

export const countTabs = (node: ITabAttributes | IJsonRowNode): number => {
  let count = 0;
  if (node.type === "tab") {
    count += 1;
  }
  if ("children" in node && Array.isArray(node.children)) {
    node.children.forEach((child: ITabAttributes | IJsonRowNode) => {
      count += countTabs(child);
    });
  }
  return count;
};

//Home Config
export const classicConfig: IJsonModel = {
  global: {
    tabSetMinWidth: 470,
    tabSetMinHeight: 150,
    tabSetClassNameTabStrip: styles["tab-strip"],
    tabContentClassName: styles["tab-content"],
    splitterSize: 10,
    tabSetTabStripHeight: 39,
    tabCloseType: 3,
    tabEnableRename: false,
    tabSetEnableDrag: false,
    tabSetEnableSingleTabStretch: false,
  },
  borders: [],
  layout: {
    type: "row",
    children: [
      {
        type: "row",
        weight: 66,
        children: [
          {
            type: "row",
            weight: 10,
            children: [
              {
                type: "tabset",
                weight: 100,
                children: [
                  {
                    type: "tab",
                    name: "text_trend_chart",
                    component: "text_trend_chart",
                    className: styles["tabname-node"],
                    icon: "assets/icon/unlink.svg",
                  },
                ],
              },
            ],
          },
          {
            type: "row",
            weight: 80,
            children: [
              {
                type: "row",
                weight: 50,
                children: [
                  {
                    type: "tabset",
                    weight: 40,
                    children: [
                      {
                        type: "tab",
                        name: "text_base_asset",
                        component: "text_base_asset",
                        className: styles["tabname-node"],
                        icon: "assets/icon/unlink.svg",
                      },
                    ],
                  },
                  {
                    type: "tabset",
                    weight: 60,
                    children: [
                      {
                        type: "tab",
                        name: "text_market_depth",
                        component: "text_market_depth",
                        className: styles["tabname-node"],
                        icon: "assets/icon/unlink.svg",
                      },
                    ],
                  },
                ],
              },
              {
                type: "row",
                weight: 50,
                children: [
                  {
                    type: "tabset",
                    weight: 60,
                    children: [
                      {
                        type: "tab",
                        name: "text_base_portfolio",
                        component: "text_base_portfolio",
                        className: styles["tabname-node"],
                        icon: "assets/icon/unlink.svg",
                      },
                    ],
                  },
                  {
                    type: "tabset",
                    weight: 40,
                    children: [
                      {
                        type: "tab",
                        name: "text_derivative_portfolio",
                        component: "text_derivative_portfolio",
                        className: styles["tabname-node"],
                        icon: "assets/icon/unlink.svg",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "row",
        weight: 34,
        children: [
          {
            type: "row",
            weight: 100,
            children: [
              {
                type: "tabset",
                weight: 100,
                children: [
                  {
                    type: "tab",
                    name: "text_chart_index",
                    component: "text_chart_index",
                    className: styles["tabname-node"],
                    icon: "assets/icon/unlink.svg",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};

export const professionalConfig: IJsonModel = {
  global: {
    tabSetMinWidth: 300,
    tabSetMinHeight: 150,
    tabSetClassNameTabStrip: styles["tab-strip"],
    tabContentClassName: styles["tab-content"],
    splitterSize: 10,
    tabSetTabStripHeight: 39,
    tabCloseType: 3,
    tabEnableRename: false,
    tabSetEnableDrag: false,
    tabSetEnableSingleTabStretch: false,
  },
  borders: [],
  layout: {
    type: "row",
    children: [
      {
        type: "row",
        weight: 75,
        children: [
          {
            type: "row",
            weight: 100,
            children: [
              {
                type: "tabset",
                weight: 100,
                children: [
                  {
                    type: "tab",
                    name: "text_chart_index",
                    component: "text_chart_index",
                    className: styles["tabname-node"],
                    icon: "assets/icon/unlink.svg",
                  },
                ],
              },
            ],
          },
          {
            type: "row",
            weight: 100,
            children: [
              {
                type: "row",
                weight: 33,
                children: [
                  {
                    type: "tabset",
                    weight: 30,
                    children: [
                      {
                        type: "tab",
                        name: "text_trend_chart",
                        component: "text_trend_chart",
                        className: styles["tabname-node"],
                        icon: "assets/icon/unlink.svg",
                      },
                    ],
                  },
                  {
                    type: "tabset",
                    weight: 70,
                    children: [
                      {
                        type: "tab",
                        name: "text_trend_chart",
                        component: "text_trend_chart",
                        className: styles["tabname-node"],
                        icon: "assets/icon/unlink.svg",
                      },
                    ],
                  },
                ],
              },
              {
                type: "row",
                weight: 33,
                children: [
                  {
                    type: "tabset",
                    weight: 60,
                    children: [
                      {
                        type: "tab",
                        name: "text_detail_code",
                        component: "text_detail_code",
                        className: styles["tabname-node"],
                        icon: "assets/icon/unlink.svg",
                      },
                    ],
                  },
                  {
                    type: "tabset",
                    weight: 40,
                    children: [
                      {
                        type: "tab",
                        name: "text_detail_code",
                        component: "text_detail_code",
                        className: styles["tabname-node"],
                        icon: "assets/icon/unlink.svg",
                      },
                    ],
                  },
                ],
              },
              {
                type: "row",
                weight: 34,
                children: [
                  {
                    type: "tabset",
                    weight: 50,
                    children: [
                      {
                        type: "tab",
                        name: "text_chart_index",
                        component: "text_chart_index",
                        className: styles["tabname-node"],
                        icon: "assets/icon/unlink.svg",
                      },
                    ],
                  },
                  {
                    type: "tabset",
                    weight: 50,
                    children: [
                      {
                        type: "tab",
                        name: "text_chart_index",
                        component: "text_chart_index",
                        className: styles["tabname-node"],
                        icon: "assets/icon/unlink.svg",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "row",
        weight: 25,
        children: [
          {
            type: "tabset",
            weight: 50,
            children: [
              {
                type: "tab",
                name: "text_chart_index",
                component: "text_chart_index",
                className: styles["tabname-node"],
                icon: "assets/icon/unlink.svg",
              },
            ],
          },
          {
            type: "tabset",
            weight: 50,
            children: [
              {
                type: "tab",
                name: "text_chart_index",
                component: "text_chart_index",
                className: styles["tabname-node"],
                icon: "assets/icon/unlink.svg",
              },
            ],
          },
        ],
      },
    ],
  },
};

export const personalConfig: IJsonModel = {
  global: {
    tabSetMinWidth: 300,
    tabSetMinHeight: 150,
    tabSetClassNameTabStrip: styles["tab-strip"],
    tabContentClassName: styles["tab-content"],
    splitterSize: 10,
    tabSetTabStripHeight: 39,
    tabCloseType: 3,
    tabEnableRename: false,
    tabSetEnableDrag: false,
    tabSetEnableSingleTabStretch: false,
  },
  borders: [],
  layout: {
    type: "row",
    children: [],
  },
};

export const classicConfigLogout: IJsonModel = {
  global: {
    tabSetMinWidth: 300,
    tabSetMinHeight: 150,
    tabSetClassNameTabStrip: styles["tab-strip"],
    tabContentClassName: styles["tab-content"],
    splitterSize: 10,
    tabSetTabStripHeight: 39,
    tabSetEnableClose: false,
    tabSetEnableDrag: false,
    tabSetEnableDrop: false,
    tabEnableClose: false,
    tabEnableRename: false,
    tabEnableDrag: false,
    tabSetEnableSingleTabStretch: false,
  },
  borders: [],
  layout: {
    type: "row",
    children: [
      {
        type: "row",
        weight: 60,
        children: [
          {
            type: "row",
            weight: 30,
            children: [
              {
                type: "tabset",
                weight: 100,
                children: [
                  {
                    type: "tab",
                    name: "text_chart_index",
                    component: "text_chart_index",
                  },
                ],
              },
            ],
          },
          {
            type: "row",
            weight: 70,
            children: [
              {
                type: "row",
                weight: 55,
                children: [
                  {
                    type: "tabset",
                    weight: 30,
                    children: [
                      {
                        type: "tab",
                        name: "text_trend_chart",
                        component: "text_trend_chart",
                      },
                    ],
                  },
                  {
                    type: "tabset",
                    weight: 70,
                    children: [
                      {
                        type: "tab",
                        name: "text_trend_chart",
                        component: "text_trend_chart",
                      },
                    ],
                  },
                ],
              },
              {
                type: "row",
                weight: 45,
                children: [
                  {
                    type: "tabset",
                    weight: 65,
                    children: [
                      {
                        type: "tab",
                        name: "text_trend_chart",
                        component: "text_trend_chart",
                      },
                    ],
                  },
                  {
                    type: "tabset",
                    weight: 35,
                    children: [
                      {
                        type: "tab",
                        name: "text_trend_chart",
                        component: "text_trend_chart",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "row",
        weight: 40,
        children: [
          {
            type: "row",
            weight: 100,
            children: [
              {
                type: "tabset",
                weight: 100,
                children: [
                  {
                    type: "tab",
                    name: "text_chart_index",
                    component: "text_chart_index",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};

export const professionalConfigLogout: IJsonModel = {
  global: {
    tabSetMinWidth: 300,
    tabSetMinHeight: 150,
    tabSetClassNameTabStrip: styles["tab-strip"],
    tabContentClassName: styles["tab-content"],
    splitterSize: 10,
    tabSetTabStripHeight: 39,
    tabSetEnableClose: false,
    tabSetEnableDrag: false,
    tabSetEnableDrop: false,
    tabEnableClose: false,
    tabEnableRename: false,
    tabEnableDrag: false,
    tabSetEnableSingleTabStretch: false,
  },
  borders: [],
  layout: {
    type: "row",
    children: [
      {
        type: "row",
        weight: 75,
        children: [
          {
            type: "row",
            weight: 100,
            children: [
              {
                type: "tabset",
                weight: 100,
                children: [
                  {
                    type: "tab",
                    name: "text_chart_index",
                    component: "text_chart_index",
                  },
                ],
              },
            ],
          },
          {
            type: "row",
            weight: 100,
            children: [
              {
                type: "row",
                weight: 33,
                children: [
                  {
                    type: "tabset",
                    weight: 30,
                    children: [
                      {
                        type: "tab",
                        name: "text_trend_chart",
                        component: "text_trend_chart",
                      },
                    ],
                  },
                  {
                    type: "tabset",
                    weight: 70,
                    children: [
                      {
                        type: "tab",
                        name: "text_trend_chart",
                        component: "text_trend_chart",
                      },
                    ],
                  },
                ],
              },
              {
                type: "row",
                weight: 33,
                children: [
                  {
                    type: "tabset",
                    weight: 60,
                    children: [
                      {
                        type: "tab",
                        name: "text_detail_code",
                        component: "text_detail_code",
                      },
                    ],
                  },
                  {
                    type: "tabset",
                    weight: 40,
                    children: [
                      {
                        type: "tab",
                        name: "text_detail_code",
                        component: "text_detail_code",
                      },
                    ],
                  },
                ],
              },
              {
                type: "row",
                weight: 34,
                children: [
                  {
                    type: "tabset",
                    weight: 50,
                    children: [
                      {
                        type: "tab",
                        name: "text_chart_index",
                        component: "text_chart_index",
                      },
                    ],
                  },
                  {
                    type: "tabset",
                    weight: 50,
                    children: [
                      {
                        type: "tab",
                        name: "text_chart_index",
                        component: "text_chart_index",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "row",
        weight: 25,
        children: [
          {
            type: "tabset",
            weight: 50,
            children: [
              {
                type: "tab",
                name: "text_chart_index",
                component: "text_chart_index",
              },
            ],
          },
          {
            type: "tabset",
            weight: 50,
            children: [
              {
                type: "tab",
                name: "text_chart_index",
                component: "text_chart_index",
              },
            ],
          },
        ],
      },
    ],
  },
};

export const iconToKey: Record<string, number> = {
  "assets/icon/unlink.svg": 1,
  "assets/icon/link-green.svg": 2,
  "assets/icon/link-orange.svg": 3,
  "assets/icon/link-purple.svg": 4,
  "assets/icon/link-red.svg": 5,
  "assets/icon/link-blue.svg": 6,
};

export const newHub = (dataEzhub: IDataEzhub) => {
  return {
    JsonModel: JSON.stringify(personalConfig),
    Links: [
      {
        LinkId: [],
        Key: 1,
        Symbol: "FTS",
      },
      {
        LinkId: [],
        Key: 2,
        Symbol: "FPT",
      },
      {
        LinkId: [],
        Key: 3,
        Symbol: "SSI",
      },
      {
        LinkId: [],
        Key: 4,
        Symbol: "VPS",
      },
      {
        LinkId: [],
        Key: 5,
        Symbol: "TCB",
      },
      {
        LinkId: [],
        Key: 6,
        Symbol: "VIB",
      },
    ],
    Name: generateRandomName(dataEzhub),
    Thumbnail: 1,
  };
};

export const newHubTemplate = (
  jsonModel: IJsonModel,
  dataEzhub: IDataEzhub,
  type: string
) => {
  return {
    JsonModel: JSON.stringify(Model.fromJson(jsonModel).toJson()),
    Links: [
      {
        LinkId: [],
        Key: 1,
        Symbol: "FTS",
      },
      {
        LinkId: [],
        Key: 2,
        Symbol: "FPT",
      },
      {
        LinkId: [],
        Key: 3,
        Symbol: "SSI",
      },
      {
        LinkId: [],
        Key: 4,
        Symbol: "VPS",
      },
      {
        LinkId: [],
        Key: 5,
        Symbol: "TCB",
      },
      {
        LinkId: [],
        Key: 6,
        Symbol: "VIB",
      },
    ],
    Name: generateDuplicateName(dataEzhub, type),
    Thumbnail: 1,
  };
};

export const newHubTemplateWelcome = (jsonModel: IJsonModel) => {
  return {
    JsonModel: JSON.stringify(Model.fromJson(jsonModel).toJson()),
    Links: [
      {
        LinkId: [],
        Key: 1,
        Symbol: "FTS",
      },
      {
        LinkId: [],
        Key: 2,
        Symbol: "FPT",
      },
      {
        LinkId: [],
        Key: 3,
        Symbol: "SSI",
      },
      {
        LinkId: [],
        Key: 4,
        Symbol: "VPS",
      },
      {
        LinkId: [],
        Key: 5,
        Symbol: "TCB",
      },
      {
        LinkId: [],
        Key: 6,
        Symbol: "VIB",
      },
    ],
    Name: "EzHub",
    Thumbnail: 1,
  };
};

// Hàm dịch tiếng Việt cho các label của FlexLayout
export const i18nMapper = (id: I18nLabel, t: TFunction) => {
  switch (id) {
    case I18nLabel.Close_Tab:
      return t("close");
    case I18nLabel.Close_Tabset:
      return t("close");
    case I18nLabel.Move_Tab:
      return t("move");
    case I18nLabel.Move_Tabset:
      return t("move");
    case I18nLabel.Maximize:
      return t("maximize");
    case I18nLabel.Restore:
      return t("restore");
    case I18nLabel.Overflow_Menu_Tooltip:
      return t("hidden_tab");
    case I18nLabel.Error_rendering_component:
      return t("error_render_component");
    default:
      return undefined;
  }
};
