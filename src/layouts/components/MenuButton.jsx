import { Tooltip } from "@material-tailwind/react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const MenuButton = (props) => {
    MenuButton.propTypes = {
        icon: PropTypes.object,
        label: PropTypes.string,
        title: PropTypes.string,
        to: PropTypes.string,
        count: PropTypes.number,
    };
    return (
        <Tooltip
            content={props.title}
            placement="right"
            className="block md:hidden bg-white text-azure-600 dark:text-white dark:bg-azure-600 text-md">
            <Link
                to={props.to}
                className={`flex p-0 md:p-2 py-2 justify-center md:justify-between md:items-center gap-3 transition-colors duration-300 ease-in-out hover:bg-azure-50 dark:hover:bg-azure-600 rounded-xl`}>
                <div className="flex gap-2 align-middle items-center">
                    {props.icon}
                    <div className="content flex-col text-left hidden md:block">
                        <span className="text-sm text-azure-400 font-light">
                            {props.label}
                        </span>
                        <div className="flex justify-between">
                            <span className="text-sm text-azure-700 dark:text-azure-200 font-light">
                                {props.title}
                            </span>
                        </div>
                    </div>
                </div>
                {props.count ? (
                    <span className="text-sm text-azure-600">
                        {props.count}
                    </span>
                ) : (
                    <></>
                )}
            </Link>
        </Tooltip>
    );
};

export default MenuButton;
