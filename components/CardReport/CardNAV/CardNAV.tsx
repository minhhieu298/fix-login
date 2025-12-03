import dynamic from "next/dynamic";

import LoadingPage from "@/components/Layout/LoadingPage";

const DynamicCardNAV = dynamic(() => import("report/CardNAV"), {
  ssr: false,
  loading: () => <LoadingPage />,
});

const CardNAV = () => {
  return <DynamicCardNAV />;
};

export default CardNAV;
