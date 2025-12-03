import dynamic from "next/dynamic";

import Hermet from "@/components/common/TitlePage";
import LayoutSession from "@/components/Layout/LayoutSession/LayoutSession";
import LoadingPage from "@/components/Layout/LoadingPage";

const LookUpFeeScheduleSSR = dynamic(() => import("report/LookUpFeeSchedule"), {
  ssr: false,
  loading: () => <LoadingPage />,
});

const LookUpFeeSchedule = () => {
  return (
    <Hermet title="Tra cứu biểu phí">
      <LayoutSession>
        <LookUpFeeScheduleSSR />
      </LayoutSession>
    </Hermet>
  );
};

export default LookUpFeeSchedule;
