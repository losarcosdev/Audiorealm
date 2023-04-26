import { Box, CircularProgress } from "@mui/material";
import { AdminLayout } from "../layouts/AdminLayout";

export const AdminLoading = () => {
  return (
    <AdminLayout>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 600px)"
        sx={{ flexDirection: { xs: "column", sm: "row" } }}
      >
        <CircularProgress thickness={3} />
      </Box>
    </AdminLayout>
  );
};
