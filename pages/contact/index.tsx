// import AccountInfoPage from "customer/account-info";
import dynamic from "next/dynamic";

import Hermet from "@/components/common/TitlePage";
import LayoutSession from "@/components/Layout/LayoutSession/LayoutSession";
import LoadingPage from "@/components/Layout/LoadingPage";

const ContactPage = dynamic(() => import("customer/contact"), {
  ssr: false,
  loading: () => <LoadingPage />,
});

const Contact = () => {
  return (
    <Hermet title="Liên hệ">
      <LayoutSession>
        <ContactPage />
      </LayoutSession>
    </Hermet>
  );
};

export default Contact;
