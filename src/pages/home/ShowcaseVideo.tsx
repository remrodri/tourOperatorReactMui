const ShowcaseVideo: React.FC = () => {

  return (
    <video
      width="100%"
      height="80dvh"
      autoPlay
      muted
      loop
      className="video-js"
      preload="auto"
      poster="home.webp"
      data-setup="{}"
    >
      <source src="videoShowcase.mp4" type="video/mp4" />
    </video>
  );
};
export default ShowcaseVideo;
