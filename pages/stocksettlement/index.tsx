import dynamic from "next/dynamic";

import Hermet from "@/components/common/TitlePage";
import LayoutSession from "@/components/Layout/LayoutSession/LayoutSession";
import LoadingPage from "@/components/Layout/LoadingPage";

const ReportStockSettlementSSR = dynamic(
  () => import("report/ReportStockSettlement"),
  {
    ssr: false,
    loading: () => <LoadingPage />,
  }
);

const StockSettlement = () => {
  return (
    <Hermet title="Sao kê chứng khoán">
      <LayoutSession>
        <ReportStockSettlementSSR />
      </LayoutSession>
    </Hermet>
  );
};

export default StockSettlement;
