import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";

import background from "../../../asserts/images/Background2.png";
import pic1 from "../../../asserts/images/block-2-list-1.png";
import pic2 from "../../../asserts/images/block-2-list-2.png";
import pic3 from "../../../asserts/images/block-2-list-3.png";

const Home = () => {
  return (
    <>
      <main>
        <div
          style={{
            backgroundImage: `url(${background})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            height: "750px",
          }}
        >
          <Box
            sx={{
              pt: 20,
              pb: 10,
            }}
          >
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
              >
                Маркетинговые исследования
              </Typography>
              <Typography
                variant="h4"
                align="center"
                color="text.primary"
                paragraph
              >
                Простой и удобный сервис поможет вам создать опрос и провести
                исследование
              </Typography>
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                <Link
                  style={{ textDecoration: "none" }}
                  to={"/register_company"}
                >
                  <Button variant="contained">
                    Зарегистрироваться как компания
                  </Button>
                </Link>
                <Link style={{ textDecoration: "none" }} to={"/register_user"}>
                  <Button variant="contained" color="success">
                    Зарегистрироваться как пользователь
                  </Button>
                </Link>
              </Stack>
            </Container>
          </Box>
        </div>
        <Box
          sx={{
            alignItems: "center",
            pt: 18,
            pb: 10,
          }}
        >
          <Typography
            variant="h3"
            align="center"
            color="text.primary"
            paragraph
            sx={{ pb: 10 }}
          >
            С нашим сервисом вы сможете
          </Typography>
          <Grid container sx={{ textAlign: "center" }}>
            <Grid item xs={4}>
              <img height={"120"} alt="" src={pic1} loading="lazy" />
              <Typography variant="h5" sx={{ mt: 1, mb: 1 }}>
                Создать опрос
              </Typography>
              <Typography>
                Удобный конструктор анкет с шаблонами. 20 типов вопросов и
                настройка логических правил.
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <img height={"120"} alt="" src={pic2} loading="lazy" />
              <Typography variant="h5" sx={{ mt: 1, mb: 1 }}>
                Собрать ответы
              </Typography>
              <Typography>
                Онлайн-панель с 152 500 активных респондентов. И ещё 9
                эффективных способов сбора ответов.
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <img height={"120"} alt="" src={pic3} loading="lazy" />
              <Typography variant="h5" sx={{ mt: 1, mb: 1 }}>
                Получить результат
              </Typography>
              <Typography>
                Результаты опроса в форматах PDF, Word, Excel, SPSS. Данные в
                виде графиков и диаграмм.
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </main>
    </>
  );
};

export default Home;
