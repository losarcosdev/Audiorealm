import NextLink from "next/link";
import {
  Box,
  Button,
  Divider,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { AuthLayout } from "../../components/layouts";
import { useForm } from "react-hook-form";
import { validations } from "../../utils";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { getProviders, getSession, signIn } from "next-auth/react";

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  const [providers, setProviders] = useState<any>({});
  const { onLogin, errorMessage } = useContext(AuthContext);
  const queryRoute = router.query.p?.toString() || "/";

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    getProviders().then((prov) => {
      setProviders(prov);
    });
  }, []);

  const handleLogin = async ({ email, password }: FormData) => {
    const validAuth = await onLogin(email, password);
    validAuth && router.replace(queryRoute);
  };

  return (
    <AuthLayout title={"Sign In"}>
      <form onSubmit={handleSubmit(handleLogin)} noValidate>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Sign In
              </Typography>
            </Grid>

            <Grid item xs={12}>
              {providers &&
                Object.values(providers).map((provider: any) => {
                  if (provider.id !== "credentials") {
                    return (
                      <Button
                        key={provider.id}
                        fullWidth
                        color="secondary"
                        variant="outlined"
                        sx={{ mb: 2 }}
                        onClick={() => signIn(provider.id)}
                      >
                        {provider.name}
                      </Button>
                    );
                  }
                })}
              <Divider />
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
                disabled={!!errorMessage}
              >
                Login
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
              <NextLink href={`/auth/register?p=${queryRoute}`} passHref>
                <Link underline="always">You do not have an account?</Link>
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

export default LoginPage;
