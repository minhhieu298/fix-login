import { Box, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";

import { IMenuBarIcon } from "@/components/Layout/Settings/EditMenuIcons/interface";
import { useCustomLanguage } from "@/hooks/useCustomLanguage";
import { handleFolderMenuIcon } from "@/utils";

import { ArrowCross } from "../../icons/ArrowCross";
import styles from "../index.module.css";

interface MenuMobileItemProps {
  icon: IMenuBarIcon;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  settingInfo: any;
}

const MenuMobileItem = ({ icon, settingInfo }: MenuMobileItemProps) => {
  const { t } = useCustomLanguage();
  const router = useRouter();

  return (
    <Box
      className={styles.menuItem}
      key={icon.id}
      onClick={() => router.push(icon.url || "", undefined, { shallow: true })}
    >
      <Image
        src={`/assets/${handleFolderMenuIcon(
          settingInfo?.iconPack,
          settingInfo?.theme
        )}/${icon.path}`}
        width={24}
        height={24}
        alt="icon 1"
      />
      <Typography
        variant="sub12-M18"
        sx={(theme) => ({
          flex: 1,
          color: theme.palette.customBase?.base80,
          ...theme.applyStyles("dark", {
            color: theme.palette.customBase?.base20,
          }),
        })}
      >
        {t(icon.name)}
      </Typography>
      <IconButton
        sx={(theme) => ({
          padding: "0px",
          color: theme.palette.customBase?.base40,
          "&:hover": {
            color: theme.palette.customBase?.base30,
          },
        })}
      >
        <ArrowCross width={16} height={16} />
      </IconButton>
    </Box>
  );
};

export default MenuMobileItem;
