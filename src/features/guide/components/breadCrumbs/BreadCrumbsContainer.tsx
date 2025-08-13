import BreadCrumbs from "./BreadCrumbs";

const BreadCrumbsContainer: React.FC = () => {
  const handleClick = () => {
    console.log("Button clicked");
  };
  return <BreadCrumbs handleClick={handleClick} />;
};
export default BreadCrumbsContainer;
