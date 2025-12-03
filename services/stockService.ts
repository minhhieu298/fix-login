import { IStockItem } from "../interface/search/interface";

export interface StockApiResponse {
  Code: number;
  Message: string;
  Data: IStockItem[];
}

export const fetchStockList = async (): Promise<StockApiResponse> => {
  const response = await fetch(
    `https://gateway.fpts.com.vn/market/company_name`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error(`Không thể tải danh sách chứng khoán`);
  }

  const data: StockApiResponse = await response.json();

  // Trả về mảng Data thay vì toàn bộ response
  return data || [];
};
