"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { setCookie } from "cookies-next/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
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
import { loginSchema, type LoginValues } from "@/lib/auth-schemas";
import { createZodResolver } from "@/lib/form-zod-resolver";

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
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: createZodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginValues) => {
      await new Promise((resolve) => setTimeout(resolve, 450));

      if (data.email !== DEMO_EMAIL || data.password !== DEMO_PASSWORD) {
        throw new Error("Invalid credentials. Use demo@myapp.com / password123");
      }

      return {
        token: "demo-token",
      };
    },
    onMutate: () => {
      setLoginError("");
      setSuccess(false);
    },
    onSuccess: ({ token }) => {
      setCookie(AUTH_COOKIE_NAME, token, {
        maxAge: 60 * 60 * 24,
        sameSite: "lax",
        path: "/",
      });

      setSuccess(true);
      const nextPath = searchParams.get("next") || "/dashboard";
      router.push(nextPath);
      router.refresh();
    },
    onError: (error) => {
      setLoginError(error.message);
    },
  });

  async function onSubmit(data: LoginValues) {
    await loginMutation.mutateAsync(data);
  }

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
          {...register("email")}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          error={!!errors.password}
          helperText={errors.password?.message}
          {...register("password")}
        />

        {loginError && <Alert severity="error">{loginError}</Alert>}
        {success && <Alert severity="success">Login successful</Alert>}

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={loginMutation.isPending}
          startIcon={
            loginMutation.isPending ? <CircularProgress size={18} color="inherit" /> : null
          }
        >
          {loginMutation.isPending ? "Logging in..." : "Login"}
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
