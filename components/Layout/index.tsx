// import * as signalR from "@microsoft/signalr";
import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IResponseLogin } from "@/interface/interface";
// import { createSignalRConnection } from "@/libs/signalR";
import { ErrorAction } from "@/store/reducers/Error/error.reducer";
import { AuthAction } from "@/store/reducers/Login/login.reducer";

const Layout = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const userInfo2FA = useSelector(
    (state: {
      AuthReducer: {
        userInfo2FA: IResponseLogin;
      };
    }) => state.AuthReducer.userInfo2FA
  );
  useEffect(() => {
    dispatch(ErrorAction.getError());
  }, []);

  useEffect(() => {
    if (userInfo2FA.Code === 0) {
      dispatch(AuthAction.getFeeSMS());
    }
  }, [JSON.stringify(userInfo2FA.Data)]);

  // useEffect(() => {
  //   let conn: signalR.HubConnection;
  //   (async () => {
  //     try {
  //       // eslint-disable-next-line no-console
  //       console.log(
  //         "process.env.NEXT_PUBLIC_NEXT_DOMAIN_PUSHER",
  //         process.env.NEXT_PUBLIC_NEXT_DOMAIN_PUSHER
  //       );
  //       conn = await createSignalRConnection(
  //         `${process.env.NEXT_PUBLIC_NEXT_DOMAIN_PUSHER}/pusher?name=aspfpt_sessiontoken`,
  //         () => {},
  //         () => {},
  //         (err) => {
  //           if (err) {
  //             // eslint-disable-next-line no-console
  //             console.error("Kết nối bị lỗi:", err);
  //           }
  //         }
  //       );
  //       // Đăng ký listener
  //       conn.on("p", () => {});
  //     } catch (error) {
  //       // eslint-disable-next-line no-console
  //       console.error("Không thể khởi tạo SignalR:", error);
  //     }
  //   })();
  //   return () => {
  //     conn?.stop();
  //   };
  // }, []);

  return <>{children}</>;
};

export default Layout;
