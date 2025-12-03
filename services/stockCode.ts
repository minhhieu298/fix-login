export const getStockCodeHSX = async (stockCode: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_NEXT_DOMAIN_MARKETSTREAM}/hsx/data.ashx?s=quote&l=${stockCode}`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
};

export const getStockCodeHNX = async (stockCode: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_NEXT_DOMAIN_MARKETSTREAM}/hnx/data.ashx?s=quote&l=${stockCode}`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
};
export const getStockCodePsHSX = async (stockCode: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_NEXT_DOMAIN_MARKETSTREAM}/hsx/data.ashx?s=quote_ds&l=${stockCode}`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
};

export const getStockCodePsHNX = async (stockCode: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_NEXT_DOMAIN_MARKETSTREAM}/hnx/data.ashx?s=quote_ds&l=${stockCode}`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
};
