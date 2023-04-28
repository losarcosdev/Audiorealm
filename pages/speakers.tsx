import type { NextPage } from "next";
import { Typography, Box } from "@mui/material";
import { FullScreenLoading, ProductList, ShopLayout } from "../components";
import { useProducts } from "../hooks";

const SpeakerPage: NextPage = () => {
  const { products, isLoading } = useProducts({
    url: "/products/speaker",
  });

  return (
    <ShopLayout
      title={"AudioRealm | Speakers"}
      metaDescription="Looking for high-quality speakers? Check out our online store and choose from our wide range of speakers for sale. Shop now and don't miss our fantastic speakers!"
      metaKeywords="speakers, Bluetooth speakers, portable speakers, bookshelf speakers, floor-standing speakers, soundbars"
    >
      <Box
        sx={{
          backgroundColor: "black",
          height: "185px",
          marginBottom: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          color="white"
          sx={{ textAlign: "center", fontWeight: "bolder" }}
          variant="h2"
        >
          SPEAKERS
        </Typography>
      </Box>

      {isLoading || !products.length ? (
        <FullScreenLoading />
      ) : (
        <ProductList products={products} />
      )}
    </ShopLayout>
  );
};

export default SpeakerPage;
