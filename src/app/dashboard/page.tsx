"use client";

import * as React from "react";
import { deleteCookie } from "cookies-next/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  CssBaseline,
  Grid,
  Card,
  CardContent,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";

const drawerWidth = 220;

type Stat = {
  title: string;
  value: string;
};

type User = {
  id: number;
  name: string;
  email: string;
};

type DashboardResponse = {
  stats: Stat[];
  users: User[];
};

async function fetchDashboardData(): Promise<DashboardResponse> {
  const response = await fetch("/api/dashboard");

  if (!response.ok) {
    throw new Error("Failed to fetch dashboard data");
  }

  return response.json();
}

export default function Dashboard() {
  const router = useRouter();
  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["dashboard-data"],
    queryFn: fetchDashboardData,
  });

  const handleLogout = () => {
    deleteCookie("auth_token", { path: "/" });
    router.push("/login");
    router.refresh();
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Top AppBar */}
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <List>
          {[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Posts", href: "/posts" },
            { label: "Settings", href: "/dashboard" },
          ].map((item) => (
            <ListItem key={item.label}>
              <ListItemButton component={Link} href={item.href}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

        <Container maxWidth="lg">
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Overview
          </Typography>
          {isFetching && !isLoading && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Refreshing data...
            </Typography>
          )}

          {isLoading && (
            <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
              <CircularProgress />
            </Box>
          )}

          {isError && (
            <Alert
              severity="error"
              sx={{ mb: 3 }}
              action={
                <Button color="inherit" size="small" onClick={() => refetch()}>
                  Retry
                </Button>
              }
            >
              {(error as Error)?.message || "Unable to load dashboard data"}
            </Alert>
          )}

          {data && (
            <>
              {/* Stats Cards */}
              <Grid container spacing={3} sx={{ mb: 4 }}>
                {data.stats.map((stat) => (
                  <Grid size={{ xs: 12, md: 3 }} key={stat.title}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6">{stat.title}</Typography>
                        <Typography variant="h4" fontWeight={700}>
                          {stat.value}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              {/* Table */}
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Recent Users
                </Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </>
          )}
        </Container>
      </Box>
    </Box>
  );
}

