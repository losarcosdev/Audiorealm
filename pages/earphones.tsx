import { Typography, Box } from "@mui/material";
import { NextPage } from "next";
import { ShopLayout, FullScreenLoading, ProductList } from "../components";
import { useProducts } from "../hooks";

const EarphonePage: NextPage = () => {
  const { products, isLoading } = useProducts({
    url: "/products/earphone",
  });

  return (
    <ShopLayout
      title={"AudioRealm | Earphones"}
      metaDescription="Find the best earphones online at our store. We offer a wide range of high-quality earbuds for sale at affordable prices. Shop now and enjoy free shipping!"
      metaKeywords="earphones, earbuds, wireless earphones, noise-cancelling earphones, in-ear headphones, sports earphones"
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
          EARPHONES
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

export default EarphonePage;
