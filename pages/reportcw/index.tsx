import dynamic from "next/dynamic";

import Hermet from "@/components/common/TitlePage";
import LayoutSession from "@/components/Layout/LayoutSession/LayoutSession";
import LoadingPage from "@/components/Layout/LoadingPage";

const ReportCWSSR = dynamic(() => import("report/ReportCW"), {
  ssr: false,
  loading: () => <LoadingPage />,
});

const ReportCW = () => {
  return (
    <Hermet title="Tình trạng chứng quyền">
      <LayoutSession>
        <ReportCWSSR />
      </LayoutSession>
    </Hermet>
  );
};

export default ReportCW;
