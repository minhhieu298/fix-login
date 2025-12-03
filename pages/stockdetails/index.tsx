import dynamic from "next/dynamic";

import Hermet from "@/components/common/TitlePage";
import LayoutSession from "@/components/Layout/LayoutSession/LayoutSession";
import LoadingPage from "@/components/Layout/LoadingPage";

const StockDetailsSRR = dynamic(() => import("report/StockDetails"), {
  ssr: false,
  loading: () => <LoadingPage />,
});

const StockDetails = () => {
  return (
    <Hermet title="Số dư chứng khoán">
      <LayoutSession>
        <StockDetailsSRR />
      </LayoutSession>
    </Hermet>
  );
};

export default StockDetails;
