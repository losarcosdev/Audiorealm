import { AddOutlined, CategoryOutlined } from "@mui/icons-material";
import { Box, Button, CardMedia, Grid, Link, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { AdminLayout, AdminLoading } from "../../../components";
import useSWR from "swr";
import { IProduct } from "../../../interfaces";
import NextLink from "next/link";

const columns: GridColDef[] = [
  {
    field: "image",
    headerName: "Image",
    width: 300,
    renderCell: ({ row }): any => {
      return (
        <a href={`/product/${row.slug}`} target="_blank" rel="noreferrer">
          <CardMedia
            component="img"
            className="fadeIn"
            image={`/products-2/${row.image}`}
            alt={row.title}
            sx={{ padding: "100px" }}
          />
        </a>
      );
    },
  },
  {
    field: "title",
    headerName: "Title",
    width: 300,
    renderCell: ({ row }): any => {
      return (
        <NextLink href={`/admin/products/${row.slug}`} passHref>
          <Link underline="always">{row.title}</Link>
        </NextLink>
      );
    },
  },
  { field: "category", headerName: "Category", width: 300 },
  { field: "price", headerName: "Price", width: 300 },
  { field: "stock", headerName: "Stock", width: 300 },
];

const AdminProductsPage = () => {
  const { data, error } = useSWR<IProduct[]>("/api/admin/products");

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
          Error loading products - Try again.
        </Typography>
      </Box>
    );
  }

  if (!error && !data) {
    return <AdminLoading />;
  }

  const rows = data!.map((product) => ({
    id: product._id,
    image: product.images[0],
    category: product.category,
    price: product.price,
    stock: product.inStock,
    title: product.title,
    slug: product.slug,
  }));

  return (
    <AdminLayout
      title={`Products: ${data?.length}`}
      subTitle="Products maintenance"
      icon={<CategoryOutlined />}
    >
      <Box display="flex" justifyContent="end" sx={{ smb: 2 }}>
        <Button
          startIcon={<AddOutlined />}
          color="secondary"
          href="/admin/products/create-product"
        >
          Create product
        </Button>
      </Box>
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

export default AdminProductsPage;
