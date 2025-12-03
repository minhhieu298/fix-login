import { Layout, Model } from "flexlayout-react";
import { useCallback, useRef, useState } from "react";
import { useSelector } from "react-redux";

import Hermet from "@/components/common/TitlePage";
import WidgetPopper from "@/components/DynamicDashboard/WidgetPopper";
import DynamicDashboard from "@/components/Layout/DynamicDashboard";
import LayoutSession from "@/components/Layout/LayoutSession/LayoutSession";
import {
  countTabs,
  menuSections,
} from "@/constants/dynamic-dashboard/constant";
import { useWidgetContext } from "@/context/WidgetContext";
import { UpdateWorkspacePayload } from "@/interface/MyHub/interface";
import {
  IMenuSection,
  ITabJson,
} from "@/interface/ui/DynamicDashboard/interface";
import styles from "@/styles/dynamicDashboard.module.css";

export default function Home() {
  const dragStartedRef = useRef(false);
  const layoutRef = useRef<Layout>(null);

  const [menuSectionsState, setMenuSectionsState] =
    useState<IMenuSection[]>(menuSections);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [dragComponent, setDragComponent] = useState("");
  const { open, setOpen, anchorEl } = useWidgetContext();

  const detailWorkspace = useSelector(
    (state: {
      ezhubReducer: {
        detailWorkspace: UpdateWorkspacePayload;
      };
    }) => state.ezhubReducer.detailWorkspace
  );

  const handleDragStart = useCallback(
    (component: string, event: React.MouseEvent<HTMLDivElement>): void => {
      const item = menuSectionsState
        .flatMap((section) => section.items)
        .find((item) => item.component === component);

      if (item && item.currentCount >= item.maxCount) {
        event.preventDefault();
        return;
      }

      if (layoutRef.current) {
        const layout = layoutRef.current;

        const tabJson: ITabJson = {
          type: "tab",
          component,
          name: `${component}`,
          enableRename: false,
          className: styles["tabname-node"],
          icon: "assets/icon/unlink.svg",
        };

        // Set state trước cho cả hai trường hợp
        setIsDragging(true);
        setDragComponent(component);
        setDragPosition({
          x: event.clientX,
          y: event.clientY - 65,
        });

        if (countTabs(detailWorkspace.JsonModel.layout) === 0) {
          const model = Model.fromJson(detailWorkspace.JsonModel);
          const tabset = model
            .getRoot()
            .getChildren()
            .find((n) => n.getType() === "tabset");

          if (tabset) {
            layoutRef.current!.addTabWithDragAndDrop(
              tabset.getId(),
              tabJson,
              () => {
                setIsDragging(false);
              }
            );
          }
          event.preventDefault();
          return;
        }

        layout.addTabWithDragAndDrop(" ", tabJson, () => {
          setIsDragging(false);
        });
      }
    },
    [menuSectionsState, layoutRef, detailWorkspace]
  );

  const handleClickItem = (
    component: string,
    event: React.MouseEvent<HTMLDivElement>
  ): void => {
    handleDragStart(component, event);
    setOpen(false);
  };

  const closeWidgetPopper = () => setOpen(false);

  return (
    <Hermet title="Trang chủ">
      <LayoutSession>
        <DynamicDashboard
          layoutRef={layoutRef}
          setMenuSectionsState={setMenuSectionsState}
          dragStartedRef={dragStartedRef}
          isDragging={isDragging}
          dragComponent={dragComponent}
          setIsDragging={setIsDragging}
          setDragPosition={setDragPosition}
          dragPosition={dragPosition}
        />

        <WidgetPopper
          open={open}
          anchorEl={anchorEl}
          handleClose={closeWidgetPopper}
          menuSectionsState={menuSectionsState}
          handleDragStart={handleDragStart}
          handleClickItem={handleClickItem}
          dragStartedRef={dragStartedRef}
        />
      </LayoutSession>
    </Hermet>
  );
}
