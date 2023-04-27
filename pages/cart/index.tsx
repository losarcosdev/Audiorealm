import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { ShopLayout } from "../../components/layouts/ShopLayout";
import { CartList, OrderSummary } from "../../components";
import { useContext, useLayoutEffect } from "react";
import { CartContext } from "../../context";
import { useRouter } from "next/router";

const CartPage = () => {
  const { cart, isLoaded } = useContext(CartContext);
  const router = useRouter();

  useLayoutEffect(() => {
    if (isLoaded && !cart.length) {
      router.replace("/cart/empty");
    }
  }, [cart.length, router, isLoaded]);

  return (
    <ShopLayout title="Cart">
      <Grid
        container
        sx={{
          padding: "40px",
          display: "flex",
          flexDirection: "column",
          width: { xs: "100%", md: "80%" },
          margin: "auto",
          gap: "20px",
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          sx={{ padding: "20px", fontWeight: "lighter" }}
        >
          My shopping cart
        </Typography>
        {/* Product list */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <CartList editable />
        </Box>

        {/* Summary */}
        <Grid item xs={12}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Order</Typography>
              <Divider sx={{ my: 1 }} />

              <OrderSummary />

              <Box sx={{ mt: 3 }}>
                <Button
                  onClick={() => router.push("/checkout")}
                  fullWidth
                  color="primary"
                  variant="contained"
                >
                  CONFIRM ORDER
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default CartPage;
