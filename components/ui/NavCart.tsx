import { Typography, Box, Button } from "@mui/material";
import Image from "next/image";
import { ICartProduct } from "../../interfaces";
import { useRouter } from "next/router";
import { RemoveShoppingCartOutlined } from "@mui/icons-material";

interface Props {
  cart: ICartProduct[];
  setShowCart: (boolean: boolean) => void;
  showCart: boolean;
}

export const NavCart = ({ cart, setShowCart, showCart }: Props) => {
  const router = useRouter();

  if (!cart.length) {
    return (
      <Box
        className="fadeIn"
        onMouseEnter={() => setShowCart(true)}
        onMouseLeave={() => setShowCart(false)}
        sx={{
          position: "absolute",
          right: 200,
          top: 50,
          display: `${showCart ? "flex" : "none"}`,
          backgroundColor: "#f8f8f8",
          padding: "20px",
          borderRadius: "5px",
          flexDirection: "column",
          gap: "25px",
          width: "300px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <RemoveShoppingCartOutlined sx={{ fontSize: 60, color: "black" }} />
        <Typography sx={{ color: "darkgray" }}>Empty cart</Typography>
      </Box>
    );
  }

  return (
    <Box
      className="fadeIn"
      onMouseEnter={() => setShowCart(true)}
      onMouseLeave={() => setShowCart(false)}
      sx={{
        position: "absolute",
        right: 200,
        top: 50,
        display: `${showCart ? "flex" : "none"}`,
        backgroundColor: "#f8f8f8",
        padding: "20px",
        borderRadius: "5px",
        flexDirection: "column",
        gap: "25px",
        width: "300px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{ color: "black", fontWeight: "bolder", fontSize: "20px" }}
        >
          CART({cart.length})
        </Typography>
        <Typography sx={{ textDecoration: "underline", color: "gray" }}>
          Remove all
        </Typography>
      </Box>
      {/* Products list */}
      {cart.map((product) => {
        const url = product.images.includes("https://res.cloudinary.com")
          ? product.images
          : `/products-2/${product.images}`;

        return (
          <Box
            key={product._id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "20px",
            }}
          >
            <Image src={url} alt={product.title} width="40px" height="40px" />
            <Box>
              <Typography sx={{ fontWeight: "bolder", color: "black" }}>
                {product.title.slice(0, 10)}...
              </Typography>
              <Typography sx={{ fontWeight: "bolder", color: "gray" }}>
                ${product.price.toFixed(2)}
              </Typography>
            </Box>
            <Typography sx={{ fontWeight: "bolder", color: "gray" }}>
              X{product.quantity}
            </Typography>
          </Box>
        );
      })}
      <Button onClick={() => router.push("/cart")} className="primary-btn">
        SEE CART
      </Button>
    </Box>
  );
};
