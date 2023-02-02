import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = () => (
    <ContentLoader
        className={'pizza-block'}
        speed={2}
        width={280}
        height={500}
        viewBox="0 0 280 500"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <circle cx="135" cy="134" r="125" />
        <rect x="-1" y="277" rx="5" ry="5" width="280" height="20" />
        <rect x="0" y="318" rx="0" ry="0" width="280" height="88" />
        <rect x="0" y="432" rx="5" ry="5" width="95" height="30" />
        <rect x="122" y="425" rx="5" ry="5" width="152" height="45" />
    </ContentLoader>
)

export default Skeleton