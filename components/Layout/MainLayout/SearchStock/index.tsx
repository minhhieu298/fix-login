import { Badge, Box, Typography } from "@mui/material";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { AutoSizer, List } from "react-virtualized";

import EmptyData from "@/components/EmptyData";
import HighlightText from "@/components/ui/HighlightText";
import { IStockItem } from "@/interface/search/interface";
import { addRecentSearch } from "@/utils/recentSearch";

import LoadingPage from "../../LoadingPage";

interface SearchStockProps {
  onClose?: () => void;
  searchValue?: string;
  onItemSelected?: () => void;
}

// Memoized StockItem component to prevent unnecessary re-renders
const StockItem = memo(
  ({
    stock,
    onSelect,
    searchValue,
    normalizeText,
    isActive = false,
  }: {
    stock: IStockItem & { index: number };
    onSelect: () => void;
    searchValue: string;
    normalizeText: (_input: string) => string;
    isActive?: boolean;
  }) => {
    const getExchangeName = useCallback((exchange: string) => {
      switch (exchange) {
        case "HS":
        case "HO":
          return "HSX"; // HOSE
        case "HN":
        case "HA":
          return "HNX"; // HNX
        case "UP":
          return "UPCOM"; // UPCOM
        case "PS":
        case "FU":
          return "PHÁI SINH"; // Phái sinh
        default:
          return exchange;
      }
    }, []);

    return (
      <Box
        onClick={onSelect}
        sx={(theme) => ({
          display: "flex",
          alignItems: "center",
          padding: "8px 12px",
          height: "60px",
          cursor: "pointer",
          transition: "all 0.2s ease-in-out",
          width: "100%",
          overflow: "hidden",
          backgroundColor: isActive
            ? theme.palette.customBase?.base20
            : "transparent",
          ...theme.applyStyles("dark", {
            backgroundColor: isActive
              ? theme.palette.customBase?.base60
              : "transparent",
          }),
          "&:hover": {
            backgroundColor: theme.palette.customBase?.base20,
            ...theme.applyStyles("dark", {
              backgroundColor: theme.palette.customBase?.base60,
            }),
          },
        })}
      >
        {/* Stock code and exchange - Vertical layout */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "100%",
            overflow: "hidden",
          }}
        >
          {/* Stock code and badge on same line */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              width: "100%",
              overflow: "hidden",
            }}
          >
            <HighlightText
              text={stock.stock_code}
              searchValue={searchValue}
              variant="sub12-B18"
              sx={(theme) => ({
                color: theme.palette?.customBase?.base80,
                ...theme.applyStyles("dark", {
                  color: theme.palette?.customBase?.base20,
                }),
                flexShrink: 0,
              })}
              normalizeText={normalizeText}
            />
            <Badge
              color="info"
              size="xsmall"
              type="square"
              sx={{
                height: "16px",
                padding: "1px 4px",
              }}
            >
              {getExchangeName(stock.Ex)}
            </Badge>
          </Box>

          {/* Company name on second line */}
          <HighlightText
            text={stock.name_vn}
            searchValue={searchValue}
            variant="sub12-M18"
            sx={(theme) => ({
              color: theme.palette?.customBase?.base40,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              width: "100%",
            })}
            normalizeText={normalizeText}
          />
        </Box>
      </Box>
    );
  }
);

StockItem.displayName = "StockItem";

const SearchStockComponent = ({
  onClose,
  searchValue = "",
  onItemSelected,
}: SearchStockProps) => {
  const isLoading = useSelector(
    (state: {
      stockReducer: {
        isLoading: boolean;
      };
    }) => state.stockReducer?.isLoading
  );

  const stockData = useSelector(
    (state: {
      stockReducer: {
        dataStock: IStockItem[];
      };
    }) => state.stockReducer?.dataStock
  );

  const error = useSelector(
    (state: {
      stockReducer: {
        error: string;
      };
    }) => state.stockReducer?.error
  );

  const [activeIndex, setActiveIndex] = useState(-1);

  // Reset active index khi search value thay đổi và có giá trị
  useEffect(() => {
    if (searchValue.trim()) {
      setActiveIndex(0);
    } else {
      setActiveIndex(-1); // Không active item nào khi không có search
    }
  }, [searchValue]);

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

  // Memoize filtered and sorted stocks based on search value
  const filteredStocks = useMemo(() => {
    if (!stockData?.length) return [];

    const normalizedSearch = normalizeText(searchValue);

    // If no search value, return all stocks
    if (!normalizedSearch.trim()) {
      return stockData;
    }

    // Filter stocks that match search criteria
    const matchingStocks = stockData
      .map((stock) => {
        const normalizedCode = normalizeText(stock.stock_code);
        const normalizedCompanyName = normalizeText(stock.name_vn);

        // Calculate match score for better sorting
        let score = 0;
        let matchType = "none";

        // Exact match gets highest priority
        if (normalizedCode === normalizedSearch) {
          score = 1000;
          matchType = "exact_code";
        } else if (normalizedCompanyName === normalizedSearch) {
          score = 900;
          matchType = "exact_name";
        }
        // Starts with gets high priority
        else if (normalizedCode.startsWith(normalizedSearch)) {
          score = 800 + (normalizedCode.length - normalizedSearch.length);
          matchType = "starts_code";
        } else if (normalizedCompanyName.startsWith(normalizedSearch)) {
          score =
            700 + (normalizedCompanyName.length - normalizedSearch.length);
          matchType = "starts_name";
        }
        // Contains gets lower priority - cho cả mã chứng khoán và tên công ty
        else if (normalizedCode.includes(normalizedSearch)) {
          score = 600 + (normalizedCode.length - normalizedSearch.length);
          matchType = "contains_code";
        } else if (normalizedCompanyName.includes(normalizedSearch)) {
          score =
            500 + (normalizedCompanyName.length - normalizedSearch.length);
          matchType = "contains_name";
        }

        // Only apply bonus if there's already a match
        if (score > 0) {
          // Bonus for shorter codes (3-4 characters get higher priority)
          if (stock.stock_code.length <= 3) {
            score += 200; // Higher bonus for 3-char codes
          } else if (stock.stock_code.length <= 4) {
            score += 100; // Lower bonus for 4-char codes
          }
        }

        return {
          ...stock,
          _score: score,
          _matchType: matchType,
          _normalizedCode: normalizedCode,
          _normalizedName: normalizedCompanyName,
        };
      })
      .filter((stock) => stock._score > 0)
      .sort((a, b) => {
        // Sort by score (descending)
        if (b._score !== a._score) {
          return b._score - a._score;
        }

        // If same score, prioritize shorter codes
        if (a.stock_code.length !== b.stock_code.length) {
          return a.stock_code.length - b.stock_code.length;
        }

        // Finally, sort alphabetically
        return a._normalizedCode.localeCompare(b._normalizedCode);
      })
      .map(
        ({ _score, _matchType, _normalizedCode, _normalizedName, ...rest }) =>
          rest
      );

    return matchingStocks;
  }, [stockData, searchValue, normalizeText]);

  // Virtual scrolling configuration
  const ITEM_HEIGHT = 60;

  const handleStockSelect = useCallback(
    (stock?: IStockItem) => {
      if (stock) {
        // Lưu vào cookies
        addRecentSearch({
          type: "stock",
          title: stock.stock_code,
          subtitle: stock.name_vn,
          data: stock,
        });

        onItemSelected?.();

        onClose?.();
      }
    },
    [onClose, onItemSelected]
  );

  // Row renderer cho react-virtualized
  const rowRenderer = useCallback(
    ({
      index,
      key,
      style,
    }: {
      index: number;
      key: string;
      style: React.CSSProperties;
    }) => {
      const stock = filteredStocks[index];
      const isActive = index === activeIndex;

      return (
        <div key={key} style={style}>
          <StockItem
            stock={{ ...stock, index }}
            onSelect={() => handleStockSelect(stock)}
            searchValue={searchValue}
            normalizeText={normalizeText}
            isActive={isActive}
          />
        </div>
      );
    },
    [filteredStocks, activeIndex, searchValue, normalizeText, handleStockSelect]
  );

  // Ref cho List component
  const listRef = useRef<List>(null);

  // Scroll đến active item khi activeIndex thay đổi
  useEffect(() => {
    if (listRef.current && filteredStocks.length > 0 && activeIndex >= 0) {
      listRef.current.scrollToRow(activeIndex);
    }
  }, [activeIndex, filteredStocks.length]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Escape luôn hoạt động
      if (event.key === "Escape") {
        event.preventDefault();
        onClose?.();
        return;
      }

      // Xử lý Tab riêng - luôn hoạt động, select item đầu tiên nếu chưa có active
      if (event.key === "Tab") {
        event.preventDefault();
        if (filteredStocks.length > 0) {
          setActiveIndex((prev) => {
            // Nếu chưa có active item, chọn item đầu tiên
            if (prev === -1) {
              return 0;
            }
            // Nếu đã có active item, chọn item tiếp theo
            return Math.min(prev + 1, filteredStocks.length - 1);
          });
        }
        return;
      }

      // Các phím khác chỉ hoạt động khi có search value
      if (filteredStocks.length === 0 || !searchValue.trim()) return;

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setActiveIndex((prev) => {
            const currentIndex = prev === -1 ? -1 : prev;
            return Math.min(currentIndex + 1, filteredStocks.length - 1);
          });
          break;
        case "ArrowUp":
          event.preventDefault();
          setActiveIndex((prev) => {
            const currentIndex = prev === -1 ? filteredStocks.length : prev;
            return Math.max(currentIndex - 1, 0);
          });
          break;
        case "Enter":
          event.preventDefault();
          if (activeIndex >= 0 && filteredStocks[activeIndex]) {
            handleStockSelect(filteredStocks[activeIndex]);
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [filteredStocks, activeIndex, handleStockSelect, onClose, searchValue]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <Typography
        variant="sub12-M18"
        sx={(theme) => ({
          color: theme.palette?.customBase?.base40,
        })}
      >
        Mã chứng khoán
      </Typography>

      <Box
        sx={(theme) => ({
          background: theme.palette?.customBase?.baseWhite,
          ...theme.applyStyles("dark", {
            background: theme.palette?.customBase?.base80,
          }),
          borderRadius: "12px",
          height: "604px",
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
          position: "relative",
          "& .ReactVirtualized__List": {
            "&::-webkit-scrollbar": {
              width: "8px",
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
          },
        })}
      >
        {isLoading ? (
          <LoadingPage />
        ) : error ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
              color: "#EF4444",
              fontSize: "14px",
            }}
          >
            {error}
          </Box>
        ) : filteredStocks.length === 0 ? (
          <EmptyData title="Vui lòng thử lại với từ khóa khác" />
        ) : (
          <AutoSizer>
            {({ height, width }: { height: number; width: number }) => (
              <List
                ref={listRef}
                height={height}
                width={width}
                rowCount={filteredStocks.length}
                rowHeight={ITEM_HEIGHT}
                rowRenderer={rowRenderer}
                overscanRowCount={5}
              />
            )}
          </AutoSizer>
        )}
      </Box>
    </Box>
  );
};

export const SearchStock = memo(SearchStockComponent);
