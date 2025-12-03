import { TFunction } from "i18next";

export const getPathLabel = (t: TFunction) => {
  return [
    {
      label: t("text_Display"),
      path: "display",
      children: [
        {
          label: t("text_edit_menu_bar"),
          path: "edit-menu",
        },
      ],
    },
    {
      label: t("text_infomation"),
      path: "account-information",
    },
    {
      label: t("text_securi"),
      path: "security",
      children: [
        {
          label: t("text_doi_mat_khau"),
          path: "change-password",
        },
        {
          label: t("text_quan_ly_token"),
          path: "token-management",
        },
        {
          label: t("text_nhat_ky_token"),
          path: "token-log",
        },
      ],
    },
    {
      label: t("text_notifi"),
      path: "notifications",
    },
    {
      label: t("text_session"),
      path: "activities-session",
    },
  ];
};

type ConfigItem = {
  label: string;
  path: string;
  children?: ConfigItem[];
};

export const findLabelNested = (
  configList: ConfigItem[],
  setting: string | undefined,
  screen: string | undefined
): string | null => {
  if (!setting) return null;

  const settingItem = configList.find((item) => item.path === setting);
  if (!settingItem) return null;

  // Nếu không có screen thì trả về label của setting cha
  if (!screen) return settingItem.label;

  // Nếu có children thì tìm trong children
  if (settingItem.children) {
    const childItem = settingItem.children.find(
      (child) => child.path === screen
    );
    if (childItem) return childItem.label;
  }

  // Nếu không tìm thấy screen trong setting cha
  return null;
};

export const findParentPath = (
  configList: ConfigItem[],
  screen: string
): string | null => {
  for (const item of configList) {
    if (item.children) {
      const found = item.children.find((child) => child.path === screen);
      if (found) {
        return item.path;
      }

      const nested = findParentPath(item.children, screen);
      if (nested) return nested;
    }
  }
  return null;
};
