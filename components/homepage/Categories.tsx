import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Typography,
} from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";
import { useRouter } from "next/router";
import style from "./category.module.css";

const sliderImages = [
  "/categories-section/headphone.png",
  "/categories-section/speaker.png",
  "/categories-section/earphone.png",
];

export const Categories = () => {
  const router = useRouter();
  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: "50px",
        height: { md: "50vh" },
        justifyContent: "center",
        marginBottom: "80px",
        marginTop: "80px",
        padding: "20px",
      }}
    >
      {sliderImages.map((image) => {
        let category = "headphones";

        if (image.includes("earphone")) category = "earphones";
        if (image.includes("speaker")) category = "speakers";

        return (
          <Card
            className={style["category-card"]}
            sx={{ width: { xs: "90%", md: "27%" } }}
            key={image}
            onClick={() => router.push(`/category/${category}`)}
          >
            <CardActionArea
              sx={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <CardMedia
                component="img"
                className="fadeIn"
                image={image}
                sx={{ width: "200px", height: "200px", padding: "20px" }}
              />
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  padding: "15px",
                }}
              >
                <Typography sx={{ fontWeight: "bolder", fontSize: "16px" }}>
                  {category.toUpperCase()}
                </Typography>
                <Typography
                  sx={{
                    alignItems: "center",
                    color: "gray",
                    display: "flex",
                    fontSize: "14px",
                    fontWeight: "bolder",
                  }}
                >
                  SHOP
                  <ArrowForwardIos
                    sx={{
                      color: "#dd7404",
                      fontSize: "14px",
                      fontWeight: "bolder",
                    }}
                  />
                </Typography>
              </Box>
            </CardActionArea>
          </Card>
        );
      })}
    </Box>
  );
};
