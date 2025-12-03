import dynamic from "next/dynamic";

import LoadingPage from "@/components/Layout/LoadingPage";

const CardProfitSSR = dynamic(() => import("report/CardProfitLoss"), {
  ssr: false,
  loading: () => <LoadingPage />,
});

const CardProfitLoss = () => {
  return (
    <>
      <CardProfitSSR />
    </>
  );
};

export default CardProfitLoss;
