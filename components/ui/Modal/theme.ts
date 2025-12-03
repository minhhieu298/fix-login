import { Theme } from "@mui/material";

export const MuiModal = {
  styleOverrides: {
    root: ({ theme }: { theme: Theme }) => ({
      "& .custom-modal-container": {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        minWidth: 360,
        maxWidth: 400,
        width: "100%",
        backgroundColor:
          theme.palette.mode === "dark"
            ? theme.palette.customBase?.base80
            : theme.palette.customBase?.baseWhite,
        borderRadius: 16,
        padding: "32px 24px 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: theme.palette.mode === "dark" ? "#FFFFFF" : "#111315",
        gap: 32,
        outline: "none",

        ".custom-modal-content": {
          display: "flex",
          flexDirection: "column",
          gap: 32,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          ".custom-modal-text": {
            display: "flex",
            flexDirection: "column",
            gap: 16,
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            ".custom-modal-title": {
              color:
                theme.palette.mode === "dark"
                  ? theme.palette.customBase?.base20
                  : theme.palette.customBase?.base80,
              textAlign: "center",
            },
            ".custom-modal-message": {
              color:
                theme.palette.mode === "dark"
                  ? theme.palette.customBase?.base30
                  : theme.palette.customBase?.base50,
              textAlign: "center",
            },
          },
        },
        ".custom-modal-footer": {
          width: "100%",
          "custom-modal-action": {
            display: "flex",
            alignItems: "center",
          },
        },
      },
    }),
  },
};
