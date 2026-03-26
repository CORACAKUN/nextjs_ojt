"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
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
import { registerSchema, type RegisterValues } from "@/lib/auth-schemas";
import { createZodResolver } from "@/lib/form-zod-resolver";

export default function RegisterForm() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState("");
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: createZodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterValues) => {
      await new Promise((resolve) => setTimeout(resolve, 700));

      return {
        email: data.email,
      };
    },
    onMutate: () => {
      setSubmitError("");
      setSuccess(false);
    },
    onSuccess: () => {
      setSuccess(true);
      router.push("/login");
    },
    onError: (error) => {
      setSubmitError(error.message);
    },
  });

  async function onSubmit(data: RegisterValues) {
    await registerMutation.mutateAsync(data);
  }

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      elevation={8}
      sx={{
        width: "100%",
        maxWidth: 460,
        p: 4,
        borderRadius: 3,
      }}
    >
      <Stack spacing={2.5}>
        <Typography variant="h5" fontWeight={700}>
          Register
        </Typography>

        <TextField
          label="Full Name"
          fullWidth
          error={!!errors.fullName}
          helperText={errors.fullName?.message}
          {...register("fullName")}
        />

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

        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        {submitError && <Alert severity="error">{submitError}</Alert>}
        {success && <Alert severity="success">Registration successful</Alert>}

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={registerMutation.isPending}
          startIcon={
            registerMutation.isPending ? (
              <CircularProgress size={18} color="inherit" />
            ) : null
          }
        >
          {registerMutation.isPending ? "Creating account..." : "Register"}
        </Button>

        <Box sx={{ textAlign: "center" }}>
          <Link className="text-blue-500 hover:underline" href="/login">
            Have an account? Login
          </Link>
        </Box>
      </Stack>
    </Paper>
  );
}
