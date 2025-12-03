import mitt from "mitt";

type Events = {
  [key: string]: any;
};

const eventBus = mitt<Events>();

export default eventBus;
