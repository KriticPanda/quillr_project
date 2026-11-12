const cardCount = 2;
const metaLines = [0, 1];
const textLines = [0, 1, 2];

function SkeletonCard() {
  return (
    <div className="skeleton-card" aria-hidden="true">
      <div className="skeleton-shape skeleton-title" />
      <div className="skeleton-shape skeleton-meta" />
      <div className="skeleton-shape skeleton-meta skeleton-meta-short" />
      <div className="skeleton-copy">
        {textLines.map((line) => (
          <div
            className={`skeleton-shape skeleton-text skeleton-text-${line + 1}`}
            key={line}
          />
        ))}
      </div>
      <div className="skeleton-actions">
        <div className="skeleton-shape skeleton-button" />
        <div className="skeleton-shape skeleton-button skeleton-button-short" />
      </div>
    </div>
  );
}

function SkeletonForm() {
  return (
    <div className="skeleton-form" aria-hidden="true">
      <div className="skeleton-shape skeleton-form-title" />
      {metaLines.map((line) => (
        <div className="skeleton-field" key={line}>
          <div className="skeleton-shape skeleton-label" />
          <div className="skeleton-shape skeleton-input" />
        </div>
      ))}
      <div className="skeleton-field">
        <div className="skeleton-shape skeleton-label" />
        <div className="skeleton-shape skeleton-input skeleton-textarea" />
      </div>
      <div className="skeleton-shape skeleton-submit" />
    </div>
  );
}

export default function LoadingSkeleton({ variant = "stories" }) {
  return (
    <div
      className={`loading-skeleton loading-skeleton-${variant}`}
      role="status"
      aria-label="Loading content"
      aria-busy="true"
    >
      <span className="skeleton-visually-hidden">Loading content</span>
      {variant === "form" ? (
        <SkeletonForm />
      ) : (
        Array.from({ length: variant === "story" ? 1 : cardCount }, (_, index) => (
          <SkeletonCard key={index} />
        ))
      )}
    </div>
  );
}
