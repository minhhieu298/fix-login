import { FormControlLabelProps } from "@mui/material";

export interface CustomCheckBoxLabelProps
  extends Omit<FormControlLabelProps, "control" | "label"> {
  label?: string;
}
