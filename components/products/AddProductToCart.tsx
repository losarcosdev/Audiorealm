import { Box, Button, Chip } from "@mui/material";
import { ICartProduct, IProduct } from "../../interfaces";
import { ItemCounter } from "../ui";

interface Props {
  handleQuantity: (quantity: number) => void;
  handleAddToCart: (cart: ICartProduct) => void;
  product: IProduct;
  tempCartProduct: ICartProduct;
}

export const AddProductToCart = ({
  handleAddToCart,
  handleQuantity,
  product,
  tempCartProduct,
}: Props) => {
  return (
    <Box
      sx={{
        my: 2,
        display: "flex",
        alignItems: "center",
        gap: "10px",
        justifyContent: { xs: "space-between", md: "normal" },
      }}
    >
      <Box sx={{ backgroundColor: "#f1f1f1", padding: "8px" }}>
        <ItemCounter
          product={tempCartProduct}
          handleQuantity={handleQuantity}
        />
      </Box>
      {product.inStock > 0 ? (
        <Box>
          {/* Agregar al carrito */}
          <Button
            color="primary"
            variant="contained"
            onClick={() => handleAddToCart(tempCartProduct)}
          >
            ADD TO CART
          </Button>
        </Box>
      ) : (
        <Box sx={{ width: "100%" }}>
          <Chip
            color="error"
            label="Out of stock"
            variant="outlined"
            sx={{ width: "100%" }}
          />
        </Box>
      )}
    </Box>
  );
};
