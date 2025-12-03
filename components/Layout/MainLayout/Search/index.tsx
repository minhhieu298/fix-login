import {
  Box,
  ClickAwayListener,
  Fade,
  InputAdornment,
  Popper,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { memo, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ezhubActions } from "@/store/reducers/ezHub.reducer";
import { addRecentSearch, type RecentSearchItem } from "@/utils/recentSearch";

import { SearchEzHub } from "../SearchEzHub";
import { SearchFunction } from "../SearchFunction";
import { SearchStock } from "../SearchStock";
import { SearchIcon } from "./icons/SearchIcon";
import SearchHistory from "./SearchHistory";

interface SearchProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

const Search = ({ isOpen, onToggle, onClose }: SearchProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [searchValue, setSearchValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const islg = useMediaQuery(theme.breakpoints.up(1920));

  const settingInfo = useSelector(
    (state: {
      settingReducer: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setting: any;
      };
    }) => state.settingReducer.setting
  );

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearchClose = () => {
    setShowDropdown(false);
    onClose();
    // Delay clearing value to allow animation to complete
    setTimeout(() => {
      setSearchValue("");
    }, 100);
  };

  const handleToggle = (event: React.MouseEvent<HTMLElement>) => {
    handleClick(event);
    onToggle();
    if (!isOpen) {
      setSearchValue("");
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleHistoryItemClick = useCallback((item: RecentSearchItem) => {
    switch (item.type) {
      case "stock":
        router.push(`/stock?symbol=${item.title}`, undefined, {
          shallow: true,
        });
        break;
      case "function":
        router.push(`/${item.subtitle}`, undefined, { shallow: true });
        break;
      case "ezhub":
        if (router.pathname !== "/") {
          dispatch(ezhubActions.setWorkspaceSelectedFromSearch(true));
        }
        dispatch(ezhubActions.getWorkspaceDetailAction(item.data.WorkSpaceID));
        dispatch(ezhubActions.setrenderedHubId(item.data.WorkSpaceID));
        if (router.pathname !== "/") {
          router.push("/", undefined, { shallow: true });
        }
        break;
    }
    addRecentSearch({
      type: item.type,
      title: item.title,
      subtitle: item.subtitle,
      data: item.data,
    });
    onClose();
  }, []);

  const handleRefreshHistory = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  const handleItemSelected = useCallback(() => {
    handleRefreshHistory();
  }, [handleRefreshHistory]);

  const id = isOpen ? "search-popper-id" : undefined;

  return (
    <>
      {/* Search Icon Button */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Box
          aria-describedby={id}
          onClick={handleToggle}
          sx={{
            transition: "none",
            borderRadius: "100px",
            width: islg ? "160px" : "132px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <Box
            sx={{
              position: "relative",
              display: "block",
              padding: "1px",
              borderRadius: "100px",
              background:
                "linear-gradient(to right, #FFB579 0%, #3FC2EB 50%, #AC83F3 100%)",
              width: "100%",
            }}
          >
            <TextField
              size="small"
              placeholder="Tìm kiếm mã..."
              fullWidth
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                width: "100%",
                ".MuiInputBase-root": {
                  borderRadius: "100px",
                  border: "none",
                  background: (theme) =>
                    theme.palette.mode === "dark"
                      ? theme.palette.customBase?.base80
                      : theme.palette.customBase?.baseWhite,
                },
                ".MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                ".MuiOutlinedInput-root:hover fieldset": {
                  border: "none",
                },
                ".MuiInputAdornment-positionStart": {
                  paddingLeft: "12px !important",
                },
              }}
            />
          </Box>
        </Box>
        {/* Expanding Search Input */}
        <Box
          sx={() => ({
            position: "absolute",
            top: "-6px",
            left: settingInfo?.position !== "Right" ? "-6px" : "auto",
            right: settingInfo?.position === "Right" ? "-6px" : "auto",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
          })}
        >
          {isOpen && (
            <ClickAwayListener onClickAway={handleSearchClose}>
              <Box
                sx={{
                  width:
                    settingInfo?.position === "Left" ||
                    settingInfo?.position === "Right"
                      ? "1080px"
                      : "300px",
                  minWidth: "200px",
                  opacity: 0,
                  filter: "drop-shadow(0px 0px 40px rgba(0, 0, 0, 0.15))",
                  transform: "translateY(-10px)",
                  animation: "fadeInDown 250ms ease-out forwards",
                  "@keyframes fadeInDown": {
                    "0%": {
                      opacity: 0,
                      transform: "translateY(0px)",
                    },
                    "100%": {
                      opacity: 1,
                      transform: "translateY(0)",
                    },
                  },
                }}
              >
                <TextField
                  fullWidth
                  size="small"
                  placeholder=""
                  value={searchValue}
                  onChange={handleSearchChange}
                  autoFocus
                  name="search"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  sx={(theme) => ({
                    position: "relative",
                    // Chỉ hiển thị ::before khi position là Bottom, Top hoặc không có position
                    ...(settingInfo?.position === "Bottom" ||
                    settingInfo?.position === "Top" ||
                    !settingInfo?.position
                      ? {
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            width: "16px",
                            height: "16px",
                            right: -16,
                            background: theme.palette.customBase?.base10,
                            ...theme.applyStyles("dark", {
                              background: theme.palette.customBase?.base70,
                            }),
                            zIndex: 2,
                            ...((settingInfo?.position === "Top" ||
                              !settingInfo?.position) && {
                              mask: "radial-gradient(circle at top right, transparent 16px, black 0)",
                              bottom: 0,
                            }),
                            ...(settingInfo?.position === "Bottom" && {
                              mask: "radial-gradient(circle at bottom right, transparent 16px, black 0)",
                              top: 0,
                            }),
                          },
                        }
                      : {}),
                    "& .MuiOutlinedInput-root": {
                      background: theme.palette.customBase?.base10,
                      ...theme.applyStyles("dark", {
                        background: theme.palette.customBase?.base70,
                      }),
                      height: 48,
                      borderRadius:
                        settingInfo?.position === "Top" ||
                        !settingInfo?.position
                          ? "12px 12px 0px 0px"
                          : settingInfo?.position === "Bottom"
                            ? "0px 0px 12px 12px"
                            : settingInfo?.position === "Left"
                              ? "12px 12px 0px 12px"
                              : "12px 12px 12px 0px",
                      "&:hover": {
                        background: theme.palette.customBase?.base10,
                        ...theme.applyStyles("dark", {
                          background: theme.palette.customBase?.base70,
                        }),
                      },
                      "& fieldset": {
                        border: "none",
                      },
                      "&.Mui-focused fieldset": {
                        border: "none",
                      },
                      "& .MuiInputAdornment-positionStart": {
                        padding:
                          settingInfo?.position === "Left"
                            ? "8px 14px 8px 12px !important"
                            : "8px 0px 8px 12px !important",
                        paddingLeft: "12px !important",
                      },
                      "& .MuiInputAdornment-positionEnd": {
                        padding:
                          settingInfo?.position === "Right"
                            ? "8px 12px 8px 0px !important"
                            : "8px 0px 8px 12px !important",
                      },
                    },
                    "& .MuiInputBase-input": {
                      fontSize: "14px",
                      padding:
                        settingInfo?.position === "Right"
                          ? "7px 12px !important"
                          : "4px 12px 0px 12px",
                    },
                  })}
                  slotProps={{
                    input: {
                      startAdornment:
                        settingInfo?.position !== "Right" ? (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ) : null,
                      endAdornment:
                        settingInfo?.position === "Right" ? (
                          <InputAdornment position="end">
                            <Image
                              src="/assets/icon/icon_search_home_.svg"
                              alt="search"
                              width={0}
                              height={0}
                              style={{ width: "24.22px", height: "26px" }}
                            />
                          </InputAdornment>
                        ) : null,
                    },
                  }}
                />

                {/* Search Results Area */}
                {showDropdown && (
                  <Popper
                    id={id}
                    disablePortal
                    open={isOpen}
                    anchorEl={anchorEl}
                    placement={
                      settingInfo?.position === "Left"
                        ? "bottom-end"
                        : settingInfo?.position === "Bottom"
                          ? "top-start"
                          : "bottom-start"
                    }
                    transition
                    sx={{
                      zIndex: 1300,
                      ml:
                        settingInfo?.position === "Left"
                          ? "50px !important"
                          : "-6px !important",
                      mt: "6px !important",
                      mb:
                        settingInfo?.position === "Bottom"
                          ? "6px !important"
                          : 0,
                      mr:
                        settingInfo?.position === "Right"
                          ? "50px !important"
                          : 0,
                    }}
                  >
                    {({ TransitionProps }) => (
                      <Fade {...TransitionProps} timeout={250}>
                        <Box
                          sx={(theme) => ({
                            background: theme.palette.customBase?.base10,
                            ...theme.applyStyles("dark", {
                              background: theme.palette.customBase?.base70,
                            }),
                            borderRadius:
                              settingInfo?.position === "Bottom"
                                ? "12px 12px 12px 0px"
                                : settingInfo?.position === "Left" ||
                                    settingInfo?.position === "Right"
                                  ? "0px 0px 12px 12px"
                                  : "0px 12px 12px 12px",
                            borderTop: "none",
                            width: "1024px",
                            maxWidth: "1024px",
                            "@media (min-width: 1921px)": {
                              width: "1240px",
                              maxWidth: "1240px",
                            },
                            opacity: 1,
                          })}
                        >
                          {["Top", "Left", "Right"].includes(
                            settingInfo?.position
                          ) || !settingInfo?.position ? (
                            <SearchHistory
                              key={refreshKey}
                              onItemClick={handleHistoryItemClick}
                            />
                          ) : null}

                          <Box
                            sx={{
                              display: "grid",
                              p: 3,
                              gridTemplateColumns: "repeat(3, 1fr)",
                              gap: 3,
                            }}
                          >
                            <SearchStock
                              onClose={handleSearchClose}
                              searchValue={searchValue}
                              onItemSelected={handleItemSelected}
                            />
                            <SearchFunction
                              onClose={handleSearchClose}
                              searchValue={searchValue}
                              onItemSelected={handleItemSelected}
                            />
                            <SearchEzHub
                              onClose={handleSearchClose}
                              searchValue={searchValue}
                              onItemSelected={handleItemSelected}
                            />
                          </Box>
                          {["Bottom"].includes(settingInfo?.position) ? (
                            <SearchHistory
                              key={refreshKey}
                              onItemClick={handleHistoryItemClick}
                            />
                          ) : null}
                        </Box>
                      </Fade>
                    )}
                  </Popper>
                )}
              </Box>
            </ClickAwayListener>
          )}
        </Box>
      </Box>
    </>
  );
};

export default memo(Search);
