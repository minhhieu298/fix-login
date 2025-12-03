import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Hermet from "@/components/common/TitlePage";
import LayoutSession from "@/components/Layout/LayoutSession/LayoutSession";
import LoadingPage from "@/components/Layout/LoadingPage";
import { IResponseLogin } from "@/interface/interface";
import { AuthAction } from "@/store/reducers/Login/login.reducer";

const HistoryTransfer = dynamic(() => import("transfer/HistoryTransfer"), {
  ssr: false,
  loading: () => <LoadingPage />,
});

const TransferHis = () => {
  const dispatch = useDispatch();
  const userInfo2FA = useSelector(
    (state: {
      AuthReducer: {
        userInfo2FA: IResponseLogin;
      };
    }) => state.AuthReducer.userInfo2FA
  );
  useEffect(() => {
    if (userInfo2FA.Code === 0) {
      dispatch(AuthAction.getBeneficiary());
    }
  }, [JSON.stringify(userInfo2FA)]);
  return (
    <Hermet title="Lịch sử chuyển tiền">
      <LayoutSession>
        <HistoryTransfer />
      </LayoutSession>
    </Hermet>
  );
};

export default TransferHis;
