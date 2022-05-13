import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AddchartIcon from "@mui/icons-material/Addchart";
import LinkMaterial from "@mui/material/Link";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../actions/auth";

const Header = () => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const isAuth = auth.isAuthUser || auth.isAuthCompany;

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={4}
      sx={{
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        mt: 1,
        ml: 0,
      }}
    >
      <Toolbar sx={{ flexWrap: "wrap" }}>
        <AddchartIcon sx={{ mr: 1, ml: 5 }} />
        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          <Link style={{ textDecoration: "none" }} to={"/"}>
            MarketingAnalysis
          </Link>
        </Typography>
        <nav>
          {auth.isAuthCompany && (
            <LinkMaterial
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              Создать опрос
            </LinkMaterial>
          )}
          <LinkMaterial
            variant="button"
            color="text.primary"
            href="#"
            sx={{ my: 1, mx: 1.5 }}
          >
            Опросы
          </LinkMaterial>
          <LinkMaterial
            variant="button"
            color="text.primary"
            href="#"
            sx={{ my: 1, mx: 1.5 }}
          >
            Статистика
          </LinkMaterial>
          <LinkMaterial
            variant="button"
            color="text.primary"
            href="#"
            sx={{ my: 1, mx: 1.5 }}
          >
            Поддержка
          </LinkMaterial>
        </nav>
        {!isAuth && (
          <Link to={"/login"}>
            <Button
              //onClick={() => dispatch(login("Nastya", "Agireh30"))}
              variant="outlined"
              sx={{ my: 1, mx: 1.5 }}
            >
              Войти
            </Button>
          </Link>
        )}
        {isAuth && (
          <Button
            variant="outlined"
            sx={{ my: 1, mx: 1.5 }}
            onClick={() => dispatch(logout())}
          >
            Выйти
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
