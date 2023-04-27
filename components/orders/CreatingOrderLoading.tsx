import { Box, Typography, CircularProgress } from "@mui/material";
import { ShopLayout } from "../layouts/ShopLayout";

export const CreatingOrderLoading = () => {
  return (
    <ShopLayout title="Creating order...">
      <Box
        display="flex"
        justifyContent="center"
        gap="15px"
        flexDirection="column"
        alignItems="center"
        height="calc(100vh - 200px)"
      >
        <Typography variant="h1" component="h1" fontSize={50} fontWeight={200}>
          Creating Order...
        </Typography>
        <CircularProgress thickness={3} color="primary" />
      </Box>
    </ShopLayout>
  );
};
