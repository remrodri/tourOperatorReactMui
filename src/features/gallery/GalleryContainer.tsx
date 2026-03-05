import Gallery from "./Gallery";

const buildImageUrl = (path?: string): string => {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;

  const base = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ?? "";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
};

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
  const normalizedImages = images.map(buildImageUrl).filter(Boolean);

  return (
    <Gallery open={open} handleClick={handleClick} images={normalizedImages} />
  );
};

export default GalleryContainer;
