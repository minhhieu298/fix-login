import dynamic from "next/dynamic";

import Hermet from "@/components/common/TitlePage";
import LayoutSession from "@/components/Layout/LayoutSession/LayoutSession";
import LoadingPage from "@/components/Layout/LoadingPage";

const UtilityPage = dynamic(() => import("customer/utility"), {
  ssr: false,
  loading: () => <LoadingPage />,
});

const Promotion = () => {
  return (
    <Hermet title="Tiện ích">
      <LayoutSession>
        <UtilityPage />
      </LayoutSession>
    </Hermet>
  );
};

export default Promotion;
