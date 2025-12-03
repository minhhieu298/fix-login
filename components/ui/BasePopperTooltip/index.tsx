import { Button } from "@mui/material";
import Box from "@mui/material/Box";

import style from "./BasePopperTooltip.module.css";
import { IBasePopperTooltip } from "./types";

const BasePopperTooltip = (props: IBasePopperTooltip) => {
  const { title, textBtn, handleClick } = props;
  return (
    <>
      <Box className={style.labelText}>{title}</Box>
      <Button variant="primary" size="small" onClick={handleClick} fullWidth>
        {textBtn}
      </Button>
    </>
  );
};

export default BasePopperTooltip;
