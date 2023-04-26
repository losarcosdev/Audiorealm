import { FC } from "react";
import { Grid } from "@mui/material";
import { IProduct } from "../../interfaces/products-2";
import { ProductCard } from ".";

interface Props {
  products: IProduct[];
}

export const ProductList: FC<Props> = ({ products }) => {
  return (
    <Grid container spacing={4} padding={4}>
      {products.map((product) => (
        <ProductCard key={product.slug} product={product as IProduct} />
      ))}
    </Grid>
  );
};
