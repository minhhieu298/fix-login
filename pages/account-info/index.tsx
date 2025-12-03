import dynamic from "next/dynamic";

import Hermet from "@/components/common/TitlePage";
import LayoutSession from "@/components/Layout/LayoutSession/LayoutSession";
import LoadingPage from "@/components/Layout/LoadingPage";

const AccountInfoPage = dynamic(() => import("customer/account-info"), {
  ssr: false,
  loading: () => <LoadingPage />,
});

const AccountInfo = () => {
  return (
    <Hermet title="Thông tin tài khoản">
      <LayoutSession>
        <AccountInfoPage />
      </LayoutSession>
    </Hermet>
  );
};

export default AccountInfo;
