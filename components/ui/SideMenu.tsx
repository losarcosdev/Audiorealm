import { useContext, useState } from "react";
import { UIContext } from "../../context/UI/UIContext";
import { useRouter } from "next/router";
import { AuthContext } from "../../context/auth/AuthContext";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import {
  ConfirmationNumberOutlined,
  EscalatorWarningOutlined,
  FemaleOutlined,
  LoginOutlined,
  MaleOutlined,
  SearchOutlined,
  VpnKeyOutlined,
} from "@mui/icons-material";
import { adminLinks, links } from "../../utils";

export const SideMenu = () => {
  const { isAuthenticated, user, onLogout } = useContext(AuthContext);
  const { isSideMenuVisible, handleSideMenuVisibility } = useContext(UIContext);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleNavigate = (url: string) => {
    router.push(url);
    handleSideMenuVisibility();
  };

  const onSearchTerm = () => {
    if (!searchTerm.trim().length) return;
    handleNavigate(`/search/${searchTerm}`);
  };

  return (
    <Drawer
      open={isSideMenuVisible}
      onClose={handleSideMenuVisibility}
      anchor="right"
      sx={{ backdropFilter: "blur(4px)", transition: "all 0.5s ease-out" }}
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          <ListItem>
            <Input
              onKeyPress={(e) => e.key === "Enter" && onSearchTerm()}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="Search..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={onSearchTerm}
                    aria-label="toggle password visibility"
                  >
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItem>

          {isAuthenticated && (
            <ListItemButton onClick={() => handleNavigate("/orders/history")}>
              <ListItemIcon>
                <ConfirmationNumberOutlined />
              </ListItemIcon>
              <ListItemText primary={"My orders"} />
            </ListItemButton>
          )}

          {links.map(({ name, route, Component }) => (
            <ListItemButton
              key={route}
              sx={{
                display: { xs: "", sm: "none" },
                backgroundColor:
                  router.pathname === route ? "lightgray" : "transparent",
              }}
              onClick={() => handleNavigate(route)}
            >
              <ListItemIcon>
                <Component />
              </ListItemIcon>
              <ListItemText
                primary={`${name.slice(0, 1).toUpperCase()}${name.slice(1)}`}
              />
            </ListItemButton>
          ))}

          {!isAuthenticated ? (
            <ListItemButton
              onClick={() => handleNavigate(`/auth/login?p=${router.asPath}`)}
            >
              <ListItemIcon>
                <VpnKeyOutlined />
              </ListItemIcon>
              <ListItemText primary={"Login"} />
            </ListItemButton>
          ) : (
            <ListItemButton onClick={onLogout}>
              <ListItemIcon>
                <LoginOutlined />
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItemButton>
          )}

          {/* Admin */}

          {isAuthenticated && user?.role === "admin" && (
            <>
              <Divider />
              <ListSubheader>Admin Panel</ListSubheader>
              {adminLinks.map(({ name, route, Component }) => (
                <ListItemButton
                  onClick={() => handleNavigate(route)}
                  key={route}
                >
                  <ListItemIcon>
                    <Component />
                  </ListItemIcon>
                  <ListItemText primary={name} />
                </ListItemButton>
              ))}
            </>
          )}
        </List>
      </Box>
    </Drawer>
  );
};
