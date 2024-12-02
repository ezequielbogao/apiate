import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Imponible = (props) => {
    Imponible.propTypes = {
        nro: PropTypes.number,
        deuda: PropTypes.number,
        icon: PropTypes.object,
        key: PropTypes.string,
        to: PropTypes.string,
    };
    return (
        <Link
            to={props.to}
            key={props.key}
            className="bg-white shadow-sm hover:-translate-y-1 transition-all ease-in dark:bg-azure-700 rounded-xl mt-5 border-2 border-azure-100 dark:border-azure-700 p-5 hover:border-azure-300">
            <div className="text-azure-600">
                <div className="flex flex-col align-middle items-center justify-center">
                    {props.icon}
                    <span className="text-azure-300 text-md font-medium mt-3">
                        N° {props.nro}
                    </span>
                    <span
                        className={`${
                            props.deuda !== "0.00"
                                ? "text-red-600 dark:text-red-400"
                                : "text-green-600 dark:text-green-400"
                        } text-xl font-medium`}>
                        {props.deuda}
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default Imponible;
