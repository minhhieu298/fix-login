import dynamic from "next/dynamic";

import Hermet from "@/components/common/TitlePage";
import LayoutSession from "@/components/Layout/LayoutSession/LayoutSession";
import LoadingPage from "@/components/Layout/LoadingPage";

const ReportProfitLossSSR = dynamic(() => import("report/LayoutPSOld"), {
  ssr: false,
  loading: () => <LoadingPage />,
});

const Reportprofitlossold = () => {
  return (
    <Hermet title="Báo cáo lãi lỗ phái sinh">
      <LayoutSession>
        <ReportProfitLossSSR />
      </LayoutSession>
    </Hermet>
  );
};

export default Reportprofitlossold;
