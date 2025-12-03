import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";
import { useSelector } from "react-redux";

import ForgotPassword from "@/components/Login/view/ForgotPassword";
import LoginForm from "@/components/Login/view/Login";

import style from "../index.module.css";

const Login = () => {
  const isActiveForm = useSelector(
    (state: {
      PopupReducer: {
        isActiveForm: number;
      };
    }) => state.PopupReducer.isActiveForm
  );
  return (
    <Box
      sx={(theme) => ({
        maxWidth: 500,
        borderRadius: 5,
        width: "100%",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        ...theme.applyStyles("dark", {
          background: theme.palette.customBase?.base80,
        }),
        ...theme.applyStyles("light", {
          background: theme.palette.customBase?.base10,
        }),
      })}
      className={style.custom_box}
    >
      {isActiveForm === 0 ? (
        <LoginForm />
      ) : isActiveForm === 1 ? (
        <ForgotPassword />
      ) : null}
    </Box>
  );
};

export default dynamic(() => Promise.resolve(Login), { ssr: false });
