import React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";

function Copyright(props) {
  return (
    <Container maxWidth="md" component="footer" sx={{ mb: 3 }}>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href={props.href}>
          {props.name}
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Container>
  );
}

export default function Footer() {
  return <Copyright href="#" name="Prikhodouskaya" sx={{ mt: 5 }} />;
}
