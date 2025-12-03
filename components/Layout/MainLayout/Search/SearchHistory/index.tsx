import { Box, Typography } from "@mui/material";
import { memo, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ezhubActions } from "@/store/reducers/ezHub.reducer";
import {
  clearRecentSearches,
  getRecentSearches,
  type RecentSearchItem,
  removeRecentSearch,
} from "@/utils/recentSearch";

import HistoryItem from "./HistoryItem";

interface SearchHistoryProps {
  onItemClick?: (_item: RecentSearchItem) => void;
}

const SearchHistory = ({ onItemClick }: SearchHistoryProps) => {
  const dispatch = useDispatch();
  const recentSearches = useSelector(
    (state: {
      ezhubReducer: {
        recentSearches: RecentSearchItem[];
      };
    }) => state.ezhubReducer.recentSearches
  );
  const settingInfo = useSelector(
    (state: {
      settingReducer: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setting: any;
      };
    }) => state.settingReducer.setting
  );

  useEffect(() => {
    const recent = getRecentSearches();
    dispatch(ezhubActions.setRecentSearches(recent));
  }, []);

  const handleRemoveItem = useCallback(
    (id: string) => {
      removeRecentSearch(id);
      dispatch(
        ezhubActions.setRecentSearches(
          recentSearches.filter((item) => item.id !== id)
        )
      );
    },
    [recentSearches, dispatch]
  );

  const handleClearAll = useCallback(() => {
    clearRecentSearches();
    dispatch(ezhubActions.setRecentSearches([]));
  }, [dispatch]);

  const handleItemClick = useCallback(
    (_item: RecentSearchItem) => {
      onItemClick?.(_item);
    },
    [onItemClick]
  );

  if (recentSearches.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding:
          settingInfo?.position === "Bottom"
            ? "8px 12px 16px 12px"
            : "16px 12px 8px 12px",
      }}
    >
      <Box sx={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        {recentSearches.slice(0, 5).map((item) => (
          <HistoryItem
            key={item.id}
            title={item.title}
            type={item.type}
            onClose={() => handleRemoveItem(item.id)}
            onClick={() => handleItemClick(item)}
          />
        ))}
      </Box>
      <Typography
        variant="sub12-M18"
        sx={(theme) => ({
          cursor: "pointer",
          color: theme.palette.customBase?.base60,
          ...theme.applyStyles("dark", {
            color: theme.palette.customBase?.base40,
          }),
          "&:hover": {
            color: theme.palette.customBase?.base40,
            ...theme.applyStyles("dark", {
              color: theme.palette.customBase?.base30,
            }),
          },
        })}
        onClick={handleClearAll}
      >
        Xóa tìm kiếm gần đây
      </Typography>
    </Box>
  );
};

export default memo(SearchHistory);
