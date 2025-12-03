export interface IStockItem {
  cpnyID: number;
  stock_code: string;
  CodeID: number;
  Ex: string;
  name_vn: string;
  name_en: string;
  stock_type: string;
}

export interface ISearchDropdownProps {
  stocks: IStockItem[];
  isLoading?: boolean;
  onStockSelect?: (_stock: IStockItem) => void;
}
