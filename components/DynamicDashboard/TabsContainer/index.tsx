import { Box } from "@mui/material";
import React from "react";

import { TabsContainerProps } from "@/interface/ui/DynamicDashboard/interface";

import styles from "../../../styles/dynamicDashboard.module.css";

const TabsContainer: React.FC<TabsContainerProps> = (
  props: TabsContainerProps
) => {
  const { tabsContainerRef } = props;

  return (
    <Box
      className={styles["dynamic-dashboard-tabs-container"]}
      ref={tabsContainerRef}
    >
      <Box className={styles["widget-container"]}>{""}</Box>
    </Box>
  );
};

export default TabsContainer;
