import dynamic from "next/dynamic";

import Hermet from "@/components/common/TitlePage";
import LayoutSession from "@/components/Layout/LayoutSession/LayoutSession";
import LoadingPage from "@/components/Layout/LoadingPage";

const MoneyTransactionRP = dynamic(() => import("report/MoneyTransaction"), {
  ssr: false,
  loading: () => <LoadingPage />,
});

const MoneyTransaction = () => {
  return (
    <Hermet title="Giao dịch tiền">
      <LayoutSession>
        <MoneyTransactionRP />
      </LayoutSession>
    </Hermet>
  );
};

export default MoneyTransaction;
