import PropTypes from "prop-types";

const Bartoright = (props) => {
    Bartoright.propTypes = {
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
            className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-bar-to-right">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M14 12l-10 0" />
            <path d="M14 12l-4 4" />
            <path d="M14 12l-4 -4" />
            <path d="M20 4l0 16" />
        </svg>
    );
};

export default Bartoright;
