import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

import { useCustomLanguage } from "@/hooks/useCustomLanguage";
import { useCustomTheme } from "@/hooks/useCustomTheme";

const AddWidget = (props: {
  onAdd: (_event: React.MouseEvent<HTMLElement>) => void;
  open: boolean;
}) => {
  const { muiTheme, mode } = useCustomTheme();
  const { t } = useCustomLanguage();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        borderRadius: "8px",
        color: "#FFFFFF",
      }}
    >
      <Image
        src="/assets/image/add-widget.png"
        alt="add-widget"
        width={124}
        height={86}
        priority
      />
      <Typography
        variant="body14-M21"
        sx={{
          margin: "32px 0 32px 0",
          color:
            mode === "dark"
              ? muiTheme?.palette?.customBase?.base20
              : muiTheme?.palette?.customBase?.base80,
        }}
      >
        {t("text_add_widget_description")}
      </Typography>
      {!props.open ? (
        <Button
          variant="contained"
          color="primary"
          onClick={props.onAdd}
          size="large"
          sx={{
            borderRadius: "12px",
            width: "174px",
            height: "48px",
            padding: "0 !important",
            fontFamily: "Manrope",
            textTransform: "none",
            fontSize: "16px",
            fontWeight: 600,
            color: muiTheme?.palette?.customBase?.baseWhite,
            backgroundColor: muiTheme?.palette?.customPrimary?.primary50,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Typography variant="body16-S24">{t("text_add_widget")}</Typography>
            <Typography sx={{ fontSize: "30px" }}>+</Typography>
          </Box>
        </Button>
      ) : null}
    </Box>
  );
};

export default AddWidget;
