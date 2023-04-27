import { ConfirmationNumberOutlined } from "@mui/icons-material";
import { Box, Chip, CircularProgress, Grid, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { AdminLayout, AdminLoading } from "../../../components";
import useSWR from "swr";
import { IOrder, IUser } from "../../../interfaces";

const columns: GridColDef[] = [
  { field: "id", headerName: "Order ID", width: 300 },
  { field: "email", headerName: "Email", width: 300 },
  { field: "name", headerName: "Full Name", width: 300 },
  {
    field: "isPaid",
    headerName: "Payment Status",
    width: 200,
    renderCell: ({ row }: any) => {
      return row.isPaid ? (
        <Chip color="success" label="Paid" variant="outlined" />
      ) : (
        <Chip color="error" label="Unpaid" variant="outlined" />
      );
    },
  },
  { field: "numberOfProducts", headerName: "Stock", align: "center" },
  {
    field: "seeOrder",
    headerName: "See order",
    renderCell: ({ row }: any) => {
      return (
        <a href={`/admin/orders/${row.id}`} target="_blank" rel="noreferrer">
          See order
        </a>
      );
    },
  },
  { field: "createdAt", headerName: "Created at", width: 200 },
];

const AdminOrdersPage = () => {
  const { data, error } = useSWR<IOrder[]>("/api/admin/orders");

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 200px)"
        sx={{ flexDirection: { xs: "column", sm: "row" } }}
      >
        <Typography variant="h1" component="h1" fontSize={50} fontWeight={200}>
          Error loading orders - Try again.
        </Typography>
      </Box>
    );
  }

  if (!error && !data) {
    return <AdminLoading />;
  }

  const rows = data!.map((order) => {
    return {
      id: order._id,
      email: (order.user as IUser).email,
      name: (order.user as IUser).name,
      isPaid: order.isPaid,
      numberOfProducts: order.totalNumberOfItems,
      createdAt: order.createdAt,
    };
  });

  return (
    <AdminLayout
      title="Orders"
      subTitle="Order maintenance"
      icon={<ConfirmationNumberOutlined />}
    >
      <Grid container sx={{ mt: 2 }} className="fadeIn">
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid
            rows={rows!}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default AdminOrdersPage;
