import Error from "./icons/Error";

const Errormsg = () => {
    return (
        <div className="w-full h-full flex justify-center align-middle items-center border border-azure-200 dark:border-azure-700 bg-white dark:bg-azure-700  rounded-xl">
            <div className="w-full h-52 flex justify-center align-middle items-center flex-col gap-4">
                <Error width="40" height="40" />
                <span className="text-md font-light text-red-400">
                    No se pudo cargar la información
                </span>
            </div>
        </div>
    );
};

export default Errormsg;
