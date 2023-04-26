import { Box, Typography } from "@mui/material";
import Image from "next/image";

export const AudiophileInfo = () => {
  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        flexDirection: { xs: "column-reverse", md: "row" },
        height: { xs: "", md: "100vh" },
        justifyContent: { xs: "center", md: "space-between" },
        margin: "auto",
        marginTop: "50px",
        width: "85%",
      }}
    >
      {/* Info */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography sx={{ fontWeight: "bold", fontSize: "45px" }}>
          BRINGING YOU THE <br /> <span style={{ color: "#dd7404" }}>BEST</span>{" "}
          AUDIO GEAR
        </Typography>
        <Typography
          sx={{
            textAlign: { xs: "center", md: "left" },
            color: "gray",
            width: "450px",
          }}
        >
          Located at the heart of New York City, Audiophile is the premier store
          for high end headphones, earphones, speakers, and audio accessories.
          We have a large showroom and luxury demonstration rooms available for
          you to browse and experience a wide range of our products. Stop by our
          store to meet some of the fantastic people who make Audiophile the
          best place to buy your portable audio equipment.
        </Typography>
      </Box>

      {/* Image */}
      <Box>
        <Image
          src="/model-headphone.jpg"
          alt="Men in black and white wearing headphones"
          width={"500px"}
          height={"500px"}
        />
      </Box>
    </Box>
  );
};
