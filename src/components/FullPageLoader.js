import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const FullPageLoader = ({showFullPageLoading, opacity}) => {
    if(showFullPageLoading){
        return <div
            style={{
                position:"absolute",
                display: 'flex',
                top:0,
                right:0,
                bottom:0,
                left:0,
                justifyContent:"center",
                alignItems:"center",
                backgroundColor:opacity ? "rgba(239,239,239,1)" : "rgba(255,255,255, 0.55)",
            }}
        >
            <div className="global_loader"/>
        </div>
    }
    return null;
}

FullPageLoader.propTypes = {
    showFullPageLoading: PropTypes.bool,
    opacity:PropTypes.number
};

export default connect((state) => {
    return {
        showFullPageLoading: state.component.showFullPageLoading,
        opacity: state.component.opacity,
    };
})(FullPageLoader);