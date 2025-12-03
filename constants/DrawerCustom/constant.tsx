import Image from "next/image";
export const optionMode: {
  value: "light" | "dark";
  label: string;
  icon: React.ReactNode;
}[] = [
  {
    value: "light",
    label: "Giao diện sáng",
    icon: (
      <Image
        src="/assets/icon/sun-light.svg"
        width={14}
        height={14}
        alt="theme-mode"
      />
    ),
  },
  {
    value: "dark",
    label: "Giao diện tối",
    icon: (
      <Image
        src="/assets/icon/moon-dark.svg"
        width={14}
        height={14}
        alt="theme-mode"
      />
    ),
  },
];

export const optionsLangue = [
  {
    value: 10,
    label: "Tiếng Anh",
    icon: "/assets/icon/language.png",
  },
  {
    value: 20,
    label: "Tiếng Việt",
    icon: "/assets/icon/Vietnamese.png",
  },
];

export const optionsAccount = [
  {
    value: "account_info",
    label: "Thông tin tài khoản",
    icon: "/assets/icon/icon_account_info.svg",
    link: "/account-info",
  },
  {
    value: "setting",
    label: "Cài đặt",
    icon: "/assets/icon/setting.svg",
    link: "?setting=display",
  },
  {
    value: "feedback",
    label: "Góp ý",
    icon: "/assets/icon/icon_feedback.svg",
    link: "/feedback",
  },
  {
    value: "contact",
    label: "Liên hệ",
    icon: "/assets/icon/icon_contact.svg",
    link: "/contact",
  },
  {
    value: "logout",
    label: "Đăng xuất",
    icon: "/assets/icon/icon_logout.svg",
  },
];
