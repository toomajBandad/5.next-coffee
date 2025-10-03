import Banner from "@/components/modules/banner/Banner";
import LatestArticles from "@/components/templates/index/latestArticles/LatestArticles";
import LatestProducts from "@/components/templates/index/latestProducts/LatestProducts";
import Promote from "@/components/templates/index/promote/Promote";

export default async function Home() {

  // if (loading) return <LoadingScreen />;
  // if (!user) return <RedirectToLogin />;
  // return <AuthenticatedLayout user={user} />;

  return (
    <>
      <Banner />
      <LatestProducts />
      <Promote />
      <LatestArticles />
    </>
  );
}
