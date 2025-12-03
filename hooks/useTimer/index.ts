import { useEffect, useState } from "react";

import { IOTP } from "@/interface/otp/interface";

interface TimerResult {
  timeInSecs: number;
  resendTimeInSecs: number | undefined;
  formatTime: (_seconds: number) => string;
  handleNewTime: (_time: IOTP) => void;
}

export const useTimer = (data?: IOTP): TimerResult => {
  const [timeInSecs, setTimeInSecs] = useState<number>(0);
  const [dataResend, setDataResend] = useState<IOTP | undefined>(undefined);
  const [resendTimeInSecs, setResendTimeInSecs] = useState<number | undefined>(
    undefined
  );

  const calculateTimer = (timerData: IOTP) => {
    if (Object.keys(timerData).length === 0) return;

    const parseDateTime = (dateTimeString: string): Date => {
      const timeString = dateTimeString.replace("T", " ");
      const [datePart, timePart] = timeString.split(" ");
      const [hours, minutes, seconds] = timePart.split(":");
      const formattedTime = `${datePart} ${hours}:${minutes}:${seconds.substring(
        0,
        2
      )}`;
      return new Date(formattedTime);
    };

    const dateTimeExpire = parseDateTime(timerData.timeExpire as string);
    const dateTimeResend = parseDateTime(timerData.timeReSend as string);
    if (timerData.dateCreate) {
      const dateTimeServer = parseDateTime(timerData.dateCreate as string);

      const timeDiffExpire =
        (dateTimeExpire.getTime() - dateTimeServer.getTime()) / 1000;
      const timeDiffResend =
        (dateTimeResend.getTime() - dateTimeServer.getTime()) / 1000;

      setTimeInSecs(Math.max(0, Math.floor(timeDiffExpire)));
      setResendTimeInSecs(
        timeDiffResend > 0 ? Math.max(0, Math.floor(timeDiffResend)) : undefined
      );
    } else {
      const dateTimeServer = parseDateTime(timerData.currentTime as string);

      const timeDiffExpire =
        (dateTimeExpire.getTime() - dateTimeServer.getTime()) / 1000;
      const timeDiffResend =
        (dateTimeResend.getTime() - dateTimeServer.getTime()) / 1000;

      setTimeInSecs(Math.max(0, Math.floor(timeDiffExpire)));
      setResendTimeInSecs(
        timeDiffResend > 0 ? Math.max(0, Math.floor(timeDiffResend)) : undefined
      );
    }
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const handleNewTime = (time: IOTP) => {
    setDataResend(time);
    calculateTimer(time);
  };

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      calculateTimer(data);
    }

    const timer = setInterval(() => {
      setTimeInSecs((prev) => (prev > 0 ? prev - 1 : 0));
      setResendTimeInSecs((prev) => {
        if (prev === undefined) return undefined; // Giữ nguyên undefined
        return prev > 0 ? prev - 1 : 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [data]);

  useEffect(() => {
    if (dataResend) {
      calculateTimer(dataResend);
    }
  }, [dataResend]);

  return { timeInSecs, resendTimeInSecs, formatTime, handleNewTime };
};
