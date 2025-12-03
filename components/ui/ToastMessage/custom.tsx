import Image from "next/image";

export const iconMapping = {
  success: (
    <Image
      alt="success"
      src="/assets/icon/toast_success.svg"
      width={16}
      height={16}
    />
  ),
  error: (
    <Image
      alt="error"
      src="/assets/icon/toast_error.svg"
      width={16}
      height={16}
    />
  ),
  warning: (
    <Image
      alt="warning"
      src="/assets/icon/toast_warning.svg"
      width={16}
      height={16}
    />
  ),
  info: (
    <Image
      alt="info"
      src="/assets/icon/toast_info.svg"
      width={16}
      height={16}
    />
  ),
};
