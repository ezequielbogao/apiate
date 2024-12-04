import PropTypes from "prop-types";

const Tr = (props) => {
    Tr.propTypes = {
        children: PropTypes.any,
    };
    return (
        <tr className="bg-white border-b-2 dark:border-azure-600 dark:bg-azure-700 hover:bg-azure-50 dark:hover:bg-azure-800">
            {props.children}
        </tr>
    );
};

export default Tr;
