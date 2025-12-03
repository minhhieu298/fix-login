/* eslint-disable @next/next/no-img-element */
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import * as React from "react";

import { useCustomTheme } from "@/hooks/useCustomTheme";
import { ILinkPopper } from "@/interface/ui/DynamicDashboard/interface";
import styles from "@/styles/dynamicDashboard.module.css";

const LinkPopper: React.FC<ILinkPopper> = (props) => {
  const { anchorEl, open, onClose, onSelectIcon, currentNode } = props;

  const { mode } = useCustomTheme();

  const id = open ? "link-popper" : undefined;

  const handleMouseLeave = () => {
    onClose();
  };

  const handleIconClick = (iconPath: string) => {
    if (currentNode && onSelectIcon) {
      onSelectIcon(iconPath, currentNode);
      onClose();
    }
  };

  return (
    <Popper
      id={id}
      open={open}
      anchorEl={anchorEl}
      placement="bottom-start"
      onMouseLeave={handleMouseLeave}
      sx={{
        zIndex: 1300,
        inset: "2px auto auto -8px !important",
      }}
    >
      <Box
        sx={{
          background: (theme) =>
            mode === "dark"
              ? theme.palette.customBase?.base60
              : theme.palette.customBase?.base20,
          padding: "8px",
          borderRadius: "4px",
          display: "flex",
          gap: "8px",
          zIndex: 1300,
          marginTop: "4px",
        }}
        className={styles.linkPopperWrapper}
      >
        <img
          src="assets/icon/unlink.svg"
          alt="unlink"
          width={16}
          height={16}
          style={{ cursor: "pointer" }}
          onClick={() => handleIconClick("assets/icon/unlink.svg")}
        />
        <img
          src="assets/icon/link-green.svg"
          alt="linkgreen"
          width={16}
          height={16}
          style={{ cursor: "pointer" }}
          onClick={() => handleIconClick("assets/icon/link-green.svg")}
        />
        <img
          src="assets/icon/link-orange.svg"
          alt="linkorange"
          width={16}
          height={16}
          style={{ cursor: "pointer" }}
          onClick={() => handleIconClick("assets/icon/link-orange.svg")}
        />
        <img
          src="assets/icon/link-purple.svg"
          alt="linkpurple"
          width={16}
          height={16}
          style={{ cursor: "pointer" }}
          onClick={() => handleIconClick("assets/icon/link-purple.svg")}
        />
        <img
          src="assets/icon/link-red.svg"
          alt="linkred"
          width={16}
          height={16}
          style={{ cursor: "pointer" }}
          onClick={() => handleIconClick("assets/icon/link-red.svg")}
        />
        <img
          src="assets/icon/link-blue.svg"
          alt="blue"
          width={16}
          height={20}
          style={{ cursor: "pointer" }}
          onClick={() => handleIconClick("assets/icon/link-blue.svg")}
        />
      </Box>
    </Popper>
  );
};

export default React.memo(LinkPopper);
