import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const MenuButton = (props) => {
    MenuButton.propTypes = {
        icon: PropTypes.object,
        label: PropTypes.string,
        title: PropTypes.string,
        to: PropTypes.string,
    };
    return (
        <Link
            to={props.to}
            className={`flex p-0 md:p-2 py-2 justify-center md:justify-start md:items-center gap-3 transition-colors duration-300 ease-in-out hover:bg-azure-50 dark:hover:bg-azure-600 rounded-xl`}>
            {props.icon}
            <div className="content flex-col text-left hidden md:block">
                <span className="text-sm text-azure-400 font-light">
                    {props.label}
                </span>
                <span className="text-sm text-azure-700 dark:text-azure-200 font-light">
                    {props.title}
                </span>
            </div>
        </Link>
    );
};

export default MenuButton;
