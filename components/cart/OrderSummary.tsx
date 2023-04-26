import { Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { CartContext } from "../../context/cart/CartContext";

interface Props {
  summary?: {
    totalNumberOfItems: number;
    subtotal: number;
    tax: number;
    total: number;
  };
}

export const OrderSummary = ({ summary }: Props) => {
  const { orderSummary } = useContext(CartContext);

  if (summary) {
    return (
      <Grid container>
        <Grid item xs={6}>
          <Typography>Num Product</Typography>
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="end">
          <Typography>{summary?.totalNumberOfItems}</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography>SubTotal</Typography>
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="end">
          <Typography>${summary?.subtotal}</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography>Tax (15%)</Typography>
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="end">
          <Typography>{`$${summary?.tax.toFixed(2)}`}</Typography>
        </Grid>

        <Grid item xs={6} sx={{ mt: 2 }}>
          <Typography variant="subtitle1">Total:</Typography>
        </Grid>
        <Grid item xs={6} sx={{ mt: 2 }} display="flex" justifyContent="end">
          <Typography variant="subtitle1">{`$${summary?.total.toFixed(
            2
          )}`}</Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>Num Product</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{orderSummary?.totalNumberOfItems}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>SubTotal</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>${orderSummary?.subtotal}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Tax (15%)</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{`$${orderSummary?.tax.toFixed(2)}`}</Typography>
      </Grid>

      <Grid item xs={6} sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Total:</Typography>
      </Grid>
      <Grid item xs={6} sx={{ mt: 2 }} display="flex" justifyContent="end">
        <Typography variant="subtitle1">{`$${orderSummary?.total.toFixed(
          2
        )}`}</Typography>
      </Grid>
    </Grid>
  );
};
