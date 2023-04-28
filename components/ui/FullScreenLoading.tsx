import { Box, CircularProgress } from "@mui/material";

export const FullScreenLoading = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="calc(100vh - 600px)"
      sx={{ flexDirection: { xs: "column", sm: "row" } }}
    >
      <CircularProgress thickness={3} />
    </Box>
  );
};
