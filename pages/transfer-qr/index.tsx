import dynamic from "next/dynamic";
import React from "react";

import Hermet from "@/components/common/TitlePage";
import LayoutSession from "@/components/Layout/LayoutSession/LayoutSession";
import LoadingPage from "@/components/Layout/LoadingPage";

const TransferOrderQR = dynamic(() => import("transfer/TransferQR"), {
  ssr: false,
  loading: () => <LoadingPage />,
});

const OrderTransferQR = () => {
  return (
    <Hermet title="Chuyển tiền QRCode">
      <LayoutSession>
        <TransferOrderQR />
      </LayoutSession>
    </Hermet>
  );
};

export default OrderTransferQR;
