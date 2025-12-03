import dayjs from "dayjs";

import { IDataEzhub } from "@/interface/MyHub/interface";

export function getColorText(
  Gia: string,
  TC: string,
  Tran: string,
  San: string
) {
  if (parseFloat(Gia) === 0.0) {
    return "#cecece";
  }
  if (parseFloat(Gia) === parseFloat(San)) {
    return "#66ccff";
  }
  if (parseFloat(Gia) === parseFloat(Tran)) {
    return "#f23aff";
  }
  if (parseFloat(Gia) === parseFloat(TC)) {
    return "#fdff12";
  }
  if (parseFloat(Gia) > parseFloat(TC)) {
    return "#0bdf39";
  }
  if (parseFloat(Gia) < parseFloat(TC) && parseFloat(Gia) > parseFloat(San)) {
    return "#ff0017";
  }
  return "#cecece";
}

export const generateRandomName = (dataEzhub: IDataEzhub): string => {
  let index = 1;
  let newName = `EzHub ${index}`;

  const existingNames = dataEzhub?.List.map((item) => item.Name);

  while (existingNames.includes(newName)) {
    index++;
    newName = `EzHub ${index}`;
  }

  return newName;
};

export const generateDuplicateName = (
  dataEzhub: IDataEzhub,
  type: string
): string => {
  let index = 0;
  let newName = "";
  switch (type) {
    case "professional":
      newName = `Chuyên nghiệp ${index > 0 ? index : ""}`;
      break;
    case "classic":
      newName = `Cổ điển ${index > 0 ? index : ""}`;
      break;
    case "order":
      newName = `Đặt lệnh ${index > 0 ? index : ""}`;
      break;
    case "new-user":
      newName = `Cho người mới ${index > 0 ? index : ""}`;
      break;
  }

  const existingNames = dataEzhub?.List?.map((item) => item.Name) || [];
  while (existingNames.includes(newName)) {
    index++;
    switch (type) {
      case "professional":
        newName = `Chuyên nghiệp ${index}`;
        break;
      case "classic":
        newName = `Cổ điển ${index}`;
        break;
      case "order":
        newName = `Đặt lệnh ${index}`;
        break;
      case "new-user":
        newName = `Cho người mới ${index}`;
        break;
    }
  }

  return newName;
};

export function deleteCookiesForCurrentHost() {
  // Lấy tất cả cookies (chỉ bao gồm tên=giá trị)

  const cookies = document.cookie.split(";");

  cookies.forEach((cookie) => {
    const [name] = cookie.trim().split("=");

    if (name == "aspfpt_sessiontoken") {
      // Xóa cookie cho domain hiện tại

      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
  });
}

export const handleFolderMenuIcon = (iconPack: string, theme: string) => {
  switch (iconPack) {
    case "pink":
      return "icon_favorite";
    case "grey":
      return theme === "light"
        ? "icon_favorite_classic"
        : "icon_favorite_classic_dark";
    case "green":
      return "icon_favorite_natural";
    default:
      return "icon_favorite";
  }
};

export const formatNumber = (price: { value: string | number }) => {
  return Number(price.value).toFixed(2);
};

export const formatKL = (price: { value: string | number }) => {
  return Number(price.value).toLocaleString("en-US");
};

export const getPreviousDates = () => {
  const today = dayjs();

  const oneWeekAgo = today.subtract(7, "day");

  const oneMonthAgo = today.subtract(1, "month");

  const threeMonthsAgo = today.subtract(3, "month");

  const sixMonthsAgo = today.subtract(6, "month");

  return {
    today: formatDate(today),
    oneWeekAgo: formatDate(oneWeekAgo),
    oneMonthAgo: formatDate(oneMonthAgo),
    threeMonthsAgo: formatDate(threeMonthsAgo),
    sixMonthsAgo: formatDate(sixMonthsAgo),
  };
};

const formatDate = (date: dayjs.Dayjs) => {
  return date.format("DD/MM/YYYY");
};

export function isDecimalValue(value: string | number): boolean {
  const num = typeof value === "string" ? Number(value) : value;
  return !isNaN(num) && num % 1 !== 0;
}

export const formatColorTable = (num: number | string): string => {
  if (isDecimalValue(num)) {
    if (Number(num) > 0) {
      return "#1AAF74";
    } else {
      if (Number(num) < 0) {
        return "#F34859";
      } else {
        return "#FF9F41";
      }
    }
  } else {
    if (parseFloat(formatNumber({ value: num })) > 0) {
      return "#1AAF74";
    } else {
      if (parseFloat(formatNumber({ value: num })) < 0) {
        return "#F34859";
      } else {
        return "#FF9F41";
      }
    }
  }
};
