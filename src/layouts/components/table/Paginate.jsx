import PropTypes from "prop-types";
const Paginate = (props) => {
    Paginate.propTypes = {
        currentPage: PropTypes.number,
        prevPage: PropTypes.number,
        nextPage: PropTypes.number,
        totalPage: PropTypes.number,
    };
    return (
        <div className="flex justify-center items-center mt-4">
            <button
                onClick={props.prevPage}
                disabled={props.currentPage === 1}
                className="px-4 py-2 bg-transparent text-azure-600 hover:text-light-green-500 rounded disabled:text-gray-300 outline-none border-none focus:outline-none">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="icon icon-tabler icons-tabler-filled icon-tabler-arrow-badge-left">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M17 6h-6a1 1 0 0 0 -.78 .375l-4 5a1 1 0 0 0 0 1.25l4 5a1 1 0 0 0 .78 .375h6l.112 -.006a1 1 0 0 0 .669 -1.619l-3.501 -4.375l3.5 -4.375a1 1 0 0 0 -.78 -1.625z" />
                </svg>
            </button>
            <span className="text-sm text-azure-600 dark:text-azure-200">
                Página {props.currentPage} de {props.totalPage}
            </span>
            <button
                onClick={props.nextPage}
                disabled={props.currentPage === props.totalPage}
                className="px-4 py-2 bg-transparent text-azure-600 hover:text-light-green-500 rounded disabled:text-gray-300 outline-none border-none focus:outline-none">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="icon icon-tabler icons-tabler-filled icon-tabler-arrow-badge-right">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M7 6l-.112 .006a1 1 0 0 0 -.669 1.619l3.501 4.375l-3.5 4.375a1 1 0 0 0 .78 1.625h6a1 1 0 0 0 .78 -.375l4 -5a1 1 0 0 0 0 -1.25l-4 -5a1 1 0 0 0 -.78 -.375h-6z" />
                </svg>
            </button>
        </div>
    );
};

export default Paginate;
