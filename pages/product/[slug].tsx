import { Box, Typography } from "@mui/material";
import { ShopLayout } from "../../components/layouts";
import {
  ProductSlideshow,
  AddProductToCart,
  ProductDetails,
  SimilarProducts,
} from "../../components";
import { GetStaticPaths, GetStaticProps } from "next";
import { dbFetchs } from "../../database";
import { useState, useContext } from "react";
import { ICartProduct, IProduct } from "../../interfaces";
import { CartContext } from "../../context";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import { useProducts } from "../../hooks/useProducts";

interface Props {
  product: IProduct;
}

const ProductPage = ({ product }: Props) => {
  console.log({ product });

  const { products, isError, isLoading } = useProducts({ url: "/products" });
  const router = useRouter();
  const { addProductToCart } = useContext(CartContext);

  const cartCookie: ICartProduct[] = Cookie.get("cart")
    ? JSON.parse(Cookie.get("cart")!)
    : [];

  const productPage = cartCookie.find(
    (productInCart) => productInCart._id === product._id
  );

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    createdAt: product.createdAt,
    images: product.images[0],
    price: product.price,
    slug: product.slug,
    title: product.title,
    updatedAt: product.updatedAt,
    category: product.category,
    quantity: productPage?.quantity || 1,
  });

  const similarProducts = products
    .filter((similarProduct) => similarProduct.category === product.category)
    .slice(0, 4);

  const handleQuantity = (quantity: number) => {
    setTempCartProduct((cart) => ({
      ...cart,
      quantity,
    }));
  };

  const handleAddToCart = (cart: ICartProduct) => {
    addProductToCart(cart);
    router.push("/cart");
  };

  return (
    <ShopLayout
      title={`Audiorealm | ${product.title}`}
      metaDescription={product.metaDescription}
      metaKeywords={product.metaKeywords}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          margin: "auto",
          alignItems: "center",
          padding: "50px",
          height: { xs: "", md: "90vh" },
          width: { xs: "100%", md: "80%" },
          gap: "50px",
        }}
      >
        <ProductSlideshow images={product.images} />
        <Box display="flex" flexDirection="column" sx={{ gap: "30px" }}>
          {/* titulos */}
          <Typography
            variant="h1"
            component="h1"
            sx={{ textAlign: { xs: "center", md: "left" } }}
          >
            {product.title}
          </Typography>

          {/* Descripción */}
          <Box>
            <Typography variant="body2" sx={{ color: "#9c9c9c" }}>
              {product.description}
            </Typography>
          </Box>
          <Typography
            variant="subtitle1"
            component="h2"
          >{`$${product.price}`}</Typography>

          <AddProductToCart
            handleQuantity={handleQuantity}
            handleAddToCart={handleAddToCart}
            product={product}
            tempCartProduct={tempCartProduct}
          />
        </Box>
      </Box>
      <ProductDetails product={product} />
      <SimilarProducts similarProducts={similarProducts} loading={isLoading} />
    </ShopLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await dbFetchs.getAllProductsSlug();

  return {
    paths: slugs.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: "blocking", // can also be true or 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string };

  const product = await dbFetchs.getProductBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    // Passed to the page component as props
    props: { product },
    revalidate: 60 * 60 * 24,
  };
};

export default ProductPage;
