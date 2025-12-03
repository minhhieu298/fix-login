import { Box, Typography } from "@mui/material";
import Image from "next/image";

import { useCustomTheme } from "@/hooks/useCustomTheme";

const EmptyData = ({
  title,
  button,
}: {
  title: string;
  button?: React.ReactNode;
}) => {
  const { mode } = useCustomTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        gap: "24px",
      }}
    >
      <Image
        src={
          mode === "dark"
            ? "/assets/icon/Hub_signin.svg"
            : "/assets/image/no_data_light.svg"
        }
        alt="MyHub"
        width={61.44}
        height={40}
      />
      <Typography
        variant="body14-R21"
        sx={(theme) => ({
          color: theme.palette.customBase?.base40,
        })}
      >
        {title}
      </Typography>
      {button}
    </Box>
  );
};

export default EmptyData;
