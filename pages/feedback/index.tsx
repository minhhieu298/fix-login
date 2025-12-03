import dynamic from "next/dynamic";

import Hermet from "@/components/common/TitlePage";
import LayoutSession from "@/components/Layout/LayoutSession/LayoutSession";
import LoadingPage from "@/components/Layout/LoadingPage";

const Feedbacks = dynamic(() => import("customer/feedback"), {
  ssr: false,
  loading: () => <LoadingPage />,
});

const FeedbacksPage = () => {
  return (
    <Hermet title="Góp ý">
      <LayoutSession>
        <Feedbacks />
      </LayoutSession>
    </Hermet>
  );
};

export default FeedbacksPage;
