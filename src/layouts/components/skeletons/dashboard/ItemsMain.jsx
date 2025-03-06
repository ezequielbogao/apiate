import { Detail } from "./items/Detail";

export const ItemsMain = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <Detail />
            <Detail />
            <Detail />
            <Detail />
        </div>
    );
};

export default ItemsMain;
