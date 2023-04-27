import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Chip,
  CircularProgress,
} from "@mui/material";
import {
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from "@mui/icons-material";
import { ShopLayout } from "../../components/layouts/ShopLayout";
import { CartList, OrderSummary } from "../../components";
import { dbFetchs } from "../../database";
import { IOrder } from "../../interfaces";
import audioRealmApi from "../../axios/audioRealmApi";
import { useRouter } from "next/router";
import { useState } from "react";

interface Props {
  order: IOrder;
}

export type OrderResponseBody = {
  id: string;
  status:
    | "COMPLETED"
    | "SAVED"
    | "APPROVED"
    | "VOIDED"
    | "COMPLETED"
    | "PAYER_ACTION_REQUIRED";
};

const OrderPage = ({ order }: Props) => {
  const router = useRouter();
  const [loadingPayment, setLoadingPayment] = useState<boolean>(false);

  const handleApprovePayment = async (details: OrderResponseBody) => {
    if (details.status !== "COMPLETED") {
      return alert("No payment in paypal");
    }
    setLoadingPayment(true);

    try {
      const transactionId = details.id;
      const { data } = await audioRealmApi.post("/orders/pay", {
        transactionId,
        orderId: order._id,
      });

      router.reload();
    } catch (error) {
      setLoadingPayment(false);
      console.log({ error });
      alert("Error");
    }
  };

  return (
    <ShopLayout title={`Order: ${order._id}`}>
      <Box sx={{ padding: "40px" }}>
        <Typography variant="h1" component="h1" display="flex" flexWrap="wrap">
          Order:{order._id}
        </Typography>

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
                  <Box
                    className="fadeIn"
                    sx={{
                      width: "100%",
                      justifyContent: "center",
                      display: loadingPayment ? "flex" : "none",
                    }}
                  >
                    <CircularProgress />
                  </Box>
                  <Box
                    sx={{
                      flexDirection: "column",
                      flex: 1,
                      display: loadingPayment ? "none" : "flex",
                    }}
                  >
                    {order.isPaid ? (
                      <Chip
                        sx={{ my: 2, width: "100%" }}
                        label="Order already payed"
                        variant="outlined"
                        color="success"
                        icon={<CreditScoreOutlined />}
                      />
                    ) : (
                      <PayPalButtons
                        createOrder={(data, actions) => {
                          return actions.order.create({
                            purchase_units: [
                              {
                                amount: {
                                  value: order.total.toString(),
                                },
                              },
                            ],
                          });
                        }}
                        onApprove={(data, actions): any => {
                          return actions.order!.capture().then((details) => {
                            handleApprovePayment(details as any);
                          });
                        }}
                      />
                    )}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const { id = "" } = params as { id: string };
  const session: any = await getSession({ req });
  let user = {} as any;

  if (req.cookies.user) {
    user = JSON.parse(req.cookies.user);
  }

  if (!session && !user.user) {
    return {
      redirect: {
        destination: `/auth/login?p=/orders/${id}`,
        permanent: false,
      },
    };
  }

  const order = await dbFetchs.getOrderById(id);

  if (!order) {
    return {
      redirect: {
        destination: "/orders/history",
        permanent: false,
      },
    };
  }

  let userID: string = "";

  if (session) {
    userID = session.user._id;
  } else {
    userID = user.user._id;
  }

  if (order.user !== userID) {
    return {
      redirect: {
        destination: "/orders/history",
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

export default OrderPage;
