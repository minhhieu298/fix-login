import { Box } from "@mui/material";
import { useEffect, useState } from "react";

import eventBus from "@/utils/event";

const StatusWebSite = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const handler = (status: boolean) => {
      setIsConnected(status);
    };

    eventBus.on("connectedSocket", handler);
    return () => {
      eventBus.off("signalr-status", handler);
    };
  }, []);

  return (
    <Box
      sx={(theme) => ({
        width: 6,
        height: 6,
        borderRadius: 100,
        background: isConnected
          ? theme.palette.customGreen?.default
          : theme.palette.customRed?.default,
      })}
    />
  );
};

export default StatusWebSite;
