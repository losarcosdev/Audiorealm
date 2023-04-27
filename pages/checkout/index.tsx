import {
  Box,
  Typography,
  Card,
  TextField,
  Button,
  FormControl,
  MenuItem,
  Select,
  Chip,
} from "@mui/material";
import {
  CreatingOrderLoading,
  OrderSummary,
  ShopLayout,
} from "../../components";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { CartContext } from "../../context";
import { IShippingAddress } from "../../interfaces";
import { countries } from "../../utils";
import Image from "next/image";

interface FormData {
  address: string;
  address2: string;
  city: string;
  country: string;
  lastName: string;
  name: string;
  phoneNumber: string;
  postalCode: string;
}

const getAddresFromCookies = () => {
  return {
    address: Cookies.get("address") || "",
    address2: Cookies.get("address2") || "",
    city: Cookies.get("city") || "",
    country: Cookies.get("country") || "",
    lastName: Cookies.get("lastName") || "",
    name: Cookies.get("name") || "",
    phoneNumber: Cookies.get("phoneNumber") || "",
    postalCode: Cookies.get("postalCode") || "",
  };
};

const CheckoutPage = () => {
  const router = useRouter();
  const { cart, createOrder } = useContext(CartContext);
  const { updateAddress } = useContext(CartContext);
  const [loadingOrder, setLoadingOrder] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [editAddress, setEditAddress] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: getAddresFromCookies(),
  });

  const handleLoadAddress = (formData: FormData) => {
    updateAddress(formData as IShippingAddress);
    setEditAddress(!editAddress);
  };

  const handleCreateOrder = async () => {
    if (!Cookies.get("address")) {
      alert("Please add an address");
      return;
    }
    setLoadingOrder(() => true);
    const { hasError, message } = await createOrder();

    if (hasError) {
      setLoadingOrder(false);
      setErrorMessage(message);
      return;
    }

    router.replace(`/orders/${message}`);
  };

  if (loadingOrder) return <CreatingOrderLoading />;

  return (
    <ShopLayout title="Checkout">
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          padding: { xs: "15px", md: "50px" },
          gap: "30px",
        }}
      >
        {/* Checkout */}
        <form onSubmit={handleSubmit(handleLoadAddress)} noValidate>
          <Card
            sx={{
              padding: "30px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              backgroundColor: "#f7f7f7",
              width: { xs: "100%", md: "60vw" },
            }}
          >
            <Typography sx={{ fontWeight: "bolder", fontSize: "30px" }}>
              CHECKOUT
            </Typography>
            <Typography
              sx={{ color: "#dd7404", fontWeight: "bolder", fontSize: "14px" }}
            >
              BILLING DETAILS
            </Typography>
            {/* Billing details */}
            <Box
              sx={{
                display: "flex",
                gap: "20px",
                flexWrap: { xs: "nowrap", md: "wrap" },
              }}
            >
              <TextField
                {...register("name", {
                  required: "Required field",
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
                label="Name"
                variant="outlined"
                disabled={editAddress}
                sx={{ width: { xs: "100%", md: "fit-content" } }}
              />
              <TextField
                {...register("lastName", {
                  required: "Required field",
                })}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                label="Last Name"
                variant="outlined"
                disabled={editAddress}
                sx={{ width: { xs: "100%", md: "fit-content" } }}
              />
              <TextField
                {...register("phoneNumber", {
                  required: "Required field",
                })}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber?.message}
                label="Phone number"
                variant="outlined"
                disabled={editAddress}
                sx={{ width: { xs: "100%", md: "fit-content" } }}
              />
            </Box>
            <Typography
              sx={{ color: "#dd7404", fontWeight: "bolder", fontSize: "14px" }}
            >
              SHIPPING INFO
            </Typography>
            <Box sx={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              <TextField
                {...register("address", {
                  required: "Required field",
                })}
                error={!!errors.address}
                helperText={errors.address?.message}
                label="Address"
                variant="outlined"
                disabled={editAddress}
                sx={{ width: { xs: "100%", md: "fit-content" } }}
              />
              <TextField
                label="Address 2 (optional)"
                variant="outlined"
                disabled={editAddress}
                sx={{ width: { xs: "100%", md: "fit-content" } }}
              />
              <TextField
                {...register("postalCode", {
                  required: "Required field",
                })}
                error={!!errors.postalCode}
                helperText={errors.postalCode?.message}
                label="ZIP Code"
                variant="outlined"
                disabled={editAddress}
                sx={{ width: { xs: "100%", md: "fit-content" } }}
              />
              <TextField
                {...register("city", {
                  required: "Required field",
                })}
                error={!!errors.city}
                helperText={errors.city?.message}
                label="City"
                variant="outlined"
                disabled={editAddress}
                sx={{ width: { xs: "100%", md: "fit-content" } }}
              />
              <FormControl>
                <Select
                  {...register("country", {
                    required: "Required field",
                  })}
                  error={!!errors.country}
                  variant="outlined"
                  label="Country"
                  defaultValue={countries[0].code}
                  disabled={editAddress}
                  sx={{ width: { xs: "100%", md: "fit-content" } }}
                >
                  {countries.map(({ code, name }) => (
                    <MenuItem key={code} value={code}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            {editAddress && (
              <Button
                type="submit"
                className="primary-btn"
                size="large"
                onClick={() => setEditAddress(!editAddress)}
              >
                EDIT ADDRESS
              </Button>
            )}
            {!editAddress && (
              <Button type="submit" className="primary-btn" size="large">
                CONFIRM ADDRESS
              </Button>
            )}
          </Card>
        </form>

        {/* Summary */}
        <Card
          sx={{
            padding: "30px",
            width: { xs: "100%", md: "70%" },
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            backgroundColor: "#f7f7f7",
          }}
        >
          <Typography sx={{ fontWeight: "bolder", fontSize: "20px" }}>
            SUMMARY
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "50px",
            }}
          >
            {/* Products list */}
            <Box sx={{ display: "flex", gap: "20px", flexDirection: "column" }}>
              {cart.map((product) => {
                const url = product.images.includes(
                  "https://res.cloudinary.com"
                )
                  ? product.images
                  : `/products-2/${product.images}`;

                return (
                  <Box
                    key={product._id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                        gap: "15px",
                      }}
                    >
                      <Image
                        src={url}
                        height={"70px"}
                        width={"70px"}
                        alt={product.title}
                      />
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography sx={{ fontWeight: "bolder" }}>
                          {product.title.slice(0, 10)}...
                        </Typography>
                        <Typography
                          sx={{ fontWeight: "bolder", color: "gray" }}
                        >
                          ${product.price}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography sx={{ fontWeight: "bolder", color: "gray" }}>
                      X{product.quantity}
                    </Typography>
                  </Box>
                );
              })}
            </Box>

            {/* Summary */}
            <OrderSummary />

            {/* Confirm button */}
            <Box sx={{ mt: 3 }}>
              <Button
                onClick={handleCreateOrder}
                className="primary-btn"
                fullWidth
                disabled={loadingOrder}
              >
                CONFIRM ORDER
              </Button>
              {errorMessage && (
                <Chip
                  sx={{ width: "100%", mt: "10px" }}
                  color="error"
                  label={errorMessage}
                />
              )}
            </Box>
          </Box>
        </Card>
      </Box>
    </ShopLayout>
  );
};

export default CheckoutPage;
