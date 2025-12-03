import { Badge, Box, Typography } from "@mui/material";

import { CloseIcon } from "../icons/CloseIcon";

interface IHistoryItemProps {
  title: string;
  type: "stock" | "function" | "ezhub";
  onClose: () => void;
  onClick?: () => void;
}

const HistoryItem = (props: IHistoryItemProps) => {
  const { title, type, onClose, onClick } = props;
  return (
    <Badge
      size="xsmall"
      type="rounded"
      sx={(theme) => ({
        height: "28px",
        backgroundColor:
          type === "stock"
            ? theme.palette.customAdditional?.base4003
            : type === "function"
              ? theme.palette.customSupport?.orangedefault03
              : theme.palette.customSupport?.greendefault03,
        padding: "5px 12px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer",
      })}
      onClick={onClick}
    >
      <Typography
        variant="sub12-M18"
        sx={(theme) => ({
          color: theme.palette.customBase?.base80,
          ...theme.applyStyles("dark", {
            color: theme.palette.customBase?.base10,
          }),
        })}
      >
        {title}
      </Typography>
      <Box
        sx={(theme) => ({
          cursor: "pointer",
          color: theme.palette.customBase?.base40,
          "&:hover": {
            color: theme.palette.customBase?.base30,
          },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        })}
        onClick={(e) => {
          e.stopPropagation(); // Prevent triggering parent onClick
          onClose();
        }}
      >
        <CloseIcon width={12} height={12} />
      </Box>
    </Badge>
  );
};

export default HistoryItem;
