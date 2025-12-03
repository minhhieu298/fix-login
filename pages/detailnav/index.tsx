import dynamic from "next/dynamic";

import Hermet from "@/components/common/TitlePage";
import LayoutSession from "@/components/Layout/LayoutSession/LayoutSession";
import LoadingPage from "@/components/Layout/LoadingPage";

const DynamicDetailNAV = dynamic(() => import("report/DetailNAV"), {
  ssr: false,
  loading: () => <LoadingPage />,
});

const DetailNAV = () => {
  return (
    <Hermet title="Biến động TS ròng">
      <LayoutSession>
        <DynamicDetailNAV />
      </LayoutSession>
    </Hermet>
  );
};

export default DetailNAV;
