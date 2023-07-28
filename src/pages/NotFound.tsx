import React from "react";

const NotFound: React.FC = () => {
    return (
        <div className="container not-fount">
            <h1>
                <span>😕</span>
                <br />
                Nothing found
            </h1>
            <p className="description">Sorry, this page is not available in our online store.</p>
        </div>
    );
}

export default NotFound;