import PropTypes from "prop-types";

const Td = (props) => {
    Td.propTypes = {
        content: PropTypes.string,
        children: PropTypes.object,
    };
    return props.children ? (
        <td className="p-3">{props.children}</td>
    ) : (
        <td className="p-3">
            <span className="font-normal text-sm text-azure-700 dark:text-azure-200">
                {props.content}
            </span>
        </td>
    );
};

export default Td;
