import type { FC } from "react";

import { IComponentProps } from "../../types";

export const SearchIcon: FC<IComponentProps<HTMLOrSVGElement>> = (props) => {
  return (
    <svg
      width={props.width ?? 16}
      height={props.height ?? 18}
      viewBox={props.viewBox ?? "0 0 16 18"}
      color={props.color ?? "currentColor"}
      fill={props.color ?? "currentColor"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="6.58416"
        cy="7.26812"
        r="5.51442"
        stroke="#33383F"
        stroke-width="1.22543"
      />
      <rect
        x="10.9393"
        y="14.5868"
        width="2.6011"
        height="4.55192"
        rx="1.30055"
        transform="rotate(-45 10.9393 14.5868)"
        fill="#33383F"
        stroke="#33383F"
        stroke-width="0.650275"
      />
      <rect
        x="9.327"
        y="11.8774"
        width="1.30055"
        height="1.95082"
        rx="0.650275"
        transform="rotate(-45 9.327 11.8774)"
        fill="white"
        stroke="#33383F"
        stroke-width="0.650275"
      />
    </svg>
  );
};
