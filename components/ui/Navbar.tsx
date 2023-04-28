import { useContext, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Input,
  InputAdornment,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  ClearOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { UIContext, CartContext, AuthContext } from "../../context";
import { NavCart } from "./";
import { links } from "../../utils";

export const Navbar = () => {
  const router = useRouter();
  const { handleSideMenuVisibility } = useContext(UIContext);
  const { cart } = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);
  const [showCart, setShowCart] = useState<boolean>(false);

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;
    router.push(`/search/${searchTerm}`);
  };

  return (
    <AppBar
      sx={{
        height: { xs: "18vh", lg: "10vh" },
        marginBottom: "1px solid gray",
      }}
    >
      <Toolbar
        sx={{
          borderBottom: ".5px solid #2a2a2a",
          justifyContent: "space-around",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <NextLink href="/" passHref>
          <Link display="flex" alignItems="center">
            <Typography variant="h6" className="fadeIn">
              audiorealm
            </Typography>
          </Link>
        </NextLink>

        {/* Links */}
        <Box
          sx={{
            display: { xs: "none", sm: isSearchVisible ? "none" : "flex" },
            gap: "10px",
          }}
          className="fadeIn"
        >
          {links.map(({ name, route }) => (
            <NextLink href={route} passHref key={route}>
              <Link>
                <Button
                  color={router.pathname === route ? "primary" : "secondary"}
                  variant={router.pathname === route ? "text" : "contained"}
                >
                  {name.toUpperCase()}
                </Button>
              </Link>
            </NextLink>
          ))}
        </Box>
        <Box sx={{ display: "flex", gap: "15px", padding: "10px" }}>
          {/* Pantallas pantallas grandes */}
          {isSearchVisible ? (
            <Input
              sx={{
                display: { xs: "none", sm: "flex" },
                backgroundColor: "whitesmoke",
                padding: "5px",
                borderRadius: "10px",
              }}
              className="fadeIn"
              autoFocus
              value={searchTerm}
              onBlur={() => setIsSearchVisible(false)}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => (e.key === "Enter" ? onSearchTerm() : null)}
              type="text"
              placeholder="Search..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={() => setIsSearchVisible(false)}>
                    <ClearOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          ) : (
            <IconButton
              onClick={() => setIsSearchVisible(true)}
              className="fadeIn"
              sx={{ display: { xs: "none", sm: "flex" } }}
            >
              <SearchOutlined sx={{ color: "white" }} />
            </IconButton>
          )}

          {/* Pantallas pequeñas */}
          <IconButton
            sx={{ display: { xs: "flex", sm: "none" } }}
            onClick={handleSideMenuVisibility}
          >
            <SearchOutlined sx={{ color: "white" }} />
          </IconButton>

          <NextLink href="/cart" passHref>
            <Link>
              <IconButton
                onMouseEnter={() => setShowCart(true)}
                onMouseLeave={() => setShowCart(false)}
              >
                <Badge
                  badgeContent={`${cart.length > 9 ? "+9" : cart.length}`}
                  color="warning"
                >
                  <ShoppingCartOutlined sx={{ color: "white" }} />
                </Badge>
              </IconButton>
            </Link>
          </NextLink>

          
          <NavCart cart={cart} showCart={showCart} setShowCart={setShowCart} />

          {isAuthenticated ? (
            <Button
              onClick={handleSideMenuVisibility}
              color="primary"
              variant="outlined"
            >
              Menu
            </Button>
          ) : (
            <>
              <Button
                sx={{ display: { xs: "flex", md: "none" } }}
                onClick={handleSideMenuVisibility}
                color="primary"
                variant="outlined"
              >
                Menu
              </Button>
              <Button
                sx={{ display: { xs: "none", md: "flex" } }}
                color="primary"
                variant="contained"
                onClick={() => router.push(`/auth/login?p=${router.asPath}`)}
              >
                Login
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
