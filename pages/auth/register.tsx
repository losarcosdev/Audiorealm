import NextLink from "next/link";
import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../../components/layouts";
import { useForm } from "react-hook-form";
import { validations } from "../../utils";
import { AuthContext } from "../../context/auth/AuthContext";
import { useContext } from "react";
import { useRouter } from "next/router";
import { getSession, signIn } from "next-auth/react";
import { GetServerSideProps } from "next";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const router = useRouter();
  const queryRoute = router.query.p?.toString() || "/";
  const { errorMessage, onRegister } = useContext(AuthContext);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>();

  const handleRegister = async ({ email, password, name }: FormData) => {
    const validAuth = await onRegister(email, password, name);
    validAuth && router.replace(queryRoute);
  };

  return (
    <AuthLayout title={"Ingresar"}>
      <form onSubmit={handleSubmit(handleRegister)} noValidate>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Crear cuenta
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                {...register("name", {
                  required: "Required field",
                  minLength: { value: 3, message: "At least 3 characters" },
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
                label="Full Name"
                type="text"
                variant="filled"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("email", {
                  required: "Required field",
                  validate: validations.isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                fullWidth
                label="Email"
                type="email"
                variant="filled"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("password", {
                  required: "Required field",
                  minLength: { value: 6, message: "At least 6 characters" },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
                label="Password"
                type="password"
                variant="filled"
                fullWidth
              />
            </Grid>

            <Grid
              item
              xs={12}
              sx={{
                alignItems: "center",
                justifyItems: "center",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <Button
                type="submit"
                className="primary-btn"
                size="large"
                fullWidth
              >
                Create account
              </Button>
              {errorMessage && (
                <Typography
                  sx={{
                    color: "red",
                  }}
                >
                  {errorMessage}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink href={`/auth/login?p=${queryRoute}`} passHref>
                <Link underline="always">Already have an account?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  const session = await getSession({ req });
  const { p = "/" } = query;

  if (session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default RegisterPage;
