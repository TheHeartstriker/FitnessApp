export function SmallFeatured(props) {
  const { title, description, imageSrc, imageAlt, pillClass } = props;
  return (
    <div className="small-featured">
      <div className="small-featured-image">
        <img src={imageSrc} alt={imageAlt} />
      </div>
      <div className="small-featured-text">
        <div className={`text-pill ${pillClass}`}>
          <span />
          <h3>Featured</h3>
        </div>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
}

export function LargeFeatured(props) {
  const { title, description, imageSrc, imageAlt, textPill, pillClass } = props;
  return (
    <div className="large-featured">
      {imageSrc && (
        <div className="large-featured-image">
          <img src={imageSrc} alt={imageAlt} />
        </div>
      )}
      <div className="large-featured-text">
        {textPill && (
          <div className={`text-pill ${pillClass}`}>
            <span />
            <h3>Featured</h3>
          </div>
        )}
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
}
