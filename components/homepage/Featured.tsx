import {
  Box,
  Card,
  CardMedia,
  Typography,
  Link,
  CardActionArea,
} from "@mui/material";
import NextLink from "next/link";
import { useProducts } from "../../hooks";

export const Featured = () => {
  const { products } = useProducts({ url: "/products" });

  const headphones = products
    .filter(
      (products) => products.category === "headphone" && products.price > 100
    )
    .slice(0, 2);

  const earphones = products
    .filter(
      (products) => products.category === "earphone" && products.price > 100
    )
    .slice(0, 1);

  const speakers = products
    .filter(
      (products) => products.category === "speaker" && products.price > 100
    )
    .slice(0, 1);

  const featuredHeadphones = [...headphones, ...earphones];

  return (
    <Box
      sx={{
        width: { xs: "100%", md: "85%" },
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {/* Title */}
      <Box sx={{ backgroundColor: "#dd7404" }}>
        <Typography
          sx={{
            color: "white",
            fontWeight: "bolder",
            textAlign: "center",
            fontSize: "40px",
            padding: "10px",
          }}
        >
          FEATURED PRODUCTS
        </Typography>
      </Box>

      {/* Speaker */}
      <Box>
        {speakers.map((speaker) => (
          <NextLink
            key={speaker._id}
            href={`/product/${speaker.slug}`}
            passHref
            prefetch={false}
          >
            <Link>
              <CardActionArea>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "25px",
                  }}
                >
                  <Typography sx={{ fontWeight: "bolder", fontSize: "30px" }}>
                    {speaker.title.toUpperCase()}
                  </Typography>
                  <CardMedia
                    component="img"
                    image={`/products-2/${speaker.images[0]}`}
                    alt={speaker.title}
                    sx={{ width: { xs: "300px", md: "450px" } }}
                  />
                </Card>
              </CardActionArea>
            </Link>
          </NextLink>
        ))}
      </Box>

      {/* Headphones */}
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {featuredHeadphones.map((headphone) => (
          <NextLink
            key={headphone._id}
            href={`/product/${headphone.slug}`}
            passHref
            prefetch={false}
          >
            <Link>
              <CardActionArea>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItemns: "center",
                    justifyContent: "center",
                    padding: "30px",
                    gap: "30px",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={`/products-2/${headphone.images[0]}`}
                    alt={headphone.title}
                  />
                  <Typography
                    sx={{
                      fontWeight: "bolder",
                      fontSize: "17px",
                      textAlign: "center",
                    }}
                  >
                    {headphone.title}
                  </Typography>
                </Card>
              </CardActionArea>
            </Link>
          </NextLink>
        ))}
      </Box>
    </Box>
  );
};
