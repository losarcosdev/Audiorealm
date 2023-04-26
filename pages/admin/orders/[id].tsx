import { GetServerSideProps } from "next";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Chip,
} from "@mui/material";
import {
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from "@mui/icons-material";
import { AdminLayout } from "../../../components/layouts";
import { CartList, OrderSummary } from "../../../components";
import { dbFetchs } from "../../../database";
import { IOrder } from "../../../interfaces";

interface Props {
  order: IOrder;
}

const AdminOrderPage = ({ order }: Props) => {
  return (
    <AdminLayout title="Order:" subTitle={order._id!}>
      {order.isPaid ? (
        <Chip
          sx={{ my: 2 }}
          label="Order already payed"
          variant="outlined"
          color="success"
          icon={<CreditScoreOutlined />}
        />
      ) : (
        <Chip
          sx={{ my: 2 }}
          label="Payment pending"
          variant="outlined"
          color="error"
          icon={<CreditCardOffOutlined />}
        />
      )}

      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList orderItems={order.orderItems} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">
                Resume:
                {` ${order.orderItems.length} ${
                  order.orderItems.length > 1 ? "products" : "product"
                }`}
              </Typography>
              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">Shipping address</Typography>
              </Box>

              <Typography>{`${order.shippingAddress.name} ${order.shippingAddress.lastName}`}</Typography>
              <Typography>{`${order.shippingAddress.address} ${order.shippingAddress.address2}`}</Typography>
              <Typography>{`${order.shippingAddress.city}`}</Typography>
              <Typography>{`${order.shippingAddress.country}`}</Typography>
              <Typography>{`${order.shippingAddress.phoneNumber}`}</Typography>

              <Divider sx={{ my: 1 }} />

              <OrderSummary
                summary={{
                  subtotal: order.subtotal,
                  tax: order.tax,
                  total: order.total,
                  totalNumberOfItems: order.totalNumberOfItems,
                }}
              />

              <Box sx={{ mt: 3 }}>
                {order.isPaid ? (
                  <Chip
                    sx={{ my: 2, width: "100%" }}
                    label="Order already payed"
                    variant="outlined"
                    color="success"
                    icon={<CreditScoreOutlined />}
                  />
                ) : (
                  <Chip
                    sx={{ my: 2, width: "100%" }}
                    label="Payment pending"
                    variant="outlined"
                    color="error"
                    icon={<CreditScoreOutlined />}
                  />
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const { id = "" } = params as { id: string };

  const order = await dbFetchs.getOrderById(id);

  if (!order) {
    return {
      redirect: {
        destination: "/admin/orders",
        permanent: false,
      },
    };
  }

  return {
    props: {
      order,
    },
  };
};

export default AdminOrderPage;
