import dynamic from "next/dynamic";

import Hermet from "@/components/common/TitlePage";
import LayoutSession from "@/components/Layout/LayoutSession/LayoutSession";
import LoadingPage from "@/components/Layout/LoadingPage";

const AssetReportSSR = dynamic(() => import("report/AssetReport"), {
  ssr: false,
  loading: () => <LoadingPage />,
});

const AssetReportPage = () => {
  return (
    <Hermet title="Tài sản">
      <LayoutSession>
        <AssetReportSSR />
      </LayoutSession>
    </Hermet>
  );
};

export default AssetReportPage;
