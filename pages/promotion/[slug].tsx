import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";

import LoadingPage from "@/components/Layout/LoadingPage";

const PromotionDetail = dynamic(() => import("customer/promotion-detail"), {
  ssr: false,
  loading: () => <LoadingPage />,
});

const PromotionDetailPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <>
      <Head>
        <title>Chương trình khuyến mại - {slug}</title>
      </Head>

      <PromotionDetail slug={slug as string} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params!;

  return {
    props: {
      slug: Array.isArray(slug) ? slug[0] : slug,
    },
  };
};

export default PromotionDetailPage;
