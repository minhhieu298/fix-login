import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import Link from "next/link";
import React, { memo, useEffect, useRef, useState } from "react";
import {
  Controller,
  FieldErrors,
  FormProvider,
  useForm,
} from "react-hook-form";
import { Trans } from "react-i18next";
import { useSelector } from "react-redux";
import * as yup from "yup";

import { useTimer } from "@/hooks/useTimer";
import eventBus from "@/utils/event";

import style from "./otp.module.scss";
import { FormValue, IAuthenMethod, IOTP } from "./types";

const OTP_LENGTH = 6;

const CountdownDisplay = memo(({ data }: { data: IOTP }) => {
  const { timeInSecs, formatTime } = useTimer(data);

  // Nếu hết hạn thì không render gì cả
  if (timeInSecs <= 0) return null;

  return (
    <Typography
      component="div"
      variant="body14-M21"
      className={style.otp_rounded}
      sx={(theme) => ({
        borderColor: theme.palette.customBase?.base60,
        ...theme.applyStyles("dark", {
          borderColor: theme.palette.customBase?.base40,
        }),
      })}
    >
      {formatTime(timeInSecs)}
    </Typography>
  );
});

const OtpBoxes = memo(
  ({
    otp,
    errors,
    currentIndex,
    isFocused,
  }: {
    otp: string[];
    errors: boolean;
    currentIndex: number;
    isFocused: boolean;
  }) => {
    return (
      <>
        {otp.map((char, index) => (
          <Box
            key={index}
            sx={(theme) => ({
              flex: 1,
              height: 60,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              bgcolor: "#272B30",
              borderRadius: 3,
              outlineWidth: 1,
              outlineStyle: "solid",
              width: "50.5px",
              outlineColor: errors
                ? theme.palette.customRed?.default
                : isFocused && index === currentIndex
                  ? theme.palette.customPrimary?.primary50
                  : "transparent",
              color: theme.palette.customBase?.base60,
              background: theme.palette.customBase?.base20,
              ...theme.applyStyles("dark", {
                color: theme.palette.customBase?.baseWhite,
                background: theme.palette.customBase?.base60,
              }),
            })}
          >
            {char ? (
              <Typography variant="body16-M24">{char}</Typography>
            ) : isFocused && index === currentIndex ? (
              <Box
                component="span"
                sx={{
                  width: "1px",
                  height: "60%",
                  bgcolor: "#00e676",
                  animation: "blink 1s step-start infinite",
                }}
              />
            ) : (
              "-"
            )}
          </Box>
        ))}
      </>
    );
  }
);

const FormOtpVerification = ({
  handleOTP,
  resendOTP,
  data,
}: {
  handleOTP: (_otp: string) => Promise<boolean>; // type ->  tk dùng loại phương thức nào
  // data từ OTP trả ra để tính time có thể resend lại
  resendOTP: (_otp: string) => Promise<boolean>;
  data: IOTP;
}) => {
  const { resendTimeInSecs, timeInSecs } = useTimer(data as IOTP);
  const [otp, setOTP] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [isFocused, setIsFocused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const authenticationMethod = useSelector(
    (state: {
      OTPReducer: {
        authenticationMethod: IAuthenMethod;
      };
    }) => state.OTPReducer.authenticationMethod
  );

  const methods = useForm<FormValue>({
    shouldFocusError: false,
    defaultValues: {
      OTP: "",
    },
    resolver: yupResolver(
      yup.object({
        OTP: yup
          .string()
          .required("Vui lòng nhập mã xác thực")
          .test(
            "minLength",
            "Mã xác thực không chính xác vui lòng nhập lại",
            (value) => (value ? value.length >= 6 : false)
          ),
      })
    ),
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    setValue,
    clearErrors,
    setError,
  } = methods;

  const resetOTP = () => {
    setValue("OTP", "");
    setOTP(Array(OTP_LENGTH).fill(""));
    setCurrentIndex(0);
    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  };

  const onSubmit = async (data: FormValue) => {
    const response = await handleOTP(data.OTP);
    if (!response) {
      resetOTP();
    }
  };

  const onError = (data: FieldErrors<FormValue>) => {
    if (data.OTP) {
      resetOTP();
      return;
    }
  };

  const handleBackSpace = () => {
    const newOtp = [...otp];

    if (otp[currentIndex]) {
      newOtp[currentIndex] = "";

      if (currentIndex === 0) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(currentIndex - 1);
      }
    } else if (currentIndex > 0) {
      newOtp[currentIndex - 1] = "";
      setCurrentIndex(currentIndex - 1);
    }
    setOTP(newOtp);
    setValue("OTP", newOtp.join(""));
    // onChange(newOtp.join(""));
  };

  const handleResendOTP = async () => {
    await resendOTP("");
    setIsFocused(true);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").trim();

    if (!/^\d+$/.test(paste)) {
      return;
    }

    if (paste.length > 0) {
      const newOtp = [...otp];
      let index = paste.length >= OTP_LENGTH ? 0 : currentIndex;

      for (let i = 0; i < paste.length && index < OTP_LENGTH; i++) {
        newOtp[index] = paste[i];
        index++;
      }

      setOTP(newOtp);
      setCurrentIndex(Math.min(index, OTP_LENGTH - 1));
      setValue("OTP", newOtp.join(""));
    }
    // onChange(paste);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [currentIndex]);

  useEffect(() => {
    if (isFocused) {
      inputRef.current?.focus();
    }
  }, [currentIndex, isFocused]);

  useEffect(() => {
    const handler = (data: { message: string }) => {
      if (data.message !== "") {
        setError("OTP", {
          message: data.message,
          type: "value",
        });
      } else {
        clearErrors("OTP");
      }
    };
    eventBus.on("msgOTP", handler);
    return () => eventBus.off("msgOTP", handler);
  }, []);

  return (
    <FormProvider {...methods}>
      <Box
        className={style.custom_box}
        width="min-content"
        component="form"
        alignItems="center"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        {(authenticationMethod.ATRANSACTION === 2 ||
          authenticationMethod.ATRANSACTION === 3) &&
        timeInSecs > 0 ? (
          <Box
            className={style.custom_flex_row}
            sx={{
              justifyContent: "center",
              mb: 5,
              gap: 3,
            }}
          >
            <Typography component="div" variant="body14-M21">
              OTP hết hạn trong
            </Typography>
            <CountdownDisplay data={data} />
          </Box>
        ) : null}

        <Box minHeight={86}>
          <Stack
            sx={{
              gap: 2,
              position: "relative",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 2,
              }}
            >
              <OtpBoxes
                otp={otp}
                errors={errors.OTP ? true : false}
                currentIndex={currentIndex}
                isFocused={isFocused}
              />
            </Box>
            <Controller
              name="OTP"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  size="xlarge"
                  fullWidth
                  inputRef={inputRef}
                  onChange={(e) => {
                    // hàm backspace sẽ gọi lại onchange nên khi đó chặn ko cho chạy
                    const inputEvt = e.nativeEvent as InputEvent;
                    if (inputEvt.inputType === "deleteContentBackward") return;
                    // inset thì mới gọi onchange
                    const val = e.target.value;

                    if (!val || isNaN(Number(val))) return;

                    const newOtp = [...otp];
                    newOtp[currentIndex] = val[currentIndex];
                    setOTP(newOtp);
                    field.onChange(e);
                    setValue("OTP", newOtp.join(""));

                    if (currentIndex < OTP_LENGTH - 1) {
                      setCurrentIndex(currentIndex + 1);
                    }
                    clearErrors("OTP");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace") {
                      handleBackSpace();
                    }
                  }}
                  error={errors.OTP?.message ? true : false}
                  autoFocus
                  onPaste={handlePaste}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  helperText={errors.OTP && errors.OTP.message}
                  sx={{
                    position: "absolute",
                    ".MuiOutlinedInput-root": {
                      opacity: 0,
                      height: 60,
                    },
                    ".MuiFormHelperText-root.Mui-error": {
                      marginTop: 2,
                    },
                  }}
                />
              )}
            />
          </Stack>
        </Box>
        {authenticationMethod.ATRANSACTION === 2 ||
        authenticationMethod.ATRANSACTION === 3
          ? resendTimeInSecs === 0 && (
              <Typography
                variant="body14-B21"
                sx={(theme) => ({
                  color: theme.palette.customGreen?.default,
                  mt: 3,
                  textAlign: "center",
                  cursor: "pointer",
                })}
                onClick={handleResendOTP}
              >
                Gửi lại
              </Typography>
            )
          : null}

        <Button
          fullWidth
          size="xlarge"
          variant="primary"
          type="submit"
          sx={{
            mt: 10,
          }}
          disabled={isSubmitting}
          className="my-btn"
        >
          <Typography variant="body16-M24">Xác nhận</Typography>
        </Button>
        <Typography
          variant="body14-M21"
          className="text_description"
          sx={{
            textAlign: "center",
            mt: 3,
            display: "block !important",
          }}
        >
          <Trans
            i18nKey="otpMethodChange"
            components={[
              <Link
                key={0}
                href="/?setting=security"
                style={{ color: "#1AAF74" }}
                target="_blank"
              />,
            ]}
          />
        </Typography>
      </Box>
    </FormProvider>
  );
};

export default FormOtpVerification;
