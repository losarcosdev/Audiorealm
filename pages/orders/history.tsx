import NextLink from "next/link";
import { Typography, Grid, Chip, Link, Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ShopLayout } from "../../components/layouts";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { dbFetchs } from "../../database";
import { IOrder } from "../../interfaces/order";
import { IUser } from "../../interfaces";

interface Props {
  orders: IOrder[];
}

const HistoryPage = ({ orders }: Props) => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "fullName", headerName: "Full Name", width: 300 },

    {
      field: "paid",
      headerName: "State",
      description: "Show info if the order is payed or not",
      width: 200,
      renderCell: (params: any) => {
        return params.row.paid ? (
          <Chip color="success" label="Paid" variant="outlined" />
        ) : (
          <Chip color="error" label="Unpaid" variant="outlined" />
        );
      },
    },
    {
      field: "orden",
      headerName: "See order",
      width: 200,
      sortable: false,
      renderCell: (params: any) => {
        return (
          <NextLink href={`/orders/${params.row.id}`} passHref>
            <Link underline="always">See order</Link>
          </NextLink>
        );
      },
    },
  ];

  const rows = orders.map((order) => ({
    id: order._id,
    paid: order.isPaid,
    fullName: `${order.shippingAddress.name} ${order.shippingAddress.lastName}`,
  }));

  return (
    <ShopLayout title={"Orders history"} pageDescription={"Orders history"}>
      {!orders.length ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="calc(100vh - 200px)"
          sx={{ flexDirection: { xs: "column", sm: "row" } }}
        >
          <Typography
            variant="h1"
            component="h1"
            fontSize={50}
            fontWeight={200}
          >
            You do not have orders yet.
          </Typography>
        </Box>
      ) : (
        <Box sx={{ padding: { xs: "15px", md: "50px" } }}>
          <Typography variant="h1" component="h1">
            Orders history
          </Typography>

          <Grid container sx={{ mt: 2 }}>
            <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
              />
            </Grid>
          </Grid>
        </Box>
      )}
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session: any = await getSession({ req });
  let user = {} as any;

  if (req.cookies.user) {
    user = JSON.parse(req.cookies.user);
  }

  if (!session && !user.user) {
    return {
      redirect: {
        destination: `/auth/login?p=/orders/history`,
        permanent: false,
      },
    };
  }

  const allOrders = await dbFetchs.getAllOrders();
  let orders: IOrder[] = [];

  if (session) {
    orders = allOrders?.filter((order) => order.user === session.user._id);
  } else {
    orders = allOrders?.filter((order) => order.user === user.user._id);
  }

  return {
    props: { orders },
  };
};

export default HistoryPage;
