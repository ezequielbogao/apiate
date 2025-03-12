import PropTypes from "prop-types";

const Stetho = (props) => {
    Stetho.propTypes = {
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
            className="icon icon-tabler icons-tabler-outline icon-tabler-stethoscope text-azure-600 dark:text-azure-100">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M6 4h-1a2 2 0 0 0 -2 2v3.5h0a5.5 5.5 0 0 0 11 0v-3.5a2 2 0 0 0 -2 -2h-1" />
            <path d="M8 15a6 6 0 1 0 12 0v-3" />
            <path d="M11 3v2" />
            <path d="M6 3v2" />
            <path d="M20 10m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
        </svg>
    );
};

export default Stetho;
