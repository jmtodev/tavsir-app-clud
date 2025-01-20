import React from "react";
import { Box, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

import flo_logo from "../../../../public/img/flologo.png";

export default function DirectFloPage() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        paddingX: "2rem",
        backgroundColor: "#4c0049"
      }}
    >
      <Container maxWidth="md">
        <Grid sx={{display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'}}>
          <Grid>
            <Box
              component="img"
              sx={{ width: "100%", borderRadius: "50%" }}
              alt="search"
              src={flo_logo}
            />
          </Grid>
          <Grid>
            <Typography
              variant="h6"
              sx={{
                margin: 0,
                fontWeight: 500,
                fontSize: "1rem",
                lineHeight: 1.6,
                letterSpacing: "0.0075em",
                color: "wheat",
                textAlign: "center",
                fontFamily: 'unset'
              }}
            >
              Mohon Tunggu Anda akan diarahkan ke halaman Let it Flo
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
