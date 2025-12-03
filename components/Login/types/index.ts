export interface ISwitchTab {
  onChange: (_: number) => void;
  value: number;
}

export interface CustomToolTipProps {
  children: React.ReactElement;
  title: React.ReactNode;
  open: boolean; // Kiểm soát trạng thái hiển thị tooltip
  color: string;
}

export interface ProgressBarProps {
  count: number;
}

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
