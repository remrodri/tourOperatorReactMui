import { Dialog, DialogContent } from "@mui/material";
import { EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

interface GalleryProps {
  open: boolean;
  handleClick: () => void;
  images: string[]; // ✅ URLs finales
}

const Gallery: React.FC<GalleryProps> = ({ open, handleClick, images }) => {
  return (
    <Dialog open={open} onClose={handleClick} maxWidth={false}>
      <DialogContent>
        <Swiper
          spaceBetween={30}
          loop
          modules={[Navigation, Pagination, EffectFade]}
          navigation
          pagination
          effect="fade"
          style={{ width: "100%", height: "80vh", overflow: "hidden" }}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt="tourist destination"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  backgroundColor: "black",
                  display: "block",
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </DialogContent>
    </Dialog>
  );
};

export default Gallery;
