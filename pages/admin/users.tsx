import React from "react";
import { AdminLayout } from "../../components/layouts/AdminLayout";
import { People } from "@mui/icons-material";
import { Box, Grid, MenuItem, Select, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import useSWR from "swr";
import { IUser } from "../../interfaces";
import audioRealmApi from "../../axios/audioRealmApi";
import { useEffect, useState } from "react";
import { AdminLoading } from "../../components";

const AdminUsersPage = () => {
  const { data, error } = useSWR<IUser[]>("/api/admin/users");
  const [users, setUsers] = useState<IUser[]>([]);

  // Set data to users
  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

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

  if (!error && !data) {
    return <AdminLoading />;
  }

  const handleRoleChange = async (userId: string, role: "admin" | "client") => {
    const previousUsers = [...users];

    const user: number = users.findIndex(({ _id }) => userId === _id);
    users[user].role = role;
    setUsers((users) => [...users]);

    try {
      await audioRealmApi.put("/admin/users", { userId, role });
    } catch (error) {
      setUsers(previousUsers);
      console.log({ error });
    }
  };

  const columns: GridColDef[] = [
    { field: "email", headerName: "Email", width: 300 },
    { field: "fullName", headerName: "Full Name", width: 300 },
    {
      field: "role",
      headerName: "Role",
      width: 100,
      renderCell: ({ row }: any) => {
        return (
          <Select
            value={row.role}
            label="Role"
            onChange={({ target }) => handleRoleChange(row.id, target.value)}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="client">Client</MenuItem>
          </Select>
        );
      },
    },
  ];

  const rows = users.map((user) => ({
    id: user._id,
    email: user.email,
    fullName: user.name,
    role: user.role,
  }));

  return (
    <AdminLayout subTitle="Users list" title="Users" icon={<People />}>
      <Grid container sx={{ mt: 2 }}>
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

export default AdminUsersPage;
