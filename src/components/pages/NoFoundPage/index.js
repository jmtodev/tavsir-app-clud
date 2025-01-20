import React from "react";
import { Box, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

export default function DirectFloPage() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        paddingX: "2rem",
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid xs={6}>
            <Typography variant="h1">404</Typography>
            <Typography variant="h6">
              Laman yang anda cari tidak ditemukan / tidak valid.
            </Typography>
          </Grid>
          <Grid xs={6}>
            <img
              src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
              alt=""
              height={250}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
