import { Box, Button, Card, CardMedia, Grid, Typography } from "@mui/material";
import { IProduct } from "../../interfaces";
import { SimpleLoading } from "../ui";
import { useRouter } from "next/router";

interface Props {
  similarProducts: IProduct[];
  loading: boolean;
}

export const SimilarProducts = ({ similarProducts, loading }: Props) => {
  const router = useRouter();
  if (loading) {
    return <SimpleLoading />;
  }

  return (
    <Box
      sx={{
        height: { xs: "", md: "100vh" },
        display: "flex",
        flexDirection: "column",
        gap: "40px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: "40px" }}>
        {/* Title */}
        <Typography
          sx={{
            display: "inline",
            width: "fit-content",
            fontWeight: "bolder",
            marginTop: "50px",
            fontSize: { xs: "30px", md: "20px" },
            textAlign: { xs: "center", md: "left" },
            borderBottom: "10px solid #f4f4f4f4",
          }}
        >
          RELATED PRODUCTS
        </Typography>

        {/* Related products */}
        <Box
          sx={{
            display: "flex",
            gap: "40px",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {similarProducts.map((product) => {
            const productImage = product.images[0].includes(
              "https://res.cloudinary.com"
            )
              ? product.images[0]
              : `/products-2/${product.images[0]}`;

            return (
              <Box
                key={product._id}
                sx={{
                  display: "flex",
                  gap: "25px",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Card
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CardMedia
                    component="img"
                    className="fadeIn"
                    image={productImage}
                    alt={product.title}
                    sx={{ width: "250px", padding: "20px", height: "270px" }}
                  />
                </Card>
                <Typography sx={{ fontWeight: "bolder" }}>
                  {product.title.toUpperCase()}
                </Typography>
                <Button
                  onClick={() => router.push(`/product/${product.slug}`)}
                  color="primary"
                  variant="contained"
                >
                  SEE PRODUCT
                </Button>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};
