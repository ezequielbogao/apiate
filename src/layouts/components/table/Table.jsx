import PropTypes from "prop-types";
import Paginate from "./Paginate";
const Table = (props) => {
    Table.propTypes = {
        children: PropTypes.any,
        currentPage: PropTypes.number,
        prevPage: PropTypes.number,
        nextPage: PropTypes.number,
        totalPage: PropTypes.number,
    };
    return (
        <div className="overflow-auto bg-white dark:bg-azure-800 rounded-xl mt-5 border-2 border-azure-100 dark:border-azure-700">
            <table className="w-full min-w-max table-auto text-left">
                {props.children}
            </table>
            <Paginate
                currentPage={props.currentPage}
                prevPage={props.prevPage}
                nextPage={props.nextPage}
                totalPage={props.totalPage}
            />
        </div>
    );
};

export default Table;
