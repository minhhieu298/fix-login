import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import React, { memo } from "react";

import BaseTooltip from "@/components/ui/BaseTooltip";
import { useCustomLanguage } from "@/hooks/useCustomLanguage";
import { handleFolderMenuIcon } from "@/utils";

import styles from "../editMenuIcons.module.css";
import { IMenuBarIcon as MenuBarIconType } from "../interface";
interface MenuBarIconProps {
  icon: MenuBarIconType;
  showTextMenuBar: boolean;
  onRemove: (_id: string) => void;
  iconPack: string;
  theme: string;
  id: string;
  arrayIcon: string[];
}

const MenuBarIconComponent: React.FC<MenuBarIconProps> = ({
  icon,
  showTextMenuBar,
  onRemove,
  iconPack,
  theme,
  id,
  arrayIcon,
}) => {
  const { t } = useCustomLanguage();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleMinusClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onRemove(icon.id);
  };

  return (
    <Box
      sx={{
        padding: showTextMenuBar ? "1px 0px" : "10px 16px",
        position: "relative",
      }}
      ref={setNodeRef}
      style={style}
    >
      {arrayIcon && arrayIcon.length > 4 ? (
        <IconButton
          sx={{
            padding: 0,
            position: "absolute",
            top: showTextMenuBar ? "-5px" : "5px",
            right: showTextMenuBar ? "11px" : "9px",
            cursor: "pointer",
            zIndex: 1,
            "&:hover": {
              transform: "scale(1.1)",
              filter: "brightness(1.5)",
            },
          }}
          onClick={handleMinusClick}
        >
          <Image
            src="/assets/icon/icon_minus.svg"
            alt="minus"
            width={16}
            height={16}
          />
        </IconButton>
      ) : null}
      <BaseTooltip title={t(icon.name)} placement="bottom">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "4px",
            cursor: "grab",
          }}
          {...attributes}
          {...listeners}
        >
          <IconButton sx={{ padding: 0, cursor: "grab" }}>
            <Image
              src={`/assets/${handleFolderMenuIcon(iconPack, theme)}/${
                icon.path
              }`}
              alt="icon-selected"
              width={showTextMenuBar ? 20 : 24}
              height={showTextMenuBar ? 20 : 24}
            />
          </IconButton>
          {showTextMenuBar && (
            <Typography
              variant="sub12-M18"
              sx={{ textAlign: "center" }}
              className={styles.truncate}
            >
              {t(icon.name)}
            </Typography>
          )}
        </Box>
      </BaseTooltip>
    </Box>
  );
};

export const MenuBarIcon = memo(MenuBarIconComponent);
