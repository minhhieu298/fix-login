import Fade from "@mui/material/Fade";
import Tooltip from "@mui/material/Tooltip";

import { IBaseTooltip } from "./types";

const BaseTooltip = (props: IBaseTooltip) => {
  const {
    title,
    children,
    placement = "top",
    arrow = true,
    styleTooltip,
    ...others
  } = props;
  return (
    <Tooltip
      {...others}
      title={title}
      placement={placement}
      slots={{
        transition: Fade,
      }}
      slotProps={{
        transition: { timeout: 200 },
        popper: {
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, -8],
              },
            },
          ],
        },
        tooltip: {
          sx: (theme) => ({
            ...styleTooltip,
            background: theme.palette.customBase?.base20,
            color: theme.palette.customBase?.base60,
            ...theme.applyStyles("dark", {
              background: theme.palette.customBase?.base50,
              color: theme.palette.customBase?.base20,
            }),
          }),
        },

        arrow: {
          sx: (theme) => ({
            color: theme.palette.customBase?.base20,
            ...theme.applyStyles("dark", {
              color: theme.palette.customBase?.base50,
            }),
          }),
        },
      }}
      arrow={arrow}
    >
      {children}
    </Tooltip>
  );
};

export default BaseTooltip;
