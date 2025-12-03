import { Box } from "@mui/material";
import Lottie from "lottie-react";

import loadingAnimation from "@/public/assets/image/fpts-loading.json";
const LoadingPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <Lottie
        animationData={loadingAnimation}
        loop
        style={{ width: 32, height: 32 }}
      />
    </Box>
  );
};

export default LoadingPage;
