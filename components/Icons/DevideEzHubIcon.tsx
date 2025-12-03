import type { FC } from "react";

import { IComponentProps } from "@/types/typíngs";

export const DevideEzHubIcon: FC<IComponentProps<HTMLOrSVGElement>> = (
  props
) => {
  return (
    <svg
      width="2"
      height="30"
      viewBox="0 0 2 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1 8V22"
        stroke="#858B93"
        strokeOpacity="0.3"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};
