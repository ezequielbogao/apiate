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
            className="flex p-3  items-center gap-3 transition-colors hover:bg-azure-100 dark:hover:bg-azure-800 rounded-xl">
            {props.icon}
            <div className="content flex flex-col text-left">
                <span className="text-sm text-azure-400 font-thin">
                    {props.label}
                </span>
                <span className="text-md text-azure-700 dark:text-azure-300 font-normal">
                    {props.title}
                </span>
            </div>
        </Link>
    );
};

export default MenuButton;
