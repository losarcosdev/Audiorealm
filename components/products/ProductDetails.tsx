import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { IProduct } from "../../interfaces";
import { useState } from "react";

interface Props {
  product: IProduct;
}

export const ProductDetails = ({ product }: Props) => {
  const [isActive, setIsActive] = useState<boolean>(true);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "73%",
        margin: "auto",
        gap: "20px",
        minHeight: "35vh",
      }}
    >
      {/* Buttons */}
      <Box
        sx={{
          borderBottom: "2px solid #f1f1f1",
          display: "flex",
          gap: "50px",
          width: "100%",
        }}
      >
        <Button
          onClick={() => setIsActive(true)}
          variant="text"
          sx={{
            borderBottom: isActive
              ? "3px solid #dd7404"
              : "3px solid transparent",
            color: isActive ? "black" : "#f1f1f1",
            fontSize: { xs: "15px", md: "20px" },
            fontWeight: "bolder",
            padding: "10px",
          }}
        >
          PRODUCT DESCRIPTION
        </Button>
        <Button
          onClick={() => setIsActive(false)}
          variant="text"
          sx={{
            borderBottom: !isActive
              ? "3px solid #dd7404"
              : "3px solid transparent",
            color: !isActive ? "black" : "#f1f1f1",
            fontSize: { xs: "15px", md: "20px" },
            fontWeight: "bolder",
            padding: "10px",
          }}
        >
          IN THE BOX
        </Button>
      </Box>

      {isActive ? (
        // Product description
        <Box sx={{ display: isActive ? "flex" : "none" }}>
          <Typography
            sx={{ color: "gray", textAlign: { xs: "center", md: "left" } }}
          >
            Audio potente y amplificado - La acústica refinada de los
            auriculares y las bocinas de 50 mm afinados por expertos son
            potentes para darte un audio preciso e inmersivo. El micrófono GEN 2
            se dobla para silenciar: un micrófono más grande, de alta
            sensibilidad y alto rendimiento mejora la claridad al hablar y se
            integra perfectamente en los auriculares para silenciar. Auditivo
            superhumano - La configuración de sonido de audición superhumana
            exclusiva de Turtle Beach te permite escuchar sonidos sutiles y
            cambiantes del juego para que puedas vivir hasta un 20% más tiempo y
            ganar más. Datos del estudio de la audición superhumana de Turtle
            Beach realizado por Real Industry, mayo de 2021. La ventaja del
            audio 3D: libera la potencia del audio 3D, ofreciendo un sonido
            envolvente espacial preciso para una experiencia de juego envolvente
            y realista en PS5. Monitoreo de micrófono variable: escucha y ajusta
            tu propia voz mientras hablas con amigos para que estés al tanto de
            tu propio volumen y no tengas que gritar. Apto para lentes: nuestro
            cómodo y exclusivo diseño patentado ProSpecs elimina la presión
            sobre tus lentes mientras juegas. La batería tiene una duración de
            15 horas: siempre prepárate para jugar hasta 15 horas por carga
            utilizando el cable de carga USB-C incluido.
          </Typography>
        </Box>
      ) : (
        // In the box
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "bolder", color: "#dd7404" }}>
              1x
            </Typography>
            <Typography sx={{ color: "#9c9c9c" }}>Headphone Unit</Typography>
          </Box>

          <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "bolder", color: "#dd7404" }}>
              2x
            </Typography>

            <Typography sx={{ color: "#9c9c9c" }}>
              Replacement Earcups
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "bolder", color: "#dd7404" }}>
              1x
            </Typography>

            <Typography sx={{ color: "#9c9c9c" }}>
              3.5mmm 5m Audio Cable
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "bolder", color: "#dd7404" }}>
              1x
            </Typography>
            <Typography sx={{ color: "#9c9c9c" }}>Travel Bag</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "bolder", color: "#dd7404" }}>
              1x
            </Typography>
            <Typography sx={{ color: "#9c9c9c" }}>Headphone Unit</Typography>
          </Box>

          <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "bolder", color: "#dd7404" }}>
              2x
            </Typography>

            <Typography sx={{ color: "#9c9c9c" }}>
              Replacement Earcups
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "bolder", color: "#dd7404" }}>
              1x
            </Typography>

            <Typography sx={{ color: "#9c9c9c" }}>
              3.5mmm 5m Audio Cable
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Typography sx={{ fontWeight: "bolder", color: "#dd7404" }}>
              1x
            </Typography>
            <Typography sx={{ color: "#9c9c9c" }}>Travel Bag</Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};
