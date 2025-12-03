import dayjs from "dayjs";

export interface ICustomDatePickker {
  width?: number;
  value: dayjs.Dayjs;
  onChange: (_: dayjs.Dayjs) => void;
}

export interface ICustomDateRangePicker {
  fromDate: dayjs.Dayjs;
  toDate: dayjs.Dayjs;
  onClose: (_isOpen: boolean) => void;
  onSetTab: () => void;
  open: boolean;
  onChange: (_dates: [dayjs.Dayjs, dayjs.Dayjs]) => void;
  getPopupContainer?: () => HTMLElement;
}
