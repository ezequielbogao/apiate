import PropTypes from "prop-types";

const ChevronDown = (props) => {
    ChevronDown.propTypes = {
        width: PropTypes.string,
        height: PropTypes.string,
        style: PropTypes.any,
        css: PropTypes.any,
        stroke: PropTypes.any,
    };

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={props.width ? props.width : "25"}
            height={props.height ? props.height : "25"}
            viewBox="0 0 25 25"
            fill="none"
            stroke="currentColor"
            strokeWidth={`${props.stroke}`}
            strokeLinecap="round"
            style={props.style && props.style}
            className={`icon icon-tabler icons-tabler-outline icon-tabler-chevron-compact-down ${props.css}`}>
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 11l8 3l8 -3" />
        </svg>
    );
};
export default ChevronDown;
