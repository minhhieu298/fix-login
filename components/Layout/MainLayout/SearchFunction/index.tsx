import { Box, Tooltip, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { memo, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";

import EmptyData from "@/components/EmptyData";
import { allIcon } from "@/components/Layout/Settings/EditMenuIcons/constant";
import HighlightText from "@/components/ui/HighlightText";
import { useCustomLanguage } from "@/hooks/useCustomLanguage";
import { useCustomTheme } from "@/hooks/useCustomTheme";
import { handleFolderMenuIcon } from "@/utils";
import { addRecentSearch } from "@/utils/recentSearch";

interface FunctionItem {
  id: number;
  name: string;
  icon: string;
  route: string;
}

interface SearchFunctionProps {
  onClose?: () => void;
  searchValue?: string;
  onItemSelected?: () => void;
}

// Memoized FunctionItem component to prevent unnecessary re-renders
const FunctionItem = memo(
  ({
    func,
    onSelect,
    searchValue,
    normalizeText,
  }: {
    func: FunctionItem;
    mode: string;
    onSelect: (_route: string) => void;
    searchValue: string;
    normalizeText: (_input: string) => string;
  }) => (
    <Tooltip title={func.name}>
      <Box
        onClick={() => onSelect(func.route)}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "8px",
          width: "70px",
          height: "62px",
          cursor: "pointer",
        }}
      >
        {/* Icon */}
        <Box
          sx={{
            width: "20px",
            height: "20px",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "4px",
          }}
        >
          <Image src={func.icon} alt={func.name} width={20} height={20} />
        </Box>

        {/* Text */}
        <HighlightText
          text={func.name}
          searchValue={searchValue}
          variant="sub12-M18"
          sx={(theme) => ({
            color: theme.palette?.customBase?.base50,
            ...theme.applyStyles("dark", {
              color: theme.palette?.customBase?.base30,
            }),
            textAlign: "center",
            // maxWidth: "70px",
            // overflow: "hidden",
            // textOverflow: "ellipsis",
            // display: "-webkit-box",
            // WebkitLineClamp: 2,
            // WebkitBoxOrient: "vertical",
          })}
          normalizeText={normalizeText}
        />
      </Box>
    </Tooltip>
  )
);

FunctionItem.displayName = "FunctionItem";

const SearchFunctionComponent = ({
  onClose,
  searchValue = "",
  onItemSelected,
}: SearchFunctionProps) => {
  const router = useRouter();
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

  // Memoize normalize function to avoid recreating on every render
  const normalizeText = useCallback((input: string): string => {
    return input
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // remove combining marks
      .replace(/đ/g, "d")
      .replace(/Đ/g, "d")
      .replace(/\s+/g, " ")
      .trim();
  }, []);

  // Memoize functions data to avoid unnecessary re-computations
  const functions: FunctionItem[] = useMemo(
    () =>
      Object.values(allIcon).flatMap((category, categoryIndex) =>
        category.map((item, itemIndex) => {
          const iconPath = `/assets/${handleFolderMenuIcon(
            settingInfo?.iconPack || "pink",
            settingInfo?.theme || "light"
          )}/${item.path}`;

          return {
            id: categoryIndex * 100 + itemIndex + 1,
            name: t(item.name),
            icon: iconPath,
            route: item.url || "#",
          };
        })
      ),
    [settingInfo?.iconPack, settingInfo?.theme]
  );

  // Memoize click handler
  const handleFunctionClick = useCallback(
    (func: FunctionItem) => {
      // Save to recent searches
      addRecentSearch({
        type: "function",
        title: func.name,
        subtitle: func.route,
        data: func,
      });

      // Trigger refresh for history
      onItemSelected?.();

      router.push(func.route, undefined, { shallow: true });
      onClose?.(); // Tắt search sau khi chuyển link
    },
    [router, onClose, onItemSelected]
  );

  // Memoize normalized search value
  const normalizedSearch = useMemo(
    () => normalizeText(searchValue),
    [searchValue, normalizeText]
  );

  // Memoize filtered and sorted functions
  const filteredFunctions = useMemo(() => {
    if (!functions.length) return [];

    return functions
      .map((f) => ({ ...f, _norm: normalizeText(f.name) }))
      .filter((func) => func._norm.includes(normalizedSearch))
      .sort((a, b) => {
        // Sort theo độ ưu tiên: exact match > starts with > contains
        const aName = a._norm;
        const bName = b._norm;
        const search = normalizedSearch;

        if (aName === search && bName !== search) return -1;
        if (bName === search && aName !== search) return 1;
        if (aName.startsWith(search) && !bName.startsWith(search)) return -1;
        if (bName.startsWith(search) && !aName.startsWith(search)) return 1;
        return aName.localeCompare(bName);
      })
      .map(({ _norm, ...rest }) => rest);
  }, [functions, normalizedSearch, normalizeText]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {/* Header */}
      <Typography
        variant="sub12-M18"
        sx={(theme) => ({
          color: theme.palette?.customBase?.base40,
        })}
      >
        Chức năng
      </Typography>
      <Box
        sx={(theme) => ({
          background: theme.palette?.customBase?.baseWhite,
          ...theme.applyStyles("dark", {
            background: theme.palette?.customBase?.base80,
          }),
          borderRadius: "12px",
          height: "604px",
          overflow: "auto",
          "@media (min-width: 1921px)": {
            height: "892px",
          },
          "@media (min-width: 1281px) and (max-width: 1440px)": {
            height: "466px",
          },
          "@media (max-width: 1280px)": {
            height: "316px",
          },
          width: "100%",
          "&::-webkit-scrollbar": {
            width: "0px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "transparent",
            border: "none",
          },
          "&:hover": {
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(244, 244, 244, 0.6)",
              border: "1px solid rgba(199, 199, 199, 1)",
              ...theme.applyStyles("dark", {
                backgroundColor: "rgba(17, 19, 21, 0.3)",
                border: "1px solid rgba(77, 81, 88, 1)",
              }),
              borderRadius: "100px",
            },
          },
        })}
      >
        {/* Grid Functions */}
        {filteredFunctions.length === 0 ? (
          <EmptyData title="Vui lòng thử lại với từ khóa khác" />
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              columnGap: "12px",
              rowGap: "20px",
              padding: "16px",
            }}
          >
            {filteredFunctions.map((func) => (
              <FunctionItem
                key={func.id}
                func={func}
                mode={mode}
                onSelect={() => handleFunctionClick(func)}
                searchValue={searchValue}
                normalizeText={normalizeText}
              />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export const SearchFunction = memo(SearchFunctionComponent);
