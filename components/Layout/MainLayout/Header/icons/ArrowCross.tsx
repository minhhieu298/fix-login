import type { FC } from "react";

import { IComponentProps } from "../../types";

export const ArrowCross: FC<IComponentProps<HTMLOrSVGElement>> = (props) => {
  return (
    <svg
      width={props.width ?? 16}
      height={props.height ?? 16}
      viewBox={props.viewBox ?? "0 0 16 16"}
      color={props.color ?? "currentColor"}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 4.49994C5.72386 4.49994 5.5 4.27608 5.5 3.99994C5.5 3.7238 5.72386 3.49994 6 3.49994H12C12.2761 3.49994 12.5 3.7238 12.5 3.99994V9.99994C12.5 10.2761 12.2761 10.4999 12 10.4999C11.7239 10.4999 11.5 10.2761 11.5 9.99994V5.20705L4.35355 12.3535C4.15829 12.5488 3.84171 12.5488 3.64645 12.3535C3.45118 12.1582 3.45118 11.8416 3.64645 11.6464L10.7929 4.49994H6Z"
        fill={props.color ?? "currentColor"}
      />
    </svg>
  );
};
