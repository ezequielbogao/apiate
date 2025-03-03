import PropTypes from "prop-types";

export const Moto = (props) => {
    Moto.propTypes = {
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
            className="icon icon-tabler icons-tabler-outline icon-tabler-motorbike text-azure-600 dark:text-azure-100">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 16m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
            <path d="M19 16m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
            <path d="M7.5 14h5l4 -4h-10.5m1.5 4l4 -4" />
            <path d="M13 6h2l1.5 3l2 4" />
        </svg>
    );
};
export default Moto;
