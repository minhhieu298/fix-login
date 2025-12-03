import { HubItem } from "./interface";

export const hubData = (mode: string): HubItem[] => [
  {
    id: "professional",
    image:
      mode === "dark"
        ? "/assets/image/MyHub.png"
        : "/assets/image/MyHubLight.png",
    title: "title_welcome_step2_gradient_professional",
    prioritized: false,
    actions: {
      rename: () => {},
      duplicate: () => {},
      remove: () => {},
    },
  },
  {
    id: "classic",
    image:
      mode === "dark"
        ? "/assets/image/MyHub.png"
        : "/assets/image/MyHubLight.png",
    title: "title_welcome_step2_gradient_classic",
    prioritized: false,
    actions: {
      rename: () => {},
      duplicate: () => {},
      remove: () => {},
    },
  },
  {
    id: "new-user",
    image:
      mode === "dark"
        ? "/assets/image/MyHub.png"
        : "/assets/image/MyHubLight.png",
    title: "text_new_user",
    prioritized: false,
    actions: { rename: () => {}, duplicate: () => {}, remove: () => {} },
  },
  {
    id: "order",
    image:
      mode === "dark"
        ? "/assets/image/MyHub.png"
        : "/assets/image/MyHubLight.png",
    title: "text_order",
    prioritized: false,
    actions: { rename: () => {}, duplicate: () => {}, remove: () => {} },
  },
];
