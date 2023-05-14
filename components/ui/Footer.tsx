/* eslint-disable react/no-unescaped-entities */
import { Link, Typography, Button, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Facebook, Twitter, Instagram } from "@mui/icons-material";
import { links } from "../../utils";

export const Footer = () => {
  const router = useRouter();

  return (
    <footer
      style={{ marginTop: "50px", backgroundColor: "black", width: "100%" }}
    >
      {/* Small screens */}
      <Box
        sx={{
          alignItems: "center",
          display: { xs: "flex", md: "none" },
          flexDirection: "column",
          justifyContent: "center",
          padding: "50px",
          gap: "35px",
        }}
      >
        <NextLink href="/" passHref>
          <Link display="flex" alignItems="center">
            <Typography variant="h6" className="fadeIn">
              audiorealm
            </Typography>
          </Link>
        </NextLink>
        <Box
          sx={{
            flexDirection: "column",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
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
        <Typography sx={{ color: "gray", textAlign: "center" }}>
          Audiorealm is an all in one stop to fulfill your audio needs. We're a
          small team of music lovers and sound specialists who are devoted to
          helping you get the most out of personal audio. Come and visit our
          demo facility - we’re open 7 days a week.
        </Typography>
        <Typography
          sx={{ color: "gray", fontWeight: "bolder", fontSize: "14px" }}
        >
          Copyright &copy; 2022. All Rights Reserved
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton>
            <Facebook
              sx={{
                color: "white",
                fontSize: "30px",
                "&:hover": {
                  color: "#dd7404",
                },
              }}
            />
          </IconButton>
          <IconButton>
            <Twitter
              sx={{
                color: "white",
                fontSize: "30px",
                "&:hover": {
                  color: "#dd7404",
                },
              }}
            />
          </IconButton>
          <IconButton>
            <Instagram
              sx={{
                color: "white",
                fontSize: "30px",
                "&:hover": {
                  color: "#dd7404",
                },
              }}
            />
          </IconButton>
        </Box>
      </Box>

      {/* Medium and large screens */}
      <Box
        sx={{
          backgroundColor: "black",
          display: { xs: "none", md: "flex" },
          justifyContent: "space-between",
          padding: "50px",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "30px" }}>
          <NextLink href="/" passHref>
            <Link display="flex" alignItems="center">
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bolder",
                  color: "white",
                  fontSize: "30px",
                }}
                className="fadeIn"
              >
                audiorealm
              </Typography>
            </Link>
          </NextLink>
          <Typography sx={{ color: "gray", textAlign: "left" }}>
            Audiorealm is an all in one stop to fulfill your audio needs. We're
            a small team <br /> of music lovers and sound specialists who are
            devoted to helping you get the <br /> most out of personal audio.
            Come and visit our demo facility - we’re open 7 <br /> days a week.
          </Typography>
          <Typography sx={{ color: "gray", fontWeight: "bolder" }}>
            Copyright &copy; 2022. All Rights Reserved
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: "30px" }}>
          {/* Links */}
          <Box>
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
          {/* Social media buttons */}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton>
              <Facebook
                sx={{
                  color: "white",
                  fontSize: "30px",
                  "&:hover": {
                    color: "#dd7404",
                  },
                }}
              />
            </IconButton>
            <IconButton>
              <Twitter
                sx={{
                  color: "white",
                  fontSize: "30px",
                  "&:hover": {
                    color: "#dd7404",
                  },
                }}
              />
            </IconButton>
            <IconButton>
              <Instagram
                sx={{
                  color: "white",
                  fontSize: "30px",
                  "&:hover": {
                    color: "#dd7404",
                  },
                }}
              />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </footer>
  );
};
