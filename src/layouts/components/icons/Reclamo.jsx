import PropTypes from "prop-types";

const Reclamo = (props) => {
    Reclamo.propTypes = {
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
            strokeWidth={1}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-device-landline-phone text-azure-600 dark:text-azure-100">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M20 3h-2a2 2 0 0 0 -2 2v14a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-14a2 2 0 0 0 -2 -2z" />
            <path d="M16 4h-11a3 3 0 0 0 -3 3v10a3 3 0 0 0 3 3h11" />
            <path d="M12 8h-6v3h6z" />
            <path d="M12 14v.01" />
            <path d="M9 14v.01" />
            <path d="M6 14v.01" />
            <path d="M12 17v.01" />
            <path d="M9 17v.01" />
            <path d="M6 17v.01" />
        </svg>
    );
};

export default Reclamo;
