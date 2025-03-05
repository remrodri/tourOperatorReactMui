import Gallery from "./Gallery";

interface GalleryContainerProps {
  open: boolean;
  handleClick: () => void;
  images: string[];
}

const GalleryContainer: React.FC<GalleryContainerProps> = ({
  open,handleClick,images
}) => {
  const BASE_URL = "http://localhost:3000";
  // console.log('images::: ', images);
  return <Gallery open={open} handleClick={ handleClick} images={images} url={BASE_URL} />;
};
export default GalleryContainer;
