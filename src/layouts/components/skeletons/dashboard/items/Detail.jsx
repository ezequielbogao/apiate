export const Detail = () => {
    return (
        <div className="h-28 rounded-xl bg-azure-50 animate-pulse w-full ">
            <div className="flex gap-5 bg-transparent rounded-xl  mt-3 p-5">
                <span className="h-6 w-8 rounded-xl bg-azure-100"></span>
                <div className="flex flex-col bg-transparent w-full gap-4">
                    <div className="flex flex-col h-3 w-7/12 bg-azure-100 rounded-md"></div>
                    <div className="flex flex-col h-6 w-9/12 bg-azure-200 rounded-md"></div>
                </div>
            </div>
        </div>
    );
};
