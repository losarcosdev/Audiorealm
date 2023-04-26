import { useContext } from "react";
import NextLink from "next/link";

import { AppBar, Box, Button, Link, Toolbar, Typography } from "@mui/material";

import { UIContext } from "../../context";

export const AdminNavbar = () => {
  const { handleSideMenuVisibility } = useContext(UIContext);

  return (
    <AppBar>
      <Toolbar>
        <NextLink href="/" passHref>
          <Link display="flex" alignItems="center">
            <Typography variant="h6" sx={{ color: "white" }}>
              AUDIOREALM
            </Typography>
          </Link>
        </NextLink>

        <Box flex={1} />

        <Button onClick={handleSideMenuVisibility}>Menu</Button>
      </Toolbar>
    </AppBar>
  );
};
