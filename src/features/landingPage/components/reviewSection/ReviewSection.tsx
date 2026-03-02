import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Rating,
  Grid,
} from "@mui/material";
import reviewBackground from "../../../../assets/images/tourist1.webp";

interface Review {
  name: string;
  avatar: string;
  comment: string;
  rating: number;
}

const reviews: Review[] = [
  {
    name: "Ana López",
    avatar: "https://i.pravatar.cc/150?img=9",
    comment:
      "¡Excelente experiencia! Todo muy bien organizado y el guía fue muy amable.",
    rating: 5,
  },
  {
    name: "Carlos Pérez",
    avatar: "https://i.pravatar.cc/150?img=2",
    comment: "El tour estuvo genial, y cada momento fue realmente memorable.",
    rating: 4,
  },
  {
    name: "María Fernández",
    avatar: "https://i.pravatar.cc/150?img=5",
    comment: "Muy recomendable, paisajes hermosos y atención personalizada.",
    rating: 5,
  },
];

const ReviewsSection: React.FC = () => {
  return (
    <Box
      sx={{
        // py: 5,
        // px: 2,
        backgroundColor: "#1C1C1C",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundImage: `url(${reviewBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "2rem",
      }}
    >
      <Box
        sx={{
          background: "rgba(82, 91, 51, 0.46)",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(5px)",
          border: "1px solid rgba(107, 118, 66, 0.46)",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          fontFamily="Montserrat"
          sx={{ fontWeight: "500" }}
        >
          Opiniones de nuestros clientes
        </Typography>
        <Grid container spacing={3} justifyContent="center" gap="3rem">
          {reviews.map((review, index) => (
            <Grid component="div" size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  backgroundColor: "#b8b8b8ff",
                }}
              >
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Avatar
                      src={review.avatar}
                      alt={review.name}
                      sx={{ width: 56, height: 56, mr: 2 }}
                    />
                    <Box
                      sx={{
                        color: "#1C1C1C",
                      }}
                    >
                      <Typography variant="h6" fontFamily="Montserrat">
                        {review.name}
                      </Typography>
                      <Rating value={review.rating} readOnly />
                    </Box>
                  </Box>
                  <Typography variant="body2" color="#1C1C1C">
                    "{review.comment}"
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
export default ReviewsSection;
