import type { FC } from "react";

import { IComponentProps } from "../../types";

export const SunIcon: FC<IComponentProps<HTMLOrSVGElement>> = (props) => {
  return (
    <svg
      width={props.width ?? 16}
      height={props.height ?? 16}
      viewBox={props.viewBox ?? "0 0 24 24"}
      color={props.color ?? "currentColor"}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r="5"
        stroke={props.color ?? "currentColor"}
        strokeWidth="1.5"
      />
      <path
        d="M12 2V4"
        stroke={props.color ?? "currentColor"}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12 20V22"
        stroke={props.color ?? "currentColor"}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M4 12L2 12"
        stroke={props.color ?? "currentColor"}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M22 12L20 12"
        stroke={props.color ?? "currentColor"}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M19.7773 4.22266L17.5553 6.25424"
        stroke={props.color ?? "currentColor"}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M4.22266 4.22266L6.44467 6.25424"
        stroke={props.color ?? "currentColor"}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M6.44434 17.5557L4.22211 19.7779"
        stroke={props.color ?? "currentColor"}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M19.7773 19.7773L17.5553 17.5551"
        stroke={props.color ?? "currentColor"}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};
