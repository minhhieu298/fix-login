import {
  Avatar,
  Box,
  Skeleton,
  Stack,
  styled,
  Typography,
} from "@mui/material";

import ClockAPI from "@/hooks/useClock";

import StatusWebSite from "./StatusWebSite";

export const CustomIconMenuFunction = styled(Stack)(() => ({
  width: 36,
  height: 36,
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 16,
  cursor: "pointer",
}));

export const CustomAvatar = (props: {
  avatarInfo: string;
  name: string;
  onClick?: (_event: React.MouseEvent<HTMLElement>) => void;
}) => {
  const { avatarInfo, name, onClick } = props;
  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        alignItems: "center",
        gap: 3,
        minWidth: "152px",
        cursor: onClick ? "pointer" : "default",
        ...theme.applyStyles("dark", {
          color: theme.palette.customBase?.base20,
        }),
        ...theme.applyStyles("light", {
          color: theme.palette.customBase?.base80,
        }),
        textTransform: "capitalize",
      })}
      onClick={onClick}
    >
      <Avatar
        src={avatarInfo || "/assets/icon/icon_user.svg"}
        alt="avatar"
        sx={{
          width: 28,
          height: 28,
          padding: avatarInfo ? "0px" : "3px",
          "& .MuiAvatar-img": {
            borderRadius: "50px",
          },
        }}
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {name ? (
          <Typography
            variant="body14-M21"
            sx={(theme) => ({
              textWrap: "nowrap",
              color: theme.palette.customBase?.base80,
              ...theme.applyStyles("dark", {
                color: theme.palette.customBase?.base20,
              }),
            })}
          >
            {name}
          </Typography>
        ) : (
          <Skeleton
            variant="rectangular"
            animation="wave"
            width={109}
            height={21}
          />
        )}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <ClockAPI />
          <StatusWebSite />
          <Typography
            variant="sub10-R15"
            sx={(theme) => ({
              textWrap: "nowrap",
              color: theme.palette.customBase?.base80,
              ...theme.applyStyles("dark", {
                color: theme.palette.customBase?.base20,
              }),
            })}
          >
            Đã kết nối
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
