import type { NextPage } from "next";
import { Typography, Box } from "@mui/material";
import { FullScreenLoading, ProductList, ShopLayout } from "../components";
import { useProducts } from "../hooks";

const HeadphonePage: NextPage = () => {
  const { products, isLoading } = useProducts({
    url: "/products/headphone",
  });

  return (
    <ShopLayout
      title={"AudioRealm | Headphones"}
      metaDescription="Looking for premium headphones? We have a wide range of headphones for sale at our online store. Buy now and get high quality headphones!"
      metaKeywords="headphones, over-ear headphones, wireless headphones, noise-cancelling headphones, gaming headphones, studio headphones"
    >
      <Box
        sx={{
          backgroundColor: "black",
          height: "100px",
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
          HEADPHONES
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

export default HeadphonePage;
