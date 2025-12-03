import dynamic from "next/dynamic";

import Hermet from "@/components/common/TitlePage";
import LayoutSession from "@/components/Layout/LayoutSession/LayoutSession";
import LoadingPage from "@/components/Layout/LoadingPage";

const FeeScheduleRP = dynamic(() => import("report/FeeScheduleRP"), {
  ssr: false,
  loading: () => <LoadingPage />,
});

const FeeSchedule = () => {
  return (
    <Hermet title="Tra cứu phí">
      <LayoutSession>
        <FeeScheduleRP />
      </LayoutSession>
    </Hermet>
  );
};

export default FeeSchedule;
