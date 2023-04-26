import { FC, useMemo, useState } from "react";
import NextLink from "next/link";
import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
  Typography,
  Chip,
} from "@mui/material";

import { IProduct } from "../../interfaces/products-2";

interface Props {
  product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  const productImage = useMemo(() => {
    return isHovered
      ? `/products-2/${product.images[1]}`
      : `/products-2/${product.images[0]}`;
  }, [isHovered, product.images]);

  return (
    <Grid
      item
      xs={12}
      sm={4}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card sx={{ width: "100%" }}>
        <NextLink href={`/product/${product.slug}`} passHref prefetch={false}>
          <Link>
            <CardActionArea
              sx={{
                height: "350px",
                width: "300",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {!product.inStock && (
                <Chip
                  color="primary"
                  sx={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    zIndex: 99,
                  }}
                  label="Out of stock"
                />
              )}
              <CardMedia
                component="img"
                className="fadeIn"
                image={productImage}
                alt={product.title}
                onLoad={() => setImageLoaded(true)}
                sx={{ width: "300px" }}
              />
            </CardActionArea>
          </Link>
        </NextLink>
      </Card>
      <Box
        sx={{ mt: 1, zIndex: "999", display: imageLoaded ? "block" : "none" }}
        className="fadeIn"
      >
        <Typography fontWeight={700}>{product.title}</Typography>
        <Typography fontWeight={500}>{`$${product.price}`}</Typography>
      </Box>
    </Grid>
  );
};
