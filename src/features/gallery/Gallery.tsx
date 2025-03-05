import { Dialog, DialogContent } from "@mui/material";
import { EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/navigation";
// @ts-ignore
import "swiper/css/pagination";
// @ts-ignore
import "swiper/css/effect-fade";

interface GalleryProps {
  open: boolean;
  handleClick: () => void;
  images: string[];
  url: string;
}

const Gallery: React.FC<GalleryProps> = ({
  open,
  handleClick,
  images,
  url,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClick}
      maxWidth={false}
    >
      <DialogContent
        sx={{
          // height:"70vh"
        }}
      >
        <Swiper
          spaceBetween={30}
          loop
          modules={[Navigation, Pagination, EffectFade]}
          navigation
          pagination
          effect={"fade"}
          style={{ width: "100%", height: "80vh", overflow:"hidden" }}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={`${url}${image}`}
                alt="tourist destination"
                style={{
                  width: "100%",
                  height: "100% ",
                  objectFit: "contain",
                  // backgroundSize: "cover",
                  // backgroundPosition: "center",
                  // borderRadius: "10px",
                  backgroundColor: "black",
                  display:"block"
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
