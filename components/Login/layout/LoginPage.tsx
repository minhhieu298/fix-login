import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

import DialogComponent from "@/components/common/DialogComponent";

import ForgotPassword from "../view/ForgotPassword";
import LayoutLogin from "./LayoutLogin";

export default function LoginPage() {
  const showFormLogin = useSelector(
    (state: {
      AuthReducer: {
        modal: boolean;
      };
    }) => state.AuthReducer.modal
  );
  const searchParams = useSearchParams();

  return (
    <DialogComponent
      open={showFormLogin}
      fullWidth
      className="custom-modal-login"
      sx={(theme) => ({
        ".MuiPaper-root": {
          maxHeight: "100%",
          margin: 0,
          maxWidth: {
            lg: 500,
            xs: 400,
          },
          borderRadius: 5,
        },
        ".text_link": {
          color: theme.palette.customBase?.base60,
          ...theme.applyStyles("dark", {
            color: theme.palette.customBase?.base40,
          }),
        },
      })}
    >
      {searchParams.get("href") === "login" ? (
        <LayoutLogin />
      ) : (
        searchParams.get("href") === "forgot-password" && <ForgotPassword />
      )}
    </DialogComponent>
  );
}
