import PropTypes from "prop-types";

const Th = (props) => {
    Th.propTypes = {
        text: PropTypes.string,
    };
    return (
        <th className="bg-azure-50 dark:bg-azure-700 p-4">
            <span className="text-md font-light leading-none text-azure-600 dark:text-azure-400">
                {props.text}
            </span>
        </th>
    );
};

export default Th;
