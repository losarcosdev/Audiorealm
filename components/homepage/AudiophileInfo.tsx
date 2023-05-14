import { Box, Typography } from "@mui/material";
import Image from "next/image";

export const AudiophileInfo = () => {
  return (
    <>
      {/* // * Desktop view*/}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          height: "100vh",
          justifyContent: "space-around",
          mt: "150px",
        }}
      >
        {/* Info */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: "500px",
          }}
        >
          <Typography
            sx={{ fontWeight: "bold", fontSize: "45px", textAlign: "left" }}
          >
            BRINGING YOU THE <span style={{ color: "#dd7404" }}>BEST</span>{" "}
            AUDIO GEAR
          </Typography>
          <Typography
            sx={{
              textAlign: "left",
              color: "gray",
            }}
          >
            Located at the heart of New York City, Audiophile is the premier
            store for high end headphones, earphones, speakers, and audio
            accessories. We have a large showroom and luxury demonstration rooms
            available for you to browse and experience a wide range of our
            products. Stop by our store to meet some of the fantastic people who
            make Audiophile the best place to buy your portable audio equipment.
          </Typography>
        </Box>

        {/* Image */}
        <Box>
          <img
            src="/model-headphone.jpg"
            alt="Men in black and white wearing headphones"
            width={"500px"}
            height={"500px"}
          />
        </Box>
      </Box>
      {/* //*Mobile view */}
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          flexDirection: "column",
          my: "100px",
          gap: "10px",
        }}
      >
        {/* Info */}

        <Typography
          sx={{ fontWeight: "bold", fontSize: "30px", textAlign: "center" }}
        >
          BRINGING YOU THE <span style={{ color: "#dd7404" }}>BEST</span> AUDIO
          GEAR
        </Typography>

        {/* Image */}
        <Image
          src="/model-headphone.jpg"
          alt="Men in black and white wearing headphones"
          width={"500px"}
          height={"500px"}
        />
        <Typography
          sx={{
            textAlign: "justify",
            color: "gray",
            padding: "10px",
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
    </>
  );
};
