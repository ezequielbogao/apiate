import PropTypes from "prop-types";

const Leftarrow = (props) => {
    Leftarrow.propTypes = {
        width: PropTypes.string,
        height: PropTypes.string,
        style: PropTypes.any,
    };
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={props.width ? props.width : "25"}
            height={props.height ? props.height : "25"}
            viewBox="0 0 25 25"
            fill="none"
            style={props.style}
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-left">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 12l14 0" />
            <path d="M5 12l6 6" />
            <path d="M5 12l6 -6" />
        </svg>
    );
};

export default Leftarrow;
