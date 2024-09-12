import React from "react";
import ContentLoader from "react-content-loader";
const Skeleton: React.FC = () => {
  return (
    <ContentLoader
      speed={2}
      width={1000}
      height={500}
      viewBox="0 0 1000 500"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <circle cx="129" cy="118" r="103" />
      <rect x="57" y="237" rx="0" ry="0" width="150" height="11" />
      <rect x="18" y="259" rx="0" ry="0" width="222" height="71" />
      <rect x="32" y="341" rx="0" ry="0" width="60" height="16" />
      <rect x="168" y="339" rx="0" ry="0" width="62" height="16" />
    </ContentLoader>
  );
};

export default Skeleton;
