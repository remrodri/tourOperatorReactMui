import Gallery from "./Gallery";

const URL_BASE = import.meta.env.VITE_API_URL;

interface GalleryContainerProps {
  open: boolean;
  handleClick: () => void;
  images: string[];
}

const GalleryContainer: React.FC<GalleryContainerProps> = ({
  open,handleClick,images
}) => {
  // const BASE_URL = "http://localhost:3000";
  // console.log('images::: ', images);
  return <Gallery open={open} handleClick={ handleClick} images={images} url={URL_BASE} />;
};
export default GalleryContainer;
