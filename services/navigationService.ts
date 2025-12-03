import Router from "next/router";

let navigate: ((_: string) => void) | null = null;

export const setNavigate = (navFn: (_path: string) => void) => {
  navigate = navFn;
};

export const goTo = (path: string) => {
  if (navigate) {
    navigate(path);
  } else {
    // Fallback to Next.js router if navigate function is not set
    Router.push(path, undefined, { shallow: true });
  }
};
