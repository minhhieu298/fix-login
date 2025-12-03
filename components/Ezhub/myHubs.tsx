import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import {
  Box,
  Button,
  IconButton,
  Input,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { Model } from "flexlayout-react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  newHub,
  professionalConfigLogout,
} from "@/constants/dynamic-dashboard/constant";
import { useCustomLanguage } from "@/hooks/useCustomLanguage";
import { useCustomTheme } from "@/hooks/useCustomTheme";
import { ILogin } from "@/interface/interface";
import { Hub, IDataEzhub } from "@/interface/MyHub/interface";
import { ezhubActions } from "@/store/reducers/ezHub.reducer";
import { RecentSearchItem, removeRecentSearch } from "@/utils/recentSearch";

import BaseTooltip from "../ui/BaseTooltip";
import styles from "./hub.module.scss";

const MyHubs = ({ onClose }: { onClose: () => void }) => {
  const { t } = useCustomLanguage();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [contextMenuAnchor, setContextMenuAnchor] =
    useState<null | HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [pendingRename, setPendingRename] = useState<{
    hubId: number;
    name: string;
  } | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { muiTheme, mode } = useCustomTheme();
  const dispatch = useDispatch();
  const dataEzhub = useSelector(
    (state: {
      ezhubReducer: {
        dataEzhub: IDataEzhub;
      };
    }) => state.ezhubReducer.dataEzhub
  );

  const selectedHubRedux = useSelector(
    (state: {
      ezhubReducer: {
        selectedHub: Hub | null;
      };
    }) => state.ezhubReducer.selectedHub
  );
  const renderedHubId = useSelector(
    (state: {
      ezhubReducer: {
        renderedHubId: number | null;
      };
    }) => state.ezhubReducer.renderedHubId
  );

  const userInfo = useSelector(
    (state: {
      AuthReducer: {
        userInfo: ILogin;
      };
    }) => state.AuthReducer.userInfo
  );

  const recentSearches = useSelector(
    (state: {
      ezhubReducer: {
        recentSearches: RecentSearchItem[];
      };
    }) => state.ezhubReducer.recentSearches
  );

  const hubs = Array.isArray(dataEzhub?.List) ? dataEzhub.List : [];
  const hubDefault = dataEzhub?.Default;

  //get hubs
  useEffect(() => {
    if (dataEzhub) {
      const hubs = Array.isArray(dataEzhub.List) ? dataEzhub.List : [];
      if (hubs.length > 0) {
        if (selectedHubRedux?.WorkSpaceID === null && hubs.length > 0) {
          dispatch(ezhubActions.setSelectedHub(hubs[0]));
        }
      }
    }
  }, [dataEzhub, dispatch, JSON.stringify(selectedHubRedux)]);

  // Auto rename hub mới sau duplicate
  useEffect(() => {
    if (pendingRename && hubs.length > 0) {
      // Tìm hub mới được thêm vào (hub cuối cùng trong list)
      const newestHub = hubs[hubs.length - 1];
      if (newestHub && newestHub.WorkSpaceID !== pendingRename.hubId) {
        // Hub mới đã được add, trigger rename với tên đã generate
        dispatch(ezhubActions.setSelectedHub(newestHub));
        setNewName(pendingRename.name.substring(0, 9));
        setIsEditing(true);
        setPendingRename(null); // Clear pending
        setTimeout(() => {
          inputRef.current?.focus();
          inputRef.current?.select();
        }, 100);
      }
    }
  }, [hubs, pendingRename, dispatch]);

  // Mở menu khi click vào icon MoreHorizIcon
  const handleClick = (event: React.MouseEvent<HTMLElement>, hub: Hub) => {
    setAnchorEl(event.currentTarget);
    dispatch(ezhubActions.setSelectedHub(hub));
  };

  // Mở menu khi click chuột phải
  const handleContextMenu = (
    event: React.MouseEvent<HTMLElement>,
    hub: Hub
  ) => {
    event.preventDefault();
    setContextMenuAnchor(event.currentTarget);
    setMousePosition({ x: event.clientX, y: event.clientY });
    dispatch(ezhubActions.setSelectedHub(hub));
  };

  // Đóng menu khi click vào icon
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Đóng menu chuột phải
  const handleContextMenuClose = () => {
    setContextMenuAnchor(null);
    setMousePosition(null);
  };

  // Chọn rename
  const handleRename = () => {
    if (selectedHubRedux !== null) {
      const hubToRename = hubs.find(
        (hub) => hub.WorkSpaceID === selectedHubRedux.WorkSpaceID
      );
      if (hubToRename) {
        setNewName(hubToRename.Name.substring(0, 9));
        setIsEditing(true);
        setTimeout(() => {
          inputRef.current?.focus();
          inputRef.current?.select();
        }, 0);
      }
    }
  };

  // Thay đổi tên
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (newValue.length <= 9) {
      setNewName(newValue);
    }
  };

  // Xác nhận rename
  const confirmRename = () => {
    if (selectedHubRedux !== null && newName.trim().length > 0) {
      const updatedHubs = hubs.map((hub) =>
        hub.WorkSpaceID === selectedHubRedux.WorkSpaceID
          ? { ...hub, Name: newName.trim() }
          : hub
      );

      // Cập nhật trạng thái hubs
      dispatch(ezhubActions.setHubs(updatedHubs));

      dispatch(
        ezhubActions.renameHub({
          id: selectedHubRedux.WorkSpaceID,
          newName: newName.trim(),
        })
      );
      setIsEditing(false);
      handleClose();
      handleContextMenuClose();
    }
  };

  // Hủy rename
  const cancelRename = () => {
    setNewName("");
    setIsEditing(false);
    handleClose();
    handleContextMenuClose();
  };

  // Tạo tên mới cho duplicate với logic tự động tăng số
  const generateDuplicateName = (originalName: string): string => {
    const allNames = hubs.map((hub) => hub.Name);

    // Kiểm tra xem tên có số ở cuối không
    const numberMatch = originalName.match(/^(.+)\s(\d+)$/);

    if (numberMatch) {
      // Nếu tên đã có số, tăng số đó lên
      const baseName = numberMatch[1];
      const currentNumber = parseInt(numberMatch[2]);

      // Tìm số tiếp theo chưa được sử dụng
      let nextNumber = currentNumber + 1;
      while (allNames.includes(`${baseName} ${nextNumber}`)) {
        nextNumber++;
      }
      return `${baseName} ${nextNumber}`;
    } else {
      // Nếu tên chưa có số, thêm số 2
      let newName = `${originalName} 2`;
      let counter = 2;

      // Tìm số tiếp theo chưa được sử dụng
      while (allNames.includes(newName)) {
        counter++;
        newName = `${originalName} ${counter}`;
      }
      return newName;
    }
  };

  // Sao chép hub
  const handleDuplicate = () => {
    if (selectedHubRedux !== null) {
      const newName = generateDuplicateName(selectedHubRedux.Name);

      // Tạo hub mới với tên đã được generate
      const duplicatedHub = {
        ...selectedHubRedux,
        Name: newName,
      };

      dispatch(ezhubActions.duplicateHub(duplicatedHub));
      handleClose();
      setPendingRename({ hubId: selectedHubRedux.WorkSpaceID, name: newName });
    }
  };

  // Toggle prioritize
  const togglePrioritize = (id: number) => {
    dispatch(ezhubActions.setDefaultEzhub(id));
  };

  // Xóa hub
  const handleRemove = () => {
    removeRecentSearch(
      recentSearches.find(
        (item) => item.data.WorkSpaceID === selectedHubRedux?.WorkSpaceID
      )?.id || ""
    );
    dispatch(
      ezhubActions.setRecentSearches(
        recentSearches.filter(
          (item) =>
            item.data.WorkSpaceID !== selectedHubRedux?.WorkSpaceID.toString()
        )
      )
    );
    if (selectedHubRedux !== null) {
      // Lấy danh sách hub sau khi xóa
      const remainingHubs = dataEzhub.List.filter(
        (hub) => hub.WorkSpaceID !== selectedHubRedux.WorkSpaceID
      );

      dispatch(ezhubActions.removeHub(selectedHubRedux.WorkSpaceID));

      if (renderedHubId === selectedHubRedux.WorkSpaceID) {
        if (dataEzhub.List.length > 1) {
          // Nếu có hub mặc định và không phải hub đang render
          if (dataEzhub.Default && renderedHubId !== dataEzhub.Default) {
            dispatch(ezhubActions.getWorkspaceDetailAction(dataEzhub.Default));
            dispatch(ezhubActions.setrenderedHubId(dataEzhub.Default));
          } else {
            // Mặc định render hub đầu tiên trong list sau khi xóa
            const firstHub = remainingHubs[0];
            if (firstHub) {
              dispatch(
                ezhubActions.getWorkspaceDetailAction(firstHub.WorkSpaceID)
              );
              dispatch(ezhubActions.setrenderedHubId(firstHub.WorkSpaceID));
            }
          }
        } else {
          // Xử lý khi chỉ còn 1 hub
          dispatch(
            ezhubActions.setModelAction(
              Model.fromJson(professionalConfigLogout).toJson()
            )
          );
          dispatch(ezhubActions.setrenderedHubId(null));
        }
      }
      dispatch(ezhubActions.setSelectedHub(null));
      handleClose();
    }
  };
  // Tạo hub mới
  const navigate = useRouter();
  const handleCreateNew = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (!userInfo.ATRANSACTION) {
      setAnchorEl(null);
      onClose();
      navigate.push("/?href=login");
      //dispatch(AuthAction.showForm(true));
    } else {
      dispatch(ezhubActions.addEzhubAction(newHub(dataEzhub)));
      setAnchorEl(null);
      onClose();
    }
  };

  const navigateLogin = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setAnchorEl(null);
    onClose();
    navigate.push("/?href=login");
    //dispatch(AuthAction.showForm(true));
  };

  const handleChooseTemplate = (id: number) => {
    if (id !== renderedHubId) {
      dispatch(ezhubActions.getWorkspaceDetailAction(id));
      dispatch(ezhubActions.setrenderedHubId(id));
    }
    onClose();
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {userInfo.ATRANSACTION ? (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              justifyContent: "space-between",
              padding: "0px 12px 12px 0px",
              flexShrink: 0,
            }}
          >
            <Typography
              variant="body16-B24"
              sx={{
                color:
                  mode === "dark"
                    ? muiTheme.palette?.customBase?.base20
                    : muiTheme.palette?.customBase?.base80,
              }}
            >
              {t("text_my_hub")}
            </Typography>
            {/* Tạo hub mới */}
            <Box onClick={handleCreateNew}>
              <Box
                sx={{
                  backgroundColor: muiTheme.palette?.customSupport?.primary5001,
                  borderRadius: "8px",
                  padding: "4px 12px",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  display: "flex",
                  gap: "6px",
                }}
              >
                <Typography
                  variant="body14-M21"
                  sx={(theme) => ({
                    color: theme.palette.customPrimary?.primary50,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  })}
                >
                  {t("text_create_new")}
                </Typography>
                <Image
                  src="/assets/icon/icon_news_hub.svg"
                  alt="plus"
                  width={16}
                  height={16}
                />
              </Box>
            </Box>
          </Box>
          <Box
            ref={scrollRef}
            className={styles["custom-scroll"]}
            sx={(theme) => ({
              color: theme.palette?.customBase?.base20,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              paddingRight: "12px",
              overflow: "auto",
              flex: 1,
              minHeight: 0,
              alignContent: "start",
              ...theme.applyStyles("dark", {
                color: theme.palette?.customBase?.baseWhite,
              }),
            })}
          >
            {hubs.map((hub) => (
              <Box key={hub.WorkSpaceID} sx={{ display: "flex" }}>
                <Box>
                  <Image
                    src={
                      mode === "dark"
                        ? "/assets/image/MyHub.png"
                        : "/assets/image/MyHubLight.png"
                    }
                    alt={hub.Name}
                    width={180}
                    height={112}
                    style={{
                      borderRadius: "8px",
                      cursor: "pointer",
                      border:
                        hub.WorkSpaceID === renderedHubId
                          ? "1px solid #1AAF74"
                          : "none",
                    }}
                    onClick={() => handleChooseTemplate(hub.WorkSpaceID)}
                    onContextMenu={(event) => {
                      event.preventDefault();
                      handleContextMenu(event, hub);
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      height: "32px",
                    }}
                  >
                    {isEditing &&
                    selectedHubRedux?.WorkSpaceID === hub.WorkSpaceID ? (
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        {/* Input thay đổi khi chọn rename */}
                        <Input
                          inputRef={inputRef}
                          value={newName}
                          onChange={handleChange}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              if (newName.trim().length === 0) return;
                              confirmRename();
                            }
                          }}
                          sx={{
                            color:
                              mode === "dark"
                                ? muiTheme.palette?.customBase?.base30
                                : muiTheme.palette?.customBase?.base50,
                            fontSize: "12px",
                          }}
                          inputProps={{
                            maxLength: 9,
                          }}
                        />
                        {/* IconButton cancel */}
                        <IconButton
                          onClick={cancelRename}
                          sx={{
                            color: "#858B93",
                          }}
                        >
                          <CloseIcon sx={{ fontSize: "16px" }} />
                        </IconButton>
                        {/* IconButton confirm */}
                        <IconButton
                          onClick={confirmRename}
                          disabled={newName.trim().length === 0}
                          sx={{
                            color: muiTheme.palette?.customGreen?.default,
                          }}
                        >
                          <CheckIcon sx={{ fontSize: "16px" }} />
                        </IconButton>
                      </Box>
                    ) : (
                      <Typography
                        variant="sub12-M18"
                        sx={{
                          color:
                            mode === "dark"
                              ? muiTheme.palette?.customBase?.base30
                              : "#1A1D1F !important",
                        }}
                      >
                        {hub.Name}
                      </Typography>
                    )}
                    {/* Hub được chọn sẽ không có viền xanh và mặc định */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      {!isEditing && (
                        <IconButton
                          onClick={() => togglePrioritize(hub.WorkSpaceID)}
                          disabled={hub.WorkSpaceID === hubDefault}
                          sx={{
                            cursor: "pointer",
                          }}
                        >
                          {hub.WorkSpaceID === hubDefault ? (
                            <StarIcon
                              sx={{
                                fontSize: "16px",
                                padding: 0,
                                color: muiTheme.palette?.customGreen?.default,
                              }}
                            />
                          ) : (
                            <BaseTooltip title={t("text_default_hub")}>
                              <StarOutlineIcon
                                sx={{
                                  fontSize: "16px",
                                  padding: 0,
                                  color: muiTheme.palette?.customGreen?.default,
                                }}
                              />
                            </BaseTooltip>
                          )}
                        </IconButton>
                      )}
                      {/*Khi rename thì không hiển thị icon */}
                      {!isEditing && (
                        <BaseTooltip title={t("text_option_hub")}>
                          <Typography
                            variant="h6"
                            sx={{
                              fontSize: "12px",
                              cursor: "pointer",
                              color:
                                mode === "dark"
                                  ? muiTheme.palette?.customBase?.base30
                                  : "rgba(133, 139, 147, 1) !important",
                              display: "flex",
                              alignItems: "center",
                            }}
                            onClick={(event) => handleClick(event, hub)}
                          >
                            <MoreHorizIcon />
                          </Typography>
                        </BaseTooltip>
                      )}
                    </Box>
                  </Box>
                  {/* Menu hiển thị khi click vào icon MoreHorizIcon */}
                  <Menu
                    anchorEl={anchorEl}
                    open={
                      Boolean(anchorEl) &&
                      selectedHubRedux?.WorkSpaceID === hub.WorkSpaceID &&
                      !isEditing
                    }
                    onClose={handleClose}
                    sx={{
                      marginLeft: "auto",
                      "& .MuiMenu-list": {
                        padding: 0,
                        borderRadius: "12px",
                      },
                    }}
                    slotProps={{
                      paper: {
                        sx: (theme) => ({
                          borderRadius: "12px",
                          boxShadow: "0px 4px 16px 0px rgba(0, 0, 0, 0.12)",
                          border: `1px solid ${theme.palette.customAdditional?.base4003}`,
                        }),
                      },
                    }}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  >
                    <MenuItem
                      onClick={handleRename}
                      sx={(theme) => ({
                        fontSize: "14px",
                        fontWeight: 500,
                        padding: "12px",
                        width: "154px",
                        borderTopLeftRadius: "12px",
                        borderTopRightRadius: "12px",
                        color: theme.palette.customBase?.base80,
                        background: theme.palette.customBase?.base20,
                        ...theme.applyStyles("dark", {
                          background: theme.palette.customBase?.base70,
                          color: theme.palette.customBase?.base20,
                        }),
                        "&:hover": {
                          background: theme.palette.customBase?.base25,
                          ...theme.applyStyles("dark", {
                            background: theme.palette.customBase?.base55,
                          }),
                        },
                      })}
                    >
                      {t("text_rename_hub")}
                    </MenuItem>
                    <MenuItem
                      onClick={handleDuplicate}
                      sx={(theme) => ({
                        fontSize: "14px",
                        fontWeight: 500,
                        padding: "12px",
                        width: "154px",
                        color: theme.palette.customBase?.base80,
                        background: theme.palette.customBase?.base20,
                        ...theme.applyStyles("dark", {
                          background: theme.palette.customBase?.base70,
                          color: theme.palette.customBase?.base20,
                        }),
                        "&:hover": {
                          background: theme.palette.customBase?.base25,
                          ...theme.applyStyles("dark", {
                            background: theme.palette.customBase?.base55,
                          }),
                        },
                      })}
                    >
                      {t("text_duplicate_hub")}
                    </MenuItem>
                    <MenuItem
                      onClick={handleRemove}
                      sx={(theme) => ({
                        fontSize: "14px",
                        fontWeight: 500,
                        padding: "12px",
                        width: "154px",
                        borderBottomLeftRadius: "12px",
                        borderBottomRightRadius: "12px",
                        color: theme.palette.customBase?.base80,
                        background: theme.palette.customBase?.base20,
                        ...theme.applyStyles("dark", {
                          background: theme.palette.customBase?.base70,
                          color: theme.palette.customBase?.base20,
                        }),
                        "&:hover": {
                          background: theme.palette.customBase?.base25,
                          ...theme.applyStyles("dark", {
                            background: theme.palette.customBase?.base55,
                          }),
                        },
                      })}
                    >
                      {t("text_remove_hub")}
                    </MenuItem>
                  </Menu>

                  {/* Menu hiển thị khi click chuột phải */}
                  <Menu
                    anchorEl={contextMenuAnchor}
                    open={
                      Boolean(contextMenuAnchor) &&
                      selectedHubRedux?.WorkSpaceID === hub.WorkSpaceID &&
                      !isEditing
                    }
                    onClose={handleContextMenuClose}
                    sx={{
                      "& .MuiMenu-list": {
                        padding: 0,
                        borderRadius: "12px",
                      },
                    }}
                    slotProps={{
                      paper: {
                        sx: (theme) => ({
                          borderRadius: "12px",
                          boxShadow: "0px 4px 16px 0px rgba(0, 0, 0, 0.12)",
                          border: `1px solid ${theme.palette.customAdditional?.base4003}`,
                        }),
                      },
                    }}
                    anchorReference="anchorPosition"
                    anchorPosition={
                      mousePosition
                        ? { top: mousePosition.y, left: mousePosition.x }
                        : undefined
                    }
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                  >
                    <MenuItem
                      onClick={handleRename}
                      sx={(theme) => ({
                        fontSize: "14px",
                        fontWeight: 500,
                        padding: "12px",
                        width: "154px",
                        borderTopLeftRadius: "12px",
                        borderTopRightRadius: "12px",
                        color: theme.palette.customBase?.base80,
                        background: theme.palette.customBase?.base20,
                        ...theme.applyStyles("dark", {
                          background: theme.palette.customBase?.base70,
                          color: theme.palette.customBase?.base20,
                        }),
                        "&:hover": {
                          background: theme.palette.customBase?.base25,
                          ...theme.applyStyles("dark", {
                            background: theme.palette.customBase?.base55,
                          }),
                        },
                      })}
                    >
                      {t("text_rename_hub")}
                    </MenuItem>
                    <MenuItem
                      onClick={handleDuplicate}
                      sx={(theme) => ({
                        fontSize: "14px",
                        fontWeight: 500,
                        padding: "12px",
                        width: "154px",
                        color: theme.palette.customBase?.base80,
                        background: theme.palette.customBase?.base20,
                        ...theme.applyStyles("dark", {
                          background: theme.palette.customBase?.base70,
                          color: theme.palette.customBase?.base20,
                        }),
                        "&:hover": {
                          background: theme.palette.customBase?.base25,
                          ...theme.applyStyles("dark", {
                            background: theme.palette.customBase?.base55,
                          }),
                        },
                      })}
                    >
                      {t("text_duplicate_hub")}
                    </MenuItem>
                    <MenuItem
                      onClick={handleRemove}
                      sx={(theme) => ({
                        fontSize: "14px",
                        fontWeight: 500,
                        padding: "12px",
                        width: "154px",
                        borderBottomLeftRadius: "12px",
                        borderBottomRightRadius: "12px",
                        color: theme.palette.customBase?.base80,
                        background: theme.palette.customBase?.base20,
                        ...theme.applyStyles("dark", {
                          background: theme.palette.customBase?.base70,
                          color: theme.palette.customBase?.base20,
                        }),
                        "&:hover": {
                          background: theme.palette.customBase?.base25,
                          ...theme.applyStyles("dark", {
                            background: theme.palette.customBase?.base55,
                          }),
                        },
                      })}
                    >
                      {t("text_remove_hub")}
                    </MenuItem>
                  </Menu>
                </Box>
              </Box>
            ))}
          </Box>
        </>
      ) : (
        <>
          {" "}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              justifyContent: "space-between",
              padding: "0px 12px 0px 0px",
            }}
          >
            <Typography
              variant="body16-B24"
              sx={{
                color: mode === "dark" ? "#FFFFFF" : "#1A1D1F !important",
              }}
            >
              {t("text_my_hub")}
            </Typography>
            {/* Tạo hub mới */}
            <Box onClick={handleCreateNew}>
              <Box
                sx={{
                  backgroundColor: muiTheme.palette?.customSupport?.primary5001,
                  borderRadius: "8px",
                  padding: "4px 12px",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  display: "flex",
                  gap: "6px",
                }}
              >
                <Typography
                  variant="body14-M21"
                  sx={(theme) => ({
                    color: theme.palette.customPrimary?.primary50,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  })}
                >
                  {t("text_create_new")}
                </Typography>
                <Image
                  src="/assets/icon/icon_news_hub.svg"
                  alt="plus"
                  width={16}
                  height={16}
                />
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              marginTop: "130px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingRight: "12px",
            }}
          >
            <Image
              src={
                mode === "dark"
                  ? "/assets/icon/Hub_signin.svg"
                  : "/assets/image/no_data_light.svg"
              }
              alt="MyHub"
              width={61.87}
              height={40}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "24px",
              paddingRight: "12px",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="body14-R21"
              sx={(theme) => ({
                color: theme.palette.customBase?.base40,
              })}
            >
              {t("text_warning_login")}
            </Typography>
            <Button
              variant="primary"
              size="xlarge"
              sx={{ marginTop: "40px" }}
              onClick={navigateLogin}
            >
              <Typography
                variant="body16-S24"
                sx={(theme) => ({
                  color: theme.palette.customBase?.baseWhite,
                })}
              >
                {t("text_login")}
              </Typography>
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default MyHubs;
