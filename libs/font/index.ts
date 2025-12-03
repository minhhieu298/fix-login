import localFont from "next/font/local";

export const manrope = localFont({
  src: [
    {
      path: "../../public/font/Manrope-Regular.woff2",
      weight: "400",
    },
    {
      path: "../../public/font/Manrope-Medium.woff2",
      weight: "500",
    },
    {
      path: "../../public/font/Manrope-SemiBold.woff2",
      weight: "600",
    },
    {
      path: "../../public/font/Manrope-Bold.woff2",
      weight: "700",
    },
  ],
  variable: "--font-manrope",
  display: "swap",
});
