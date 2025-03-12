import PropTypes from "prop-types";

const Bartoleft = (props) => {
    Bartoleft.propTypes = {
        width: PropTypes.string,
        height: PropTypes.string,
    };

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={props.width ? props.width : "25"}
            height={props.height ? props.height : "25"}
            viewBox="0 0 25 25"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-bar-to-left">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 12l10 0" />
            <path d="M10 12l4 4" />
            <path d="M10 12l4 -4" />
            <path d="M4 4l0 16" />
        </svg>
    );
};

export default Bartoleft;
