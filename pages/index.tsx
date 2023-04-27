import type { NextPage } from "next";
import {
  ShopLayout,
  HeroSection,
  Categories,
  Featured,
  AudiophileInfo,
} from "../components";

const HomePage: NextPage = () => {
  return (
    <ShopLayout
      title={"Audiorealm | Home"}
      metaDescription={"Find the best audio products here | Audiorealm"}
    >
      <HeroSection />

      <Categories />

      <Featured />

      <AudiophileInfo />
    </ShopLayout>
  );
};

export default HomePage;
