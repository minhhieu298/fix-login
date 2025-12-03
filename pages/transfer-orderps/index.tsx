import dynamic from "next/dynamic";
import React from "react";

import Hermet from "@/components/common/TitlePage";
import LayoutSession from "@/components/Layout/LayoutSession/LayoutSession";
import LoadingPage from "@/components/Layout/LoadingPage";

const TransferOrderPS = dynamic(() => import("transfer/TransferOrderPS"), {
  ssr: false,
  loading: () => <LoadingPage />,
});

const OrderPSTransfer = () => {
  return (
    <Hermet title="Chuyển tiền phái sinh">
      <LayoutSession>
        <TransferOrderPS />
      </LayoutSession>
    </Hermet>
  );
};

export default OrderPSTransfer;
