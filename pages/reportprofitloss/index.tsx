import dynamic from "next/dynamic";

import Hermet from "@/components/common/TitlePage";
import LayoutSession from "@/components/Layout/LayoutSession/LayoutSession";
import LoadingPage from "@/components/Layout/LoadingPage";

const ReportProfitLossSSR = dynamic(() => import("report/ReportProfitLoss"), {
  ssr: false,
  loading: () => <LoadingPage />,
});

const ReportProfitLoss = () => {
  return (
    <Hermet title="Lãi lỗ thực hiện">
      <LayoutSession>
        <ReportProfitLossSSR />
      </LayoutSession>
    </Hermet>
  );
};

export default ReportProfitLoss;
