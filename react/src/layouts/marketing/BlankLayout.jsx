import React, { Suspense, Fragment } from "react";
import PropTypes from "prop-types";
const loading = () => <div className="">loading....</div>;

const BlankLayout = (props) => {
    return (
        <Suspense fallback={loading()}>
            <Fragment>{props.children}</Fragment>
        </Suspense>
    );
};

BlankLayout.propTypes = {
    children: PropTypes.shape({
        children: PropTypes.string,
    }),
};

export default BlankLayout;
