/* eslint-disable @next/next/no-img-element */

import { Box } from "@mui/material";
import { FC, useState } from "react";
import styles from "./ProductSlideshow.module.css";

interface Props {
  images: string[];
}

export const ProductSlideshow: FC<Props> = ({ images }) => {
  const [activeImage, setActiveImage] = useState<string>(
    images[0].includes("https://res.cloudinary.com")
      ? images[0]
      : `/products-2/${images[0]}`
  );

  const handleSelectImage = (url: string, i: number) => {
    setActiveImage(url);
  };

  return (
    <Box className={styles.container}>
      <Box
        className={styles.left}
        sx={{
          flexDirection: { xs: "column-reverse", md: "row" },
          alignItems: { xs: "center", md: "normal" },
        }}
      >
        <Box
          className={styles.left_1}
          sx={{
            flexDirection: { xs: "row", md: "column" },
          }}
        >
          {images.map((image, i) => {
            const url = image.includes("https://res.cloudinary.com")
              ? image
              : `/products-2/${image}`;

            return (
              <Box
                className={`${styles.img_wrap} ${
                  activeImage === url && styles.active
                }`}
                key={i}
                onMouseEnter={() => handleSelectImage(url, i)}
              >
                <img src={url} alt="Product image" />
              </Box>
            );
          })}
        </Box>
        <Box className={styles.left_2}>
          <img src={activeImage} alt="Product image" />
        </Box>
      </Box>
    </Box>
  );
};
