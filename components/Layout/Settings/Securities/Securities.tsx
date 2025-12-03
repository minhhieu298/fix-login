import Box from "@mui/material/Box";
import dynamic from "next/dynamic";
import Head from "next/head";

import LoadingPage from "../../LoadingPage";

const DynamicSecurities = dynamic(() => import("customer/Securities"), {
  ssr: false,
  loading: () => <LoadingPage />,
});

const Securities = () => {
  return (
    <>
      <Head>
        <title>Eztrade - Bảo mật</title>
      </Head>
      <Box height="100%">
        {/* <DynamicSecurities /> */}
        <DynamicSecurities />
      </Box>
    </>
  );
};

export default Securities;
