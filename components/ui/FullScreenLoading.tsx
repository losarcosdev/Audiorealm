import { Box, CircularProgress } from "@mui/material";
import { ShopLayout } from "../layouts/ShopLayout";

export const FullScreenLoading = () => {
  return (
    <ShopLayout title="Loading...">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 600px)"
        sx={{ flexDirection: { xs: "column", sm: "row" } }}
      >
        <CircularProgress thickness={3} />
      </Box>
    </ShopLayout>
  );
};
