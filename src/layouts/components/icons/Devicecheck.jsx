import PropTypes from "prop-types";

const Devicecheck = (props) => {
    Devicecheck.propTypes = {
        width: PropTypes.string,
        height: PropTypes.string,
    };

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={props.width ? props.width : "25"}
            height={props.height ? props.height : "25"}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-device-ipad-check text-azure-600 dark:text-azure-100">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M11.5 21h-5.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v8" />
            <path d="M9 18h2" />
            <path d="M15 19l2 2l4 -4" />
        </svg>
    );
};

export default Devicecheck;
