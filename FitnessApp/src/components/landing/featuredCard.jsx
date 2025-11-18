export function FeaturedCard({
  imageSrc,
  imageAlt,
  headerText,
  bodyText,
  pillClass,
  sideClass,
  id,
}) {
  return (
    <div className={`featured-card featured-card--${sideClass}`} id={id}>
      <div className="featured-card-image">
        <img src={imageSrc} alt={imageAlt} />
      </div>
      <div className="featured-card-text">
        <div className={`featured-card-text-pill ${pillClass}`}>
          <span></span>
          <h3>Feature</h3>
        </div>
        <h4>{headerText}</h4>
        <p>{bodyText}</p>
      </div>
    </div>
  );
}
