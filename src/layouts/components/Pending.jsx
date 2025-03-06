import { Spinner } from "@material-tailwind/react";
import PropTypes from "prop-types";
import Skeleton from "./Skeleton";

const Pending = ({ loading, error, children, title, skeleton }) => {
    Pending.propTypes = {
        loading: PropTypes.bool,
        error: PropTypes.bool,
        children: PropTypes.any,
        title: PropTypes.any,
        skeleton: PropTypes.any,
    };
    if (loading) {
        if (skeleton) return skeleton;
        return (
            <div className="w-full h-full flex justify-center align-middle items-center border border-azure-200 dark:border-azure-700 bg-white dark:bg-azure-700  rounded-xl">
                <div className="w-full h-52 flex justify-center align-middle items-center flex-col gap-4">
                    <Spinner className="h-12 w-12 text-azure-400" />
                    <span className="text-lg text-azure-400">
                        Cargando {title ?? ""} ...
                    </span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 text-lg text-center text-red-600 font-light dark:text-red-300">
                ERROR
            </div>
        );
    }

    return <>{children}</>;
};

export default Pending;
