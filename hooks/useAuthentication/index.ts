import { useDispatch } from "react-redux";

import { AuthAction } from "@/store/reducers/Login/login.reducer";
import { checkSession } from "@/utils/checkSession";

export const useAuthentication = () => {
  const dispatch = useDispatch();
  const checkAuthenticate = async () => {
    const response = await checkSession();
    if (response.Code === 0 || response.Code === -56987) {
      dispatch(AuthAction.setUserInfo2FA(response));
    } else {
      dispatch(
        AuthAction.setUserInfo2FA({
          Code: -123456,
          Message: "No exit",
          Data: null,
        })
      );
    }
  };
  return checkAuthenticate;
};
