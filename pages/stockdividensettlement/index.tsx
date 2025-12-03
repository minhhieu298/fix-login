import dynamic from "next/dynamic";

import Hermet from "@/components/common/TitlePage";
import LayoutSession from "@/components/Layout/LayoutSession/LayoutSession";
import LoadingPage from "@/components/Layout/LoadingPage";

const ReportStockDividenSettlementSSR = dynamic(
  () => import("report/ReportStockDividenSettlement"),
  {
    ssr: false,
    loading: () => <LoadingPage />,
  }
);

const StockDividenSettlement = () => {
  return (
    <Hermet title="Sao kê quyền CP">
      <LayoutSession>
        <ReportStockDividenSettlementSSR />
      </LayoutSession>
    </Hermet>
  );
};

export default StockDividenSettlement;
