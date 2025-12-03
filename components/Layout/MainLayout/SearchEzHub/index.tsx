import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { memo, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import EmptyData from "@/components/EmptyData";
import HighlightText from "@/components/ui/HighlightText";
import { useCustomTheme } from "@/hooks/useCustomTheme";
import { Hub, IDataEzhub } from "@/interface/MyHub/interface";
import { ezhubActions } from "@/store/reducers/ezHub.reducer";
import { addRecentSearch } from "@/utils/recentSearch";

interface SearchEzHubProps {
  onClose?: () => void;
  searchValue?: string;
  onItemSelected?: () => void;
}

// Memoized HubItem component to prevent unnecessary re-renders
const HubItem = memo(
  ({
    hub,
    isSelected,
    mode,
    onSelect,
    searchValue,
    normalizeText,
  }: {
    hub: Hub;
    isSelected: boolean;
    mode: string;
    onSelect: (_id: number) => void;
    searchValue: string;
    normalizeText: (_input: string) => string;
  }) => (
    <Box
      onClick={() => onSelect(hub.WorkSpaceID)}
      sx={{
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
      }}
    >
      <Image
        src={
          mode === "dark"
            ? "/assets/image/MyHub.png"
            : "/assets/image/MyHubLight.png"
        }
        alt={hub.Name}
        width={140}
        height={88}
        style={{
          borderRadius: "4px",
          border: isSelected ? "0.5px solid #1AAF74" : "none",
        }}
      />
      <HighlightText
        text={hub.Name}
        searchValue={searchValue}
        variant="sub12-M18"
        sx={(theme) => ({
          color: theme.palette?.customBase?.base50,
          ...theme.applyStyles("dark", {
            color: theme.palette?.customBase?.base30,
          }),
          textAlign: "left",
          marginTop: "6px",
          maxWidth: "140px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        })}
        normalizeText={normalizeText}
      />
    </Box>
  )
);

HubItem.displayName = "HubItem";

const SearchEzHubComponent = ({
  onClose,
  searchValue = "",
  onItemSelected,
}: SearchEzHubProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { mode } = useCustomTheme();

  const dataEzhub = useSelector(
    (state: {
      ezhubReducer: {
        dataEzhub: IDataEzhub;
      };
    }) => state.ezhubReducer.dataEzhub
  );

  const renderedHubId = useSelector(
    (state: {
      ezhubReducer: {
        renderedHubId: number | null;
      };
    }) => state.ezhubReducer.renderedHubId
  );

  // Memoize hubs data to avoid unnecessary re-computations
  const hubs: Hub[] = useMemo(
    () => (Array.isArray(dataEzhub?.List) ? dataEzhub.List : []),
    [dataEzhub?.List]
  );

  // Memoize normalize function to avoid recreating on every render
  const normalizeText = useCallback((input: string): string => {
    return input
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "d")
      .replace(/\s+/g, " ")
      .trim();
  }, []);

  // Memoize normalized search value
  const normalizedSearch = useMemo(
    () => normalizeText(searchValue),
    [searchValue, normalizeText]
  );

  // Memoize filtered hubs
  const filteredHubs = useMemo(() => {
    if (!hubs.length) return [];
    if (!normalizedSearch) return hubs;

    return hubs.filter((h) => normalizeText(h.Name).includes(normalizedSearch));
  }, [hubs, normalizedSearch, normalizeText]);

  // Memoize click handler
  const handleChooseTemplate = useCallback(
    (hub: Hub) => {
      // Save to recent searches
      addRecentSearch({
        type: "ezhub",
        title: hub.Name,
        subtitle: `${hub.WorkSpaceID}`,
        data: hub,
      });

      // Trigger refresh for history
      onItemSelected?.();

      // Set flag để đánh dấu workspace được chọn từ search
      if (router.pathname !== "/") {
        dispatch(ezhubActions.setWorkspaceSelectedFromSearch(true));
      }
      dispatch(ezhubActions.getWorkspaceDetailAction(hub.WorkSpaceID));
      dispatch(ezhubActions.setrenderedHubId(hub.WorkSpaceID));
      if (router.pathname !== "/") {
        router.push("/", undefined, { shallow: true });
      }
      onClose?.();
    },
    [dispatch, onClose, onItemSelected, router]
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <Typography
        variant="sub12-M18"
        sx={(theme) => ({
          color: theme.palette?.customBase?.base40,
        })}
      >
        EzHub
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
            width: "0px", // Ẩn hoàn toàn scrollbar khi không hover
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
        {filteredHubs.length === 0 ? (
          <EmptyData title="Vui lòng thử lại với từ khóa khác" />
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "20px",
              alignContent: "start",
              padding: "12px",
            }}
          >
            {filteredHubs.map((hub) => (
              <HubItem
                key={hub.WorkSpaceID}
                hub={hub}
                isSelected={hub.WorkSpaceID === renderedHubId}
                mode={mode}
                onSelect={() => handleChooseTemplate(hub)}
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

export const SearchEzHub = memo(SearchEzHubComponent);
