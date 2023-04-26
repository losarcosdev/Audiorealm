import { FC } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { ICartProduct } from "../../interfaces/cart";

interface Props {
  handleQuantity: (quantity: number, product: ICartProduct) => void;
  product: ICartProduct;
}

export const ItemCounter: FC<Props> = ({ handleQuantity, product }: Props) => {
  const onHandleQuantity = (number: number) => {
    if (number + product.quantity < 1) return;
    handleQuantity(number + product.quantity, product);
  };

  return (
    <Box display="flex" alignItems="center">
      <Box display="flex" alignItems="center">
        <IconButton onClick={() => onHandleQuantity(-1)}>
          <Remove
            sx={{
              fontSize: "10px",
            }}
          />
        </IconButton>
        <Typography sx={{ width: 40, textAlign: "center" }}>
          {product.quantity}
        </Typography>
        <IconButton onClick={() => onHandleQuantity(+1)}>
          <Add
            sx={{
              fontSize: "10px",
            }}
          />
        </IconButton>
      </Box>
    </Box>
  );
};
