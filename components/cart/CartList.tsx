import { FC, useContext } from "react";
import NextLink from "next/link";
import {
  Box,
  CardActionArea,
  CardMedia,
  Grid,
  IconButton,
  Link,
  Typography,
  Card,
  Button,
} from "@mui/material";
import { ItemCounter } from "../ui";
import { CartContext } from "../../context";
import { ICartProduct, IOrderItem } from "../../interfaces";

interface Props {
  editable?: boolean;
  orderItems?: IOrderItem[];
}

export const CartList: FC<Props> = ({ editable = false, orderItems }) => {
  const { cart, updateProductQuantityInCart, removeProductFromCart } =
    useContext(CartContext);

  const handleQuantity = (quantity: number, product: ICartProduct) => {
    updateProductQuantityInCart({
      ...product,
      quantity,
    });
  };

  const handleRemoveProduct = (product: ICartProduct) => {
    removeProductFromCart(product);
  };

  if (orderItems) {
    return (
      <>
        {orderItems.map((product) => (
          <Grid container spacing={2} key={product.slug} sx={{ mb: 1 }}>
            <Grid item xs={3}>
              <NextLink href={`product/${product.slug}`} passHref>
                <Link>
                  <CardActionArea>
                    <CardMedia
                      image={`/products-2/${product.image}`}
                      component="img"
                    />
                  </CardActionArea>
                </Link>
              </NextLink>
            </Grid>
            <Grid item xs={7}>
              <Box display="flex" flexDirection="column">
                <Typography variant="body1">{product.title}</Typography>
                <Typography variant="h5">{`${product.quantity} ${
                  product.quantity > 1 ? "items" : "item"
                }`}</Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={2}
              display="flex"
              alignItems="center"
              flexDirection="column"
            >
              <Typography variant="subtitle1">{`$${
                product.price * product.quantity
              }`}</Typography>
            </Grid>
          </Grid>
        ))}
      </>
    );
  }

  return (
    <>
      {cart.map((product) => (
        <Card
          key={product.slug}
          sx={{
            mb: 1,
            alignItems: "center",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: "10px", md: "0px" },
            justifyContent: "space-between",
            padding: "10px",
          }}
        >
          {/* Image */}
          <Box>
            <NextLink href={`product/${product.slug}`} passHref>
              <Link>
                <CardActionArea sx={{ borderRadius: "100%" }}>
                  <CardMedia
                    image={`/products-2/${product.images}`}
                    component="img"
                    sx={{
                      width: "150px",
                      height: "150px",
                    }}
                  />
                </CardActionArea>
              </Link>
            </NextLink>
          </Box>

          {/* Title */}
          <Box>
            <Typography variant="body1" sx={{ fontWeight: "bolder" }}>
              {product.title.toUpperCase()}
            </Typography>
          </Box>

          {/* Quantity */}
          <Box>
            {editable ? (
              <ItemCounter handleQuantity={handleQuantity} product={product} />
            ) : (
              <Typography variant="h5">{`${product.quantity} ${
                product.quantity > 1 ? "items" : "item"
              }`}</Typography>
            )}
          </Box>

          {/* Price */}
          <Box>
            <Typography variant="subtitle1">{`$${(
              product.price * product.quantity
            ).toFixed(2)}`}</Typography>
          </Box>

          {/* Delete */}
          <Box>
            <Button
              color="primary"
              variant="outlined"
              onClick={() => handleRemoveProduct(product)}
            >
              REMOVE
            </Button>
          </Box>
        </Card>
      ))}
    </>
  );
};
