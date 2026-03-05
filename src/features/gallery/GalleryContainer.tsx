import { buildImageUrl } from "../../utils/helpers/buildImage";
import Gallery from "./Gallery";

// const buildImageUrl = (path?: string) => {
//   if (!path) return "";
//   if (/^https?:\/\//i.test(path)) return path;

//   const base = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "");
//   return `${base}${path.startsWith("/") ? path : `/${path}`}`;
// };

interface GalleryContainerProps {
  open: boolean;
  handleClick: () => void;
  images: string[];
}

const GalleryContainer: React.FC<GalleryContainerProps> = ({
  open,
  handleClick,
  images,
}) => {
  // ✅ Normaliza TODAS las imágenes antes de pasar al Gallery
  const normalizedImages = images.map(buildImageUrl);

  return (
    <Gallery open={open} handleClick={handleClick} images={normalizedImages} />
  );
};

export default GalleryContainer;
