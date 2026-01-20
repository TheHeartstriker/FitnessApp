import React from "react";

export const FeaturedCard = React.forwardRef((props, ref) => {
  const {
    imageSrc,
    imageAlt,
    headerText,
    bodyText,
    pillClass,
    sideClass,
    pill,
  } = props;
  return (
    <div className={`featured-card featured-card--${sideClass}`} ref={ref}>
      {imageSrc && (
        <div
          className={`featured-card-image featured-card-image--${sideClass}`}
        >
          <img src={imageSrc} alt={imageAlt} />
        </div>
      )}
      {sideClass === "introduction" && (
        <>
          <span></span>
          <span></span>
        </>
      )}
      <div className="featured-card-text">
        {pill && (
          <div className={`featured-card-text-pill ${pillClass}`}>
            <span></span>
            <h3>Feature</h3>
          </div>
        )}
        <h4>{headerText}</h4>
        <p>{bodyText}</p>
      </div>
    </div>
  );
});

FeaturedCard.displayName = "FeaturedCard";
