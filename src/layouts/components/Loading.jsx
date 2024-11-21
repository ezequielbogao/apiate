import { Spinner } from "@material-tailwind/react";
import PropTypes from "prop-types";

const Loading = (props) => {
    Loading.propTypes = {
        title: PropTypes.string,
    };
    return (
        <div className="w-full h-full flex justify-center align-middle items-center border border-azure-200 dark:border-azure-700 bg-white dark:bg-azure-700  rounded-xl">
            <div className="w-full h-52 flex justify-center align-middle items-center flex-col gap-4">
                <Spinner className="h-12 w-12 text-azure-400" />
                <span className="text-lg text-azure-400">
                    Cargando {props.title ?? ""} ...
                </span>
            </div>
        </div>
    );
};

export default Loading;
