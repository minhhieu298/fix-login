import type { FC } from "react";

import { IComponentProps } from "@/components/Layout/MainLayout/types";

export const CloseIcon: FC<IComponentProps<HTMLOrSVGElement>> = (props) => {
  return (
    <svg
      width={props.width ?? 24}
      height={props.height ?? 24}
      viewBox="0 0 24 24"
      fill="none"
      color={props.color ?? "currentColor"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.34736 4.02406C4.98194 3.65865 4.38948 3.65865 4.02406 4.02406C3.65865 4.38948 3.65865 4.98194 4.02406 5.34736L10.6767 12L4.02413 18.6526C3.65871 19.0181 3.65871 19.6105 4.02413 19.9759C4.38955 20.3414 4.98201 20.3414 5.34743 19.9759L12 13.3233L18.6526 19.9759C19.018 20.3413 19.6105 20.3413 19.9759 19.9759C20.3413 19.6105 20.3413 19.018 19.9759 18.6526L13.3233 12L19.9759 5.34742C20.3414 4.982 20.3414 4.38954 19.9759 4.02412C19.6105 3.6587 19.0181 3.6587 18.6526 4.02412L12 10.6767L5.34736 4.02406Z"
        fill={props.color ?? "currentColor"}
      />
    </svg>
  );
};
