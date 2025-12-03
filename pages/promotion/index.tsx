import dynamic from "next/dynamic";

import Hermet from "@/components/common/TitlePage";
import LoadingPage from "@/components/Layout/LoadingPage";

const PromotionPage = dynamic(() => import("customer/promotion"), {
  ssr: false,
  loading: () => <LoadingPage />,
});

const Promotion = () => {
  return (
    <Hermet title="Chương trình khuyến mại">
      <PromotionPage />
    </Hermet>
  );
};

export default Promotion;
