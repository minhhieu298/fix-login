import dynamic from "next/dynamic";

import Hermet from "@/components/common/TitlePage";
import LayoutSession from "@/components/Layout/LayoutSession/LayoutSession";
import LoadingPage from "@/components/Layout/LoadingPage";

const RegistrationPage = dynamic(() => import("customer/registration"), {
  ssr: false,
  loading: () => <LoadingPage />,
});

const Registration = () => {
  return (
    <Hermet title="Đăng kí dịch vụ">
      <LayoutSession>
        <RegistrationPage />
      </LayoutSession>
    </Hermet>
  );
};

export default Registration;
