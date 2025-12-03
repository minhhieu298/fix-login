"use client";
import "flexlayout-react/style/dark.css";

import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";
import {
  Action,
  IIcons,
  IJsonModel,
  IJsonRowNode,
  IJsonTabNode,
  IJsonTabSetNode,
  ITabRenderValues,
  Layout,
  Model,
  TabNode,
} from "flexlayout-react";
import _ from "lodash";
import Image from "next/image";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";

import DragPreview from "@/components/DynamicDashboard/DragPreview";
import Factory from "@/components/DynamicDashboard/Factory";
import LinkPopper from "@/components/DynamicDashboard/LinkPopper";
import TabsContainer from "@/components/DynamicDashboard/TabsContainer";
import {
  i18nMapper,
  iconToKey,
  professionalConfigLogout,
} from "@/constants/dynamic-dashboard/constant";
import { useWidgetContext } from "@/context/WidgetContext";
import { useCustomLanguage } from "@/hooks/useCustomLanguage";
import { useCustomTheme } from "@/hooks/useCustomTheme";
import { IResponseLogin } from "@/interface/interface";
import { DataEzhub, UpdateWorkspacePayload } from "@/interface/MyHub/interface";
import { IMenuSection } from "@/interface/ui/DynamicDashboard/interface";
import { ezhubActions } from "@/store/reducers/ezHub.reducer";
import styles from "@/styles/dynamicDashboard.module.css";

import { MaximizeIcon } from "../Icons/MaximizeIcon";
import { MinimizeIcon } from "../Icons/MinimizeIcon";
import LoadingPage from "../LoadingPage";
import AddWidget from "./addWidget";
import { IDynamicDashboard } from "./interface";
import RenderNameTab from "./RenderNameTab";

const DynamicDashboard: React.FC<IDynamicDashboard> = (props) => {
  const {
    dragStartedRef,
    layoutRef,
    setMenuSectionsState,
    isDragging,
    dragPosition,
    setDragPosition,
    dragComponent,
  } = props;
  const dispatch = useDispatch();
  const { t } = useCustomLanguage();

  const [anchorElLink, setAnchorElLink] = useState<null | HTMLElement>(null);
  const [currentNode, setCurrentNode] = useState<TabNode | null>(null);
  const [currentActiveTabId, setCurrentActiveTabId] = useState<string | null>(
    null
  );
  const [isMounted, setIsMounted] = useState(false);
  const { open, setOpen } = useWidgetContext();
  const detailWorkspace = useSelector(
    (state: {
      ezhubReducer: {
        detailWorkspace: UpdateWorkspacePayload;
      };
    }) => state.ezhubReducer.detailWorkspace
  );
  const isLoadingLayout = useSelector(
    (state: {
      ezhubReducer: {
        isLoadingLayout: boolean;
      };
    }) => state.ezhubReducer.isLoadingLayout
  );

  const settingLayout = useSelector(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state: any) => state.settingReducer.setting
  );

  const userInfo2FA = useSelector(
    (state: {
      AuthReducer: {
        userInfo2FA: IResponseLogin;
      };
    }) => state.AuthReducer.userInfo2FA
  );

  const { muiTheme, mode } = useCustomTheme();

  const renderedHubId = useSelector(
    (state: {
      ezhubReducer: {
        renderedHubId: number;
      };
    }) => state.ezhubReducer.renderedHubId
  );

  const dataEzhub = useSelector(
    (state: {
      ezhubReducer: {
        dataEzhub: DataEzhub | null;
      };
    }) => state.ezhubReducer.dataEzhub
  );

  const isWorkspaceSelectedFromSearch = useSelector(
    (state: {
      ezhubReducer: {
        isWorkspaceSelectedFromSearch: boolean;
      };
    }) => state.ezhubReducer.isWorkspaceSelectedFromSearch
  );

  const model = useMemo(() => {
    return Model.fromJson(detailWorkspace.JsonModel);
  }, [detailWorkspace.JsonModel]);

  // Kiểm tra xem có đang load data workspace không
  const isWorkspaceLoading =
    !detailWorkspace?.JsonModel ||
    Object.keys(detailWorkspace.JsonModel).length === 0;

  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const { setAnchorEl } = useWidgetContext();

  useEffect(() => {
    if (tabsContainerRef.current) {
      setAnchorEl(tabsContainerRef.current);
    }
  }, [tabsContainerRef.current]);

  useEffect(() => {
    // Delay để đảm bảo component đã mount hoàn toàn
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!userInfo2FA.Data?.ATRANSACTION) {
      dispatch(
        ezhubActions.setModelAction(
          Model.fromJson(professionalConfigLogout).toJson()
        )
      );
      dispatch(ezhubActions.setrenderedHubId(null));
    }
  }, [userInfo2FA.Data?.ATRANSACTION]);

  // Load workspace default khi quay về trang chủ
  useEffect(() => {
    if (userInfo2FA.Data?.ATRANSACTION && dataEzhub) {
      if (isWorkspaceSelectedFromSearch) {
        // Reset flag sau chọn hub từ Search
        dispatch(ezhubActions.setWorkspaceSelectedFromSearch(false));
        return;
      }
      // Nếu có default workspace và chưa có renderedHubId hoặc đang render workspace khác
      if (
        dataEzhub.Default &&
        (!renderedHubId || renderedHubId !== dataEzhub.Default)
      ) {
        dispatch(ezhubActions.setrenderedHubId(dataEzhub.Default));
        dispatch(ezhubActions.getWorkspaceDetailAction(dataEzhub.Default));
      }
    }
  }, [JSON.stringify(userInfo2FA)]);

  //Hàm xử lý khi thay đổi model
  const handleModelChange = useCallback(
    (model: Model, action: Action) => {
      const isFromLeadingButton = ["FlexLayout_SetActiveTabset"].includes(
        action.type
      );

      // Kiểm tra đặc biệt cho FlexLayout_SelectTab
      if (action.type === "FlexLayout_SelectTab" && action.data) {
        const tabId = action.data.tabNode;

        if (currentActiveTabId === tabId) {
          return;
        }

        setCurrentActiveTabId(tabId);
      }

      if (!isFromLeadingButton && renderedHubId) {
        dispatch(
          ezhubActions.updateWorkspaceAction({
            WorkSpaceID: renderedHubId,
            JsonModel: JSON.stringify(model.toJson()),
          })
        );
      }
    },
    [dispatch, renderedHubId, currentActiveTabId]
  );

  //Nút Add Widget
  const handleClick = () => {
    if (tabsContainerRef.current) {
      setOpen(true);
    }
  };

  //Hàm xử lý tooltip khi kéo thả widget
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setDragPosition({
          x: e.clientX,
          y: e.clientY - 65,
        });
      }
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDragging, setDragPosition]);

  //Thay icon
  const icons: IIcons = {
    close: (): React.ReactNode => (
      <CloseIcon
        className={styles["tabnode-close-icon"]}
        sx={{ color: muiTheme.palette?.customBase?.base40 }}
      />
    ),
    maximize: (): React.ReactNode => (
      <Box
        sx={(theme) => ({
          width: "16px",
          height: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: theme.palette.customBase?.base40,
          "&:hover": {
            color: theme.palette.customBase?.base30,
          },
        })}
      >
        <MaximizeIcon width={16} height={16} />
      </Box>
    ),
    restore: (): React.ReactNode => (
      <Box
        sx={(theme) => ({
          width: "16px",
          height: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: theme.palette.customBase?.base40,
          "&:hover": {
            color: theme.palette.customBase?.base30,
          },
        })}
      >
        <MinimizeIcon width={16} height={16} />
      </Box>
    ),
  };

  //Hàm xử lý khi thay đổi icon Link
  const handleIconChange = useCallback(
    (iconPath: string, node: TabNode) => {
      const modelJson: IJsonModel = _.cloneDeep(detailWorkspace.JsonModel);
      const oldIcon = node.getIcon();
      const oldKey = iconToKey[oldIcon ?? ""] ?? 1;
      const newKey = iconToKey[iconPath ?? ""] ?? 1;

      if (oldKey === newKey) {
        return;
      }

      const updateIconInJson = (
        layout: IJsonRowNode | IJsonTabSetNode | IJsonTabNode
      ): boolean => {
        if (layout.type === "tab" && layout.id === node.getId()) {
          (layout as IJsonTabNode).icon = iconPath;
          return true;
        }

        if ("children" in layout && layout.children) {
          for (const child of layout.children) {
            if (updateIconInJson(child)) {
              return true;
            }
          }
        }
        return false;
      };

      updateIconInJson(modelJson.layout);
      if (detailWorkspace && detailWorkspace.WorkSpaceID) {
        dispatch(
          ezhubActions.updateWorkspaceAction({
            WorkSpaceID: detailWorkspace.WorkSpaceID,
            JsonModel: JSON.stringify(modelJson),
            Links: detailWorkspace.Links.map((item) =>
              item.Key === newKey
                ? {
                    ...item,
                    LinkId: _.uniq([...item.LinkId, node.getId()]),
                  }
                : {
                    ...item,
                    LinkId:
                      item.LinkId.length > 0
                        ? item.LinkId.filter((id) => id !== node.getId())
                        : [],
                  }
            ),
          })
        );
      } else {
        dispatch(ezhubActions.setModelAction(modelJson));
      }
    },
    [detailWorkspace, dispatch, iconToKey]
  );

  const handleRenderTab = useCallback(
    (node: TabNode, renderValues: ITabRenderValues) => {
      const iconElement = (
        <Image
          src={node.getIcon() || "/assets/icon/unlink.svg"}
          alt="tab-icon"
          width={16}
          height={16}
          style={{ cursor: "pointer" }}
          onMouseEnter={(e) => {
            setCurrentNode(node);
            setAnchorElLink(e.currentTarget);
          }}
          onMouseLeave={() => {
            setTimeout(() => {
              const popperElement = document.getElementById("link-popper");
              if (popperElement && !popperElement.matches(":hover")) {
                setAnchorElLink(null);
              }
            }, 100);
          }}
        />
      );

      const titleElement = (
        <RenderNameTab node={node} renderValues={renderValues} />
      );

      renderValues.leading = iconElement;
      renderValues.content = titleElement;
    },
    [setCurrentNode, setAnchorElLink]
  );

  const handleRenderTabTemplate = useCallback(
    (node: TabNode, renderValues: ITabRenderValues) => {
      renderValues.content = t(renderValues.name);
    },
    []
  );

  //Hàm xử lý khi thay đổi số lượng widget trong WidgetPopper
  const calculateCurrentCounts = useCallback((modelJson: IJsonModel) => {
    const componentCounts: { [key: string]: number } = {};

    const countComponents = (
      layout: IJsonRowNode | IJsonTabSetNode | IJsonTabNode
    ) => {
      if (layout.type === "tab") {
        const component = (layout as IJsonTabNode).component;
        if (component) {
          componentCounts[component] = (componentCounts[component] || 0) + 1;
        }
      }
      if ("children" in layout && layout.children) {
        layout.children.forEach(countComponents);
      }
    };

    if (modelJson?.layout) {
      countComponents(modelJson.layout);
    }

    setMenuSectionsState((prevState: IMenuSection[]) =>
      prevState.map((section) => ({
        ...section,
        items: section.items.map((item) => ({
          ...item,
          currentCount: componentCounts[item.component] || 0,
        })),
      }))
    );
  }, []);

  useEffect(() => {
    if (detailWorkspace?.JsonModel) {
      calculateCurrentCounts(detailWorkspace.JsonModel);
    }
  }, [renderedHubId, detailWorkspace?.JsonModel]);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragStartedRef.current = false;
  };

  return (
    <Box
      sx={{
        maxHeight: "100%",
        overflowY: "auto",
        width: "100%",
      }}
    >
      <Box
        className={styles["dynamic-dashboard-container"]}
        sx={{
          height:
            settingLayout?.position === "Left" ||
            settingLayout?.position === "Right"
              ? "calc(100vh - 99px)"
              : settingLayout?.position === "Bottom"
                ? "calc(100vh - 76px)"
                : "calc(100vh - 76px)",
          "@media (max-width: 1440px)": {
            height:
              settingLayout?.position === "Left" ||
              settingLayout?.position === "Right"
                ? "calc(100vh - 99px)"
                : settingLayout?.position === "Bottom"
                  ? "calc(100vh - 76px)"
                  : "calc(100vh - 76px)",
          },
          "@media (max-width: 1279px)": {
            height: "calc(100vh - 84px)",
          },
        }}
      >
        <TabsContainer tabsContainerRef={tabsContainerRef} />

        <Box
          className={`${styles["layout-content"]} ${
            mode === "light" ? styles["layout-content-light"] : ""
          }`}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          {userInfo2FA.Data?.ATRANSACTION ? (
            !isLoadingLayout && !isWorkspaceLoading && isMounted ? (
              renderedHubId ? (
                <Layout
                  factory={(node) => (
                    <Factory node={node} detailWorkspace={detailWorkspace} />
                  )}
                  icons={icons}
                  model={model}
                  ref={layoutRef}
                  onModelChange={handleModelChange}
                  onRenderTab={handleRenderTab}
                  i18nMapper={(i) => i18nMapper(i, t)}
                  onTabSetPlaceHolder={() => (
                    <Box
                      className={styles["tabnode-wrapper"]}
                      sx={{ display: "flex" }}
                    >
                      <AddWidget onAdd={handleClick} open={open} />
                    </Box>
                  )}
                />
              ) : (
                <Layout
                  factory={(node) => (
                    <Factory node={node} detailWorkspace={detailWorkspace} />
                  )}
                  icons={icons}
                  onRenderTab={handleRenderTabTemplate}
                  model={Model.fromJson(detailWorkspace.JsonModel)}
                  i18nMapper={(i) => i18nMapper(i, t)}
                />
              )
            ) : (
              <LoadingPage />
            )
          ) : isMounted && !isWorkspaceLoading ? (
            <Layout
              factory={(node) => (
                <Factory node={node} detailWorkspace={detailWorkspace} />
              )}
              icons={icons}
              onRenderTab={handleRenderTabTemplate}
              model={Model.fromJson(detailWorkspace.JsonModel)}
              i18nMapper={(i) => i18nMapper(i, t)}
            />
          ) : (
            <LoadingPage />
          )}
        </Box>

        {isDragging
          ? createPortal(
              <DragPreview
                component={dragComponent}
                style={{
                  transform: `translate(${dragPosition.x}px, ${dragPosition.y}px)`,
                  position: "fixed",
                  left: 0,
                  top: 0,
                  pointerEvents: "none",
                }}
              />,
              document.body
            )
          : null}
        {anchorElLink && userInfo2FA.Data?.ATRANSACTION ? (
          <LinkPopper
            anchorEl={anchorElLink}
            open={Boolean(anchorElLink)}
            onClose={() => setAnchorElLink(null)}
            onSelectIcon={handleIconChange}
            currentNode={currentNode}
          />
        ) : null}
      </Box>
    </Box>
  );
};

export default React.memo(DynamicDashboard);
