import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

import eventBus from "@/utils/event";

import { RHFTextField } from "../common/form/RHFTextField";
import style from "./otp.module.scss";
import { FormValue } from "./types";

const FormTokenOTP = ({
  handleOTP,
}: {
  handleOTP: (_otp: string) => Promise<boolean>; // type ->  tk dùng loại phương thức nào
}) => {
  const methods = useForm<FormValue>({
    shouldFocusError: false,
    defaultValues: {
      OTP: "",
    },
    resolver: yupResolver(
      yup.object({
        OTP: yup
          .string()
          .required("Vui lòng nhập TokenCode")
          .test(
            "minLength",
            "Mã Token không chính xác vui lòng nhập lại",
            (value) => (value ? value.length >= 6 : false)
          ),
      })
    ),
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = methods;

  const onSubmit = async (data: FormValue) => {
    await handleOTP(data.OTP);
  };

  useEffect(() => {
    const handler = (data: { message: string }) => {
      setError("OTP", {
        message: data.message,
        type: "value",
      });
    };
    eventBus.on("msgOTP", handler);
    return () => eventBus.off("msgOTP", handler);
  }, []);

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        className={style.custom_box}
        gap={6}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box minHeight={70}>
          <RHFTextField
            name="OTP"
            size="large"
            placeholder="TokenCode"
            helperText={
              errors.OTP && (
                <Typography variant="sub12-R18" color="">
                  {errors.OTP.message}
                </Typography>
              )
            }
            clearable
            autoFocus
            disabled={isSubmitting}
          />
        </Box>

        <Box className={style.custom_box} gap={3}>
          <Button
            fullWidth
            size="xlarge"
            variant="primary"
            type="submit"
            disabled={isSubmitting}
            startIcon={
              isSubmitting && (
                <CircularProgress
                  disableShrink
                  size={20}
                  sx={(theme) => ({
                    color: theme.palette.customBase?.baseWhite,
                  })}
                />
              )
            }
          >
            <Typography variant="body16-M24">Xác nhận</Typography>
          </Button>
          <Typography
            variant="body14-M21"
            className="text_description"
            textAlign="center"
          >
            Để thay đổi phương thức nhận OTP, vui lòng đến quầy để được hỗ trợ.
          </Typography>
        </Box>
      </Box>
    </FormProvider>
  );
};

export default FormTokenOTP;
