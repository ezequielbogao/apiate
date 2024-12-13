import PropTypes from "prop-types";

const Pago = (props) => {
    Pago.propTypes = {
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
            className="icon icon-tabler icons-tabler-outline icon-tabler-credit-card text-azure-600 dark:text-azure-100">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 5m0 3a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3z" />
            <path d="M3 10l18 0" />
            <path d="M7 15l.01 0" />
            <path d="M11 15l2 0" />
        </svg>
    );
};

export default Pago;
