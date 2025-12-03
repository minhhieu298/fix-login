import dynamic from "next/dynamic";

import Hermet from "@/components/common/TitlePage";
import LayoutSession from "@/components/Layout/LayoutSession/LayoutSession";
import LoadingPage from "@/components/Layout/LoadingPage";

const ReportCashSettlementSSR = dynamic(
  () => import("report/ReportCashSettlement"),
  {
    ssr: false,
    loading: () => <LoadingPage />,
  }
);

const CashSettlement = () => {
  return (
    <Hermet title="Sao kê tiền">
      <LayoutSession>
        <ReportCashSettlementSSR />
      </LayoutSession>
    </Hermet>
  );
};

export default CashSettlement;
