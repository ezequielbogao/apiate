import PropTypes from "prop-types";
import Checks from "./icons/Checks";

const CheckItem = (props) => {
    CheckItem.propTypes = {
        check: PropTypes.bool,
        title: PropTypes.string,
    };
    return (
        <div className="flex justify-between w-full align-middle items-center py-1">
            <span
                className={`text-md ${
                    props.check
                        ? "text-azure-600 font-normal dark:text-blue-300"
                        : "text-azure-300 font-light dark:text-azure-500"
                } dark:text-azure-300`}>
                {props.title}
            </span>
            <span
                className={`font-light text-sm ${
                    props.check
                        ? "text-green-400 dark:text-green-300"
                        : "text-azure-200 dark:text-azure-500"
                } dark:text-azure-300`}>
                <Checks width="30" height="30" />
            </span>
        </div>
    );
};

export default CheckItem;
