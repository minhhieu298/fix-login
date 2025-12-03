import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import QRCode from "react-qr-code";

import style from "../login.module.scss";

const LoginQr = () => {
  const CustomSectionTypography = (label: string) => {
    return (
      <Typography
        variant="body14-M21"
        sx={{
          color: (theme) => theme.palette.customBase?.base40,
        }}
      >
        {label}
      </Typography>
    );
  };
  return (
    <Box
      className={style.custom_box}
      sx={{
        alignContent: "center",
        justifyContent: "center",
        gap: 5,
        mb: 13,
        mt: 9,
      }}
    >
      <Stack alignItems="center" width="100%" gap={5}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            background: "#ffffff",
            padding: "10px",
          }}
        >
          <QRCode size={140} value="abc" />
        </Box>
        <Box
          sx={(theme) => ({
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 3,
            ".timing": {
              width: "44px",
              height: " 44px",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderWidth: "1.5px",
              borderStyle: "solid",
              color: theme.palette.customBase?.base40,
              borderColor: theme.palette.customBase?.base60,
              ...theme.applyStyles("dark", {
                borderColor: theme.palette.customBase?.base40,
              }),
            },
          })}
        >
          <Typography
            variant="body16-S24"
            sx={{
              color: (theme) =>
                theme.palette.mode === "dark"
                  ? theme.palette.customBase?.base40
                  : theme.palette.customBase?.base60,
            }}
          >
            QR code will expired in
          </Typography>
          <div className="timing">30s</div>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <Image
            src="/assets/icon/icon_alert.svg"
            alt=""
            width={12}
            height={12}
            style={{ marginTop: 5 }}
          />
          <Box className={style.custom_box} sx={{ gap: "3px" }}>
            {CustomSectionTypography("1. Log in to your mobile ap")}
            {CustomSectionTypography(
              "2. Select the QR code symbol at the top left"
            )}
            {CustomSectionTypography("3. Scan the QR code above to log in")}
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default LoginQr;
