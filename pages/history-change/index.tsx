import dynamic from "next/dynamic";

import Hermet from "@/components/common/TitlePage";
import LayoutSession from "@/components/Layout/LayoutSession/LayoutSession";
import LoadingPage from "@/components/Layout/LoadingPage";

const HistoryChange = dynamic(() => import("customer/history-change"), {
  ssr: false,
  loading: () => <LoadingPage />,
});

const Contact = () => {
  return (
    <Hermet title="Lịch sử thay đổi thông tin">
      <LayoutSession>
        <HistoryChange />
      </LayoutSession>
    </Hermet>
  );
};

export default Contact;
