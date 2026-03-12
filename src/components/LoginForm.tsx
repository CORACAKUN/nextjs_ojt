"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { setCookie } from "cookies-next/client";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

type LoginValues = {
  email: string;
  password: string;
};

const AUTH_COOKIE_NAME = "auth_token";
const DEMO_EMAIL = "demo@myapp.com";
const DEMO_PASSWORD = "password123";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loginError, setLoginError] = useState("");
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginValues) => {
    setLoginError("");
    setSuccess(false);

    // Demo credential check for local auth flow.
    if (data.email !== DEMO_EMAIL || data.password !== DEMO_PASSWORD) {
      setLoginError("Invalid credentials. Use demo@myapp.com / password123");
      return;
    }

    setCookie(AUTH_COOKIE_NAME, "demo-token", {
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
      path: "/",
    });

    setSuccess(true);
    const nextPath = searchParams.get("next") || "/dashboard";
    router.push(nextPath);
    router.refresh();
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      elevation={8}
      sx={{
        width: "100%",
        maxWidth: 420,
        p: 4,
        borderRadius: 3,
      }}
    >
      <Stack spacing={2.5}>
        <Typography variant="h5" fontWeight={700}>
          Login
        </Typography>

        <TextField
          label="Email"
          type="email"
          fullWidth
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email",
            },
          })}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          error={!!errors.password}
          helperText={errors.password?.message}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />

        {loginError && <Alert severity="error">{loginError}</Alert>}
        {success && <Alert severity="success">Login successful</Alert>}

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={isSubmitting}
          startIcon={isSubmitting ? <CircularProgress size={18} color="inherit" /> : null}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>

        <Box sx={{ textAlign: "center" }}>
          <Link className="text-blue-500 hover:underline" href="/register">
            Don&apos;t have an account? Register
          </Link>
        </Box>
      </Stack>
    </Paper>
  );
}
