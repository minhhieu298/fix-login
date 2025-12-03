import { Tab, Tabs } from "@mui/material";
import React, { useState } from "react";

import { CustomTabsProps } from "./types";

export const CustomTabs = React.forwardRef<HTMLDivElement, CustomTabsProps>(
  (props, ref) => {
    const { defaultTab, onTabChange, tabs, option } = props;
    const [value, setValue] = useState(defaultTab);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
      if (onTabChange) {
        onTabChange(event, newValue);
      }
    };

    switch (option) {
      case "1":
        return (
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            ref={ref}
            slotProps={{
              indicator: {
                sx: {
                  height: "4px", // Chiều cao của indicator
                  backgroundColor: "transparent", // Loại bỏ màu mặc định nếu muốn
                  "&::after": {
                    content: `" "`,
                    display: "block",
                    position: "absolute",
                    width: 12,
                    height: 4,
                    background: "red", // Màu của nội dung
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  },
                },
              },
            }}
          >
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                label={<p>{tab.label}</p>}
                id={`tab-${index}`}
                disableTouchRipple
              />
            ))}
          </Tabs>
        );
      case "2":
        return (
          <Tabs
            ref={ref}
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            indicatorColor="secondary"
            slotProps={{
              indicator: {
                style: {
                  display: "none",
                },
              },
            }}
          >
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                className="BadgeTab"
                label={<p>{tab.label}</p>}
                id={`tab-${index}`}
                disableTouchRipple
              />
            ))}
          </Tabs>
        );
      default:
    }
  }
);

CustomTabs.displayName = "CustomTabs";

// Optionally, memoize the component if needed
export default React.memo(CustomTabs);
