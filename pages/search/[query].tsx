import type { GetServerSidePropsContext, NextPage } from "next";
import { Typography } from "@mui/material";
import { ProductList, ShopLayout } from "../../components/";
import { dbFetchs } from "../../database";
import { IProduct } from "../../interfaces";
import { useMemo } from "react";

interface Props {
  products: IProduct[];
  query: string;
  foundProducts: boolean;
}

const SearchPage: NextPage<Props> = ({ products, query, foundProducts }) => {
  return (
    <ShopLayout
      title={"Audiorealm | Home"}
      metaDescription={"Find the best audio products here | Audiorealm"}
    >
      <Typography variant="h1" component="h1">
        {!foundProducts
          ? "Not found products with term:"
          : "Showing results for:"}
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        {`"${query}"`}
      </Typography>
      {!foundProducts && (
        <Typography variant="h2">This products may interest you:</Typography>
      )}
      <ProductList products={products} />
    </ShopLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps = async ({
  params,
}: GetServerSidePropsContext) => {
  const { query = "" } = params as { query: string };

  if (query.length === 0) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  let products = await dbFetchs.getProductBySearchTerm({ query });
  const foundProducts = products.length > 0;

  if (!foundProducts) {
    products = await dbFetchs.getProductBySearchTerm({ query: "audifonos" });
  }

  return {
    props: {
      products,
      query,
      foundProducts,
    },
  };
};

export default SearchPage;
