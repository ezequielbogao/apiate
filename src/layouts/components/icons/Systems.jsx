import PropTypes from "prop-types";

const Systems = (props) => {
    Systems.propTypes = {
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
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-topology-star-3">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 19a2 2 0 1 0 -4 0a2 2 0 0 0 4 0z" />
            <path d="M18 5a2 2 0 1 0 -4 0a2 2 0 0 0 4 0z" />
            <path d="M10 5a2 2 0 1 0 -4 0a2 2 0 0 0 4 0z" />
            <path d="M6 12a2 2 0 1 0 -4 0a2 2 0 0 0 4 0z" />
            <path d="M18 19a2 2 0 1 0 -4 0a2 2 0 0 0 4 0z" />
            <path d="M14 12a2 2 0 1 0 -4 0a2 2 0 0 0 4 0z" />
            <path d="M22 12a2 2 0 1 0 -4 0a2 2 0 0 0 4 0z" />
            <path d="M6 12h4" />
            <path d="M14 12h4" />
            <path d="M15 7l-2 3" />
            <path d="M9 7l2 3" />
            <path d="M11 14l-2 3" />
            <path d="M13 14l2 3" />
        </svg>
    );
};

export default Systems;
