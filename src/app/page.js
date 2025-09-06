import Banner from "@/components/modules/banner/Banner";
import Navbar from "@/components/modules/navbar/Navbar";
import Latest from "@/components/templates/index/latest/Latest";

export default function Home() {
  return (
    <>
      <Navbar />
      <Banner />
      <Latest />
    </>
  );
}
