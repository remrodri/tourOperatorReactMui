import { Box, CircularProgress, Grow, Typography } from "@mui/material";
import { useRef } from "react";
import TextType from "../../../../TextAnimations/TextType/TextType";
import { TouristType } from "../../../booking/types/TouristType";
import TouristCardContainer from "./card/TouristCardContainer";
import TouristSearchByCodeContainer from "./search/TouristSearchByCode.Container";
import { useInfiniteScroll } from "../../../../hooks/useInfiniteScroll";

interface TouristShowcaseProps {
  tourists: TouristType[];
  role: string;
  loading: boolean;
  loadingMore: boolean;
  hasMore: boolean;
  loadMoreTourists: () => Promise<void>;
}

const TouristShowcase: React.FC<TouristShowcaseProps> = ({
  tourists,
  role,
  loading,
  loadingMore,
  hasMore,
  loadMoreTourists,
}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const sentinelRef = useInfiniteScroll({
    hasMore,
    loading: loading || loadingMore,
    onLoadMore: loadMoreTourists,
    root: scrollRef,
  });

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          p: "1rem 1.5rem 0 1.5rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <Typography variant="h4" sx={{ width: "10rem" }}>
              <TextType
                text={"Turistas"}
                typingSpeed={50}
                pauseDuration={1000}
                showCursor={true}
                cursorCharacter="_"
                deletingSpeed={50}
              />
            </Typography>
            <TouristSearchByCodeContainer />
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: "flex", p: "20px" }}>
        <Box
          ref={scrollRef}
          sx={{
            p: "20px",
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            overflowY: "auto",
            gap: "0.5rem",
            alignContent: "flex-start",
            background: "rgba(0, 0, 0, 0.44)",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
            border: "1px solid rgba(0, 0, 0, 0.5)",
            height: "calc(100dvh - 12.8rem)",
            width: "100%",
          }}
        >
          <Box sx={{ width: "100%", pr: "3.5rem" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              <Typography sx={{ width: "30%", pl: "2rem" }}>
                Documento
              </Typography>
              <Typography sx={{ width: "30%", pl: "3rem" }}>
                Nombre
              </Typography>
              <Typography sx={{ width: "20%", pl: "1rem" }}>Edad</Typography>
              <Typography sx={{ width: "20%", pl: "3rem" }}>
                Viajes realizados
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            {tourists.length === 0 && !loading && <p>No hay turistas</p>}
            {tourists.map((tourist, index) => (
              <Grow
                in={true}
                style={{ transformOrigin: "0 0 0" }}
                timeout={300 + Math.min(index, 10) * 100}
                key={tourist.id}
              >
                <Box sx={{ width: "100%" }}>
                  <TouristCardContainer
                    tourist={tourist}
                    index={index}
                    role={role}
                  />
                </Box>
              </Grow>
            ))}
            {(loading || loadingMore) && (
              <Box sx={{ width: "100%", display: "flex", justifyContent: "center", py: 2 }}>
                <CircularProgress size={28} />
              </Box>
            )}
            {!loading && !hasMore && tourists.length > 0 && (
              <Typography sx={{ width: "100%", textAlign: "center", py: 2 }}>
                No hay mas turistas
              </Typography>
            )}
            <Box ref={sentinelRef} sx={{ width: "100%", height: "1px" }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default TouristShowcase;
