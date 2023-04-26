import { useState, useEffect } from "react";
import useSWR from "swr";
import {
  AttachMoneyOutlined,
  CreditCardOffOutlined,
  CreditCardOutlined,
  DashboardOutlined,
  GroupOutlined,
  CategoryOutlined,
  CancelPresentationOutlined,
  ProductionQuantityLimitsOutlined,
  AccessTimeOutlined,
} from "@mui/icons-material";

import { AdminLayout } from "../../components/layouts";
import { Grid, Typography, Box, CircularProgress } from "@mui/material";
import { AdminLoading, FullScreenLoading, SummaryTile } from "../../components";
import { IStoreStatisticsResponse } from "../../interfaces";

const DashboardPage = () => {
  const { data, error } = useSWR<IStoreStatisticsResponse>(
    "/api/admin/dashboard",
    {
      refreshInterval: 30 * 1000, // 30 sec
    }
  );

  const [refreshIn, setRefreshIn] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Tick");
      setRefreshIn((refreshIn) => (refreshIn > 0 ? refreshIn - 1 : 30));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!error && !data) {
    return <AdminLoading />;
  }

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
          Error loading info - Try again.
        </Typography>
      </Box>
    );
  }

  const {
    numberOfClients,
    numberOfOrders,
    numberOfProducts,
    paidOrders,
    productsWithLowStock,
    productsWithNoStock,
    unpaidOrders,
  } = data!;

  return (
    <AdminLayout
      title="Dashboard"
      subTitle="Store statistics"
      icon={<DashboardOutlined />}
    >
      <h1>Admin dashboard</h1>
      <Grid container spacing={2}>
        <SummaryTile
          title={numberOfOrders}
          subTitle="All orders"
          icon={<CreditCardOutlined color="secondary" sx={{ fontSize: 40 }} />}
        />

        <SummaryTile
          title={paidOrders}
          subTitle="Payed Orders"
          icon={<AttachMoneyOutlined color="success" sx={{ fontSize: 40 }} />}
        />

        <SummaryTile
          title={unpaidOrders}
          subTitle="Pending Orders"
          icon={<CreditCardOffOutlined color="error" sx={{ fontSize: 40 }} />}
        />

        <SummaryTile
          title={numberOfClients}
          subTitle="Clients"
          icon={<GroupOutlined color="primary" sx={{ fontSize: 40 }} />}
        />

        <SummaryTile
          title={numberOfProducts}
          subTitle="Products"
          icon={<CategoryOutlined color="warning" sx={{ fontSize: 40 }} />}
        />

        <SummaryTile
          title={productsWithNoStock}
          subTitle="No stock"
          icon={
            <CancelPresentationOutlined color="error" sx={{ fontSize: 40 }} />
          }
        />

        <SummaryTile
          title={productsWithLowStock}
          subTitle="Low stock"
          icon={
            <ProductionQuantityLimitsOutlined
              color="warning"
              sx={{ fontSize: 40 }}
            />
          }
        />
        <SummaryTile
          title={refreshIn}
          subTitle="Update in:"
          icon={<AccessTimeOutlined color="secondary" sx={{ fontSize: 40 }} />}
        />
      </Grid>
    </AdminLayout>
  );
};

export default DashboardPage;
