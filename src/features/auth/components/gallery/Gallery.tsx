import { Box, Card, CardContent, Typography } from "@mui/material";
import { EffectFade, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import "./styles.css";

const Gallery: React.FC = () => {
  return (
    <Box
      sx={{
        width: "60%",
        height: "100%",
        // p: "1rem 0 1rem 1rem",
        pr: "1rem",
        display: { xs: "none",md:"flex" },
        // borderRadius: "10px 0 0 10px",
        // background: "rgba(0,0,0,0.5)",
        // backdropFilter: "blur(5px)",
        // border: "1px solid rgba(49, 49, 49, 0.23)",
      }}
    >
      <Swiper
        style={{
          // borderRadius: "10px 0 0 10px",
          borderRadius: "10px",
          // border: "1px solid rgba(0,0,0,0.6)",
          boxShadow: "0 4px 30px rgba(0,0,0,1)",
          // height: "28rem",
        }}
        spaceBetween={30}
        effect="fade"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        // navigation={true}
        pagination={{ clickable: true }}
        modules={[Autoplay, EffectFade]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Card
            sx={{
              backgroundImage: "url(/login1.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              // width: "20rem",
              // height: "22.5rem",
              height: "38rem",
              // height: "100%",
            }}
          >
            <CardContent
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "flex-end",
                margin: 0,
                padding: 0,
              }}
            >
              <Box
                sx={{
                  background: "rgba(0, 0, 0, 0.38)",
                  backdropFilter: "blur(4px)",
                  height: "20%",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  // justifyContent: "space-around",
                  p: "1rem 1rem 0 1rem",
                  gap: "1rem",
                }}
              >
                <Typography variant="body1" color="white">
                  Gestión Total del Turismo de Aventura
                </Typography>
                <Typography variant="body2" color="white">
                  Organiza destinos, personal y paquetes en una sola plataforma
                  pensada para operadores turísticos.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card
            sx={{
              backgroundImage: "url(/login2.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              // width: "20rem",
              // height: "22.5rem",
              height: "38rem",
            }}
          >
            <CardContent
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "flex-end",
                margin: 0,
                padding: 0,
              }}
            >
              <Box
                sx={{
                  background: "rgba(0, 0, 0, 0.38)",
                  backdropFilter: "blur(4px)",
                  height: "20%",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  // justifyContent: "space-around",
                  p: "1rem 1rem 0 1rem",
                  gap: "1rem",
                }}
              >
                <Typography variant="body1" color="white">
                  Explora, Administra, Conquista
                </Typography>
                <Typography variant="body2" color="white">
                  Desde la planificación hasta el reporte final: simplificamos
                  tu operación turística.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card
            sx={{
              backgroundImage: "url(/login4.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              // width: "20rem",
              // height: "22.5rem",
              height: "38rem",
            }}
          >
            <CardContent
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "flex-end",
                margin: 0,
                padding: 0,
              }}
            >
              <Box
                sx={{
                  background: "rgba(0, 0, 0, 0.38)",
                  backdropFilter: "blur(4px)",
                  height: "20%",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  // justifyContent: "space-around",
                  p: "1rem 1rem 0 1rem",
                  gap: "1rem",
                }}
              >
                <Typography variant="body1" color="white">
                  Reservas Inteligentes, Experiencias Memorables
                </Typography>
                <Typography variant="body2" color="white">
                  Control total de reservas para asegurar cada aventura sea
                  única y bien organizada.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card
            sx={{
              backgroundImage: "url(/login5.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              // width: "20rem",
              // height: "22.5rem",
              height: "38rem",
            }}
          >
            <CardContent
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "flex-end",
                margin: 0,
                padding: 0,
              }}
            >
              <Box
                sx={{
                  background: "rgba(0, 0, 0, 0.38)",
                  backdropFilter: "blur(4px)",
                  height: "20%",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  // justifyContent: "space-around",
                  p: "1rem 1rem 0 1rem",
                  gap: "1rem",
                }}
              >
                <Typography variant="body1" color="white">
                  Decisiones que Transforman, Datos que Respaldan
                </Typography>
                <Typography variant="body2" color="white">
                  Visualiza informes dinámicos que impulsan el crecimiento de tu
                  operadora.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </SwiperSlide>
      </Swiper>
    </Box>
  );
};
export default Gallery;
