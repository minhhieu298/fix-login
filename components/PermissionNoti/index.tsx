import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";

import { useCustomLanguage } from "@/hooks/useCustomLanguage";

import styles from "./index.module.css";

const PermissionNoti = (props: { handleBack: () => void }) => {
  const { handleBack } = props;
  const router = useRouter();
  const { t } = useCustomLanguage();
  const renderDescription = (image: string, description: string) => {
    return (
      <Box
        className={styles.descriptionBox}
        sx={(theme) => ({
          backgroundColor: theme.palette.customSupport?.primary5001,
        })}
      >
        <Image src={image} alt="image" width={120} height={120} />
        <Typography
          variant="body16-M24"
          sx={(theme) => ({
            color: theme.palette.customBase?.base80,
            ...theme.applyStyles("dark", {
              color: theme.palette.customBase?.base20,
            }),
          })}
        >
          {description}
        </Typography>
      </Box>
    );
  };

  return (
    <Box
      className={styles.container}
      sx={(theme) => ({
        backgroundColor: theme.palette.customBase?.baseWhite,
        ...theme.applyStyles("dark", {
          backgroundColor: theme.palette.customBase?.base80,
        }),
      })}
    >
      <Box className={styles.titleContainer}>
        <Typography
          variant="heading18-B27"
          sx={(theme) => ({
            color: theme.palette.customBase?.base80,
            ...theme.applyStyles("dark", {
              color: theme.palette.customBase?.base20,
            }),
          })}
        >
          {t("text_permission_noti_title")}
        </Typography>
        <Typography
          variant="body14-R21"
          sx={(theme) => ({
            color: theme.palette.customBase?.base40,
          })}
        >
          {t("text_permission_noti_subtitle")}
        </Typography>
      </Box>
      <Box className={styles.gridContainer}>
        {renderDescription(
          "/assets/image/permission_noti_1.png",
          t("text_permission_noti_description_1")
        )}
        {renderDescription(
          "/assets/image/permission_noti_2.png",
          t("text_permission_noti_description_2")
        )}
        {renderDescription(
          "/assets/image/permission_noti_3.png",
          t("text_permission_noti_description_3")
        )}
      </Box>

      <Box className={styles.buttonContainer}>
        <Typography
          variant="sub12-M18"
          className={styles.backText}
          sx={(theme) => ({
            color: theme.palette.customPrimary?.primary50,
            ":hover": {
              color: theme.palette.customPrimary?.primary40,
            },
          })}
          onClick={handleBack}
        >
          {t("text_screen_back")}
        </Typography>
        <Button
          variant="primary"
          size="small"
          className={styles.registerButton}
          onClick={() => {
            router.push("/registration");
          }}
        >
          {t("text_register_now")}
        </Button>
      </Box>
    </Box>
  );
};

export default PermissionNoti;
