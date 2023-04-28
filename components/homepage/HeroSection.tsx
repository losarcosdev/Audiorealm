import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";

export const HeroSection = () => {
  const router = useRouter();
  return (
    <Box
      className="gradient-background-01 fadeIn"
      sx={{
        height: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        position: "relative",
        width: "100%",
      }}
    >
      {/* Hero Description */}
      <Box display="flex" flexDirection="column" gap="25px">
        <Typography
          sx={{
            letterSpacing: "4px",
            fontWeight: "lighter",
            textAlign: { xs: "center", md: "left" },
          }}
          color="whitesmoke"
        >
          NEW PRODUCT
        </Typography>
        <Typography
          sx={{
            letterSpacing: "1px",
            fontWeight: "bolder",
            fontSize: "50px",
            textAlign: { xs: "center", md: "left" },
          }}
          color="whitesmoke"
        >
          EDIFIER W820NB <br />
          HEADPHONES
        </Typography>
        <Typography
          sx={{
            fontWeight: "lighter",
            textAlign: { xs: "center", md: "left" },
          }}
          color="whitesmoke"
        >
          Experience natural, lifelike audio and exceptional <br /> build
          quality made for the passionate music <br /> enthusiast.
        </Typography>
        <Button
          onClick={() => router.push("/product/edifier_w820nb")}
          variant="outlined"
          color="primary"
        >
          SEE PRODUCT
        </Button>
      </Box>

      {/* Hero Image */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
        }}
      >
        <Image
          src={"/hero-headphone.png"}
          width="500px"
          height="500px"
          alt="edifier"
        />
      </Box>
    </Box>
  );
};
