import dynamic from "next/dynamic";

import Hermet from "@/components/common/TitlePage";
import LayoutSession from "@/components/Layout/LayoutSession/LayoutSession";
import LoadingPage from "@/components/Layout/LoadingPage";

const ReportTranSumarySSR = dynamic(() => import("report/ReportTranSumary"), {
  ssr: false,
  loading: () => <LoadingPage />,
});

const ReportTranSumary = () => {
  return (
    <Hermet title="Giao dịch theo mã chứng khoán">
      <LayoutSession>
        <ReportTranSumarySSR />
      </LayoutSession>
    </Hermet>
  );
};

export default ReportTranSumary;
