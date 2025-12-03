import { Typography } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import moment from "moment";
import { useEffect, useState } from "react";

export const ClockAPI = () => {
  const [dateState, setDateState] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateState(new Date());
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const arrayDay = [
    { number: 1, day: "T2" },
    { number: 2, day: "T3" },
    { number: 3, day: "T4" },
    { number: 4, day: "T5" },
    { number: 5, day: "Thứ Sáu" },
    { number: 6, day: "T7" },
    { number: 7, day: "CN" },
  ];

  const getCurrentTime = () => {
    const currentTime = moment();
    let currentDay = "";

    for (let i = 0; i < arrayDay.length; i++) {
      if (arrayDay[i].number === currentTime.weekday()) {
        currentDay = `${arrayDay[i].day}, ${currentTime.format(
          "DD"
        )} thg ${currentTime.format("MM")}, ${currentTime.format("YYYY")} `;
      }
    }
    return currentDay;
  };

  return (
    <Tooltip
      classes={{
        tooltip: "custom-tooltip",
      }}
      title={getCurrentTime()}
      arrow
    >
      <Typography
        variant="sub10-R15"
        sx={(theme) => ({
          width: "39px",
          color: theme.palette.customBase?.base80,
          ...theme.applyStyles("dark", {
            color: theme.palette.customBase?.base20,
          }),
        })}
      >
        {dateState.toLocaleTimeString("en-GB")}
      </Typography>
    </Tooltip>
  );
};

export default ClockAPI;
