import dynamic from "next/dynamic";

import Hermet from "@/components/common/TitlePage";
import LayoutSession from "@/components/Layout/LayoutSession/LayoutSession";
import LoadingPage from "@/components/Layout/LoadingPage";

const InvoicePage = dynamic(() => import("transfer/Invoice"), {
  ssr: false,
  loading: () => <LoadingPage />,
});

const Invoice = () => {
  return (
    <Hermet title="Tra cứu hóa đơn VAT">
      <LayoutSession>
        <InvoicePage />
      </LayoutSession>
    </Hermet>
  );
};

export default Invoice;
